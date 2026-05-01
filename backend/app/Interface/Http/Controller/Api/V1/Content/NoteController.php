<?php

declare(strict_types=1);

namespace App\Interface\Http\Controller\Api\V1\Content;

use App\Application\Content\Command\CreateNoteCommand;
use App\Application\Content\Command\UpdateNoteCommand;
use App\Application\Content\UseCase\CreateNoteHandler;
use App\Application\Content\UseCase\PromoteMaturityHandler;
use App\Application\Content\UseCase\UpdateNoteHandler;
use App\Application\Workspace\WorkspaceContext;
use App\Domain\Content\Repository\NoteRepository;
use App\Domain\Content\ValueObject\Slug;
use App\Interface\Http\Request\Content\CreateNoteRequest;
use App\Interface\Http\Request\Content\UpdateNoteRequest;
use App\Interface\Http\Resource\NoteResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

final class NoteController extends Controller
{
    public function __construct(
        private readonly CreateNoteHandler $createNoteHandler,
        private readonly UpdateNoteHandler $updateNoteHandler,
        private readonly PromoteMaturityHandler $promoteMaturityHandler,
        private readonly NoteRepository $noteRepository,
    ) {}

    public function store(CreateNoteRequest $request): JsonResponse
    {
        $id   = $this->createNoteHandler->handle(CreateNoteCommand::from($request->validated()));
        $note = $this->noteRepository->find($id);

        return NoteResource::make($note)->response()->setStatusCode(201);
    }

    public function show(string $workspace, string $slug, WorkspaceContext $context): NoteResource
    {
        $note = $this->noteRepository->findBySlug(
            $context->workspaceId(),
            Slug::fromString($slug),
        );

        abort_unless($note !== null, 404, "Note not found.");

        return NoteResource::make($note);
    }

    public function update(string $workspace, string $slug, UpdateNoteRequest $request): NoteResource
    {
        $validated = $request->validated();

        $this->updateNoteHandler->handle(new UpdateNoteCommand(
            slug:    $slug,
            title:   $validated['title'],
            body:    $validated['body'],
            excerpt: $validated['excerpt'] ?? null,
        ));

        $note = $this->noteRepository->findBySlug(
            app(WorkspaceContext::class)->workspaceId(),
            Slug::fromString($slug),
        );

        return NoteResource::make($note);
    }

    public function destroy(string $workspace, string $slug, WorkspaceContext $context): JsonResponse
    {
        $note = $this->noteRepository->findBySlug(
            $context->workspaceId(),
            Slug::fromString($slug),
        );

        abort_unless($note !== null, 404, "Note not found.");

        $this->noteRepository->delete($note->id());

        return response()->json(null, 204);
    }
}
