<?php

declare(strict_types=1);

use App\Application\Workspace\WorkspaceContext;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use App\Models\User;
use App\Models\Workspace;
use Database\Seeders\StatusesSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->seed(StatusesSeeder::class);
});

/**
 * Populate WorkspaceContext for the given user and workspace,
 * bypassing the stub ResolveWorkspace middleware.
 */
function bindWorkspaceContext(User $user, Workspace $workspace): void
{
    app()->singleton(WorkspaceContext::class, function () use ($user, $workspace): WorkspaceContext {
        $ctx = new WorkspaceContext();
        $ctx->set(
            WorkspaceId::fromInt($workspace->id),
            UserId::fromInt($user->id),
        );

        return $ctx;
    });
}

it('creates a note with seedling maturity and private visibility by default', function (): void {
    $user      = User::factory()->create();
    $workspace = Workspace::factory()->for($user, 'owner')->create();

    bindWorkspaceContext($user, $workspace);

    $this->actingAs($user)
        ->postJson("/api/v1/w/{$workspace->slug}/notes", [
            'title' => 'My first note',
            'body'  => '# Hello',
        ])
        ->assertCreated()
        ->assertJsonPath('data.maturity', 'seedling')
        ->assertJsonPath('data.visibility', 'private')
        ->assertJsonPath('data.title', 'My first note');

    $this->assertDatabaseHas('contents', [
        'workspace_id' => $workspace->id,
        'type'         => 'note',
        'visibility'   => 'private',
        'title'        => 'My first note',
    ]);
});

it('auto-generates a slug from the title', function (): void {
    $user      = User::factory()->create();
    $workspace = Workspace::factory()->for($user, 'owner')->create();

    bindWorkspaceContext($user, $workspace);

    $this->actingAs($user)
        ->postJson("/api/v1/w/{$workspace->slug}/notes", [
            'title' => 'My Slug Test',
            'body'  => 'body content',
        ])
        ->assertCreated()
        ->assertJsonPath('data.slug', 'my-slug-test');
});

it('uses a custom slug when provided', function (): void {
    $user      = User::factory()->create();
    $workspace = Workspace::factory()->for($user, 'owner')->create();

    bindWorkspaceContext($user, $workspace);

    $this->actingAs($user)
        ->postJson("/api/v1/w/{$workspace->slug}/notes", [
            'title' => 'Custom slug note',
            'body'  => 'body',
            'slug'  => 'my-custom-slug',
        ])
        ->assertCreated()
        ->assertJsonPath('data.slug', 'my-custom-slug');
});

it('appends numeric suffix when slug is already taken', function (): void {
    $user      = User::factory()->create();
    $workspace = Workspace::factory()->for($user, 'owner')->create();

    bindWorkspaceContext($user, $workspace);

    $this->actingAs($user)
        ->postJson("/api/v1/w/{$workspace->slug}/notes", [
            'title' => 'Duplicate',
            'body'  => 'first',
        ])
        ->assertCreated();

    $this->actingAs($user)
        ->postJson("/api/v1/w/{$workspace->slug}/notes", [
            'title' => 'Duplicate',
            'body'  => 'second',
        ])
        ->assertCreated()
        ->assertJsonPath('data.slug', 'duplicate-2');
});

it('returns 422 when title is missing', function (): void {
    $user      = User::factory()->create();
    $workspace = Workspace::factory()->for($user, 'owner')->create();

    bindWorkspaceContext($user, $workspace);

    $this->actingAs($user)
        ->postJson("/api/v1/w/{$workspace->slug}/notes", [
            'body' => '# content',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['title']);
});

it('returns 422 when body is missing', function (): void {
    $user      = User::factory()->create();
    $workspace = Workspace::factory()->for($user, 'owner')->create();

    bindWorkspaceContext($user, $workspace);

    $this->actingAs($user)
        ->postJson("/api/v1/w/{$workspace->slug}/notes", [
            'title' => 'A title',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['body']);
});

it('returns 401 for unauthenticated requests', function (): void {
    $workspace = Workspace::factory()->create();

    $this->postJson("/api/v1/w/{$workspace->slug}/notes", [
        'title' => 'A title',
        'body'  => '# body',
    ])->assertUnauthorized();
});

it('retrieves a note by slug', function (): void {
    $user      = User::factory()->create();
    $workspace = Workspace::factory()->for($user, 'owner')->create();

    bindWorkspaceContext($user, $workspace);

    $created = $this->actingAs($user)
        ->postJson("/api/v1/w/{$workspace->slug}/notes", [
            'title' => 'Retrievable note',
            'body'  => '# Content',
        ])
        ->assertCreated()
        ->json('data');

    $this->actingAs($user)
        ->getJson("/api/v1/w/{$workspace->slug}/notes/{$created['slug']}")
        ->assertOk()
        ->assertJsonPath('data.title', 'Retrievable note');
});
