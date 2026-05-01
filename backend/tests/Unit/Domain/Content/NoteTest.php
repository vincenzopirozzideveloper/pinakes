<?php

declare(strict_types=1);

use App\Domain\Content\Aggregate\Note;
use App\Domain\Content\Event\MaturityPromoted;
use App\Domain\Content\Event\NoteCreated;
use App\Domain\Content\Exception\InvalidMaturityTransition;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Markdown;
use App\Domain\Content\ValueObject\Maturity;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Content\ValueObject\Title;
use App\Domain\Identity\ValueObject\UserId;
use App\Domain\Shared\Clock\Clock;
use App\Domain\Workspace\ValueObject\WorkspaceId;
use DateTimeImmutable;

/**
 * Test-only Clock implementation returning a fixed instant.
 */
final class FixedClock implements Clock
{
    private DateTimeImmutable $instant;

    public function __construct(string $datetime = '2026-01-01 00:00:00')
    {
        $this->instant = new DateTimeImmutable($datetime);
    }

    public function now(): DateTimeImmutable
    {
        return $this->instant;
    }
}

function makeNote(?FixedClock $clock = null): Note
{
    return Note::create(
        id:          ContentId::generate(),
        workspaceId: WorkspaceId::fromInt(1),
        authorId:    UserId::fromInt(1),
        title:       Title::fromString('Test Note'),
        slug:        Slug::fromString('test-note'),
        body:        Markdown::fromString('# Hello'),
        clock:       $clock ?? new FixedClock(),
    );
}

it('creates a note with seedling maturity and private visibility by default', function (): void {
    $note = makeNote();

    expect($note->maturity()->equals(Maturity::seedling()))->toBeTrue()
        ->and($note->visibility()->value)->toBe('private');
});

it('records a NoteCreated event on creation', function (): void {
    $note   = makeNote();
    $events = $note->pullEvents();

    expect($events)->toHaveCount(1)
        ->and($events[0])->toBeInstanceOf(NoteCreated::class);
});

it('clears recorded events after pullEvents', function (): void {
    $note = makeNote();
    $note->pullEvents();

    expect($note->pullEvents())->toBeEmpty();
});

it('promotes maturity from seedling to budding', function (): void {
    $note = makeNote();
    $note->promoteMaturity(Maturity::budding(), new FixedClock());

    expect($note->maturity()->equals(Maturity::budding()))->toBeTrue();
});

it('promotes maturity from budding to evergreen', function (): void {
    $note = makeNote();
    $note->promoteMaturity(Maturity::budding(), new FixedClock());
    $note->pullEvents();
    $note->promoteMaturity(Maturity::evergreen(), new FixedClock());

    expect($note->maturity()->equals(Maturity::evergreen()))->toBeTrue();
});

it('allows archiving from any non-archived state', function (): void {
    $note = makeNote();
    $note->promoteMaturity(Maturity::archived(), new FixedClock());

    expect($note->maturity()->equals(Maturity::archived()))->toBeTrue();
});

it('records a MaturityPromoted event on promotion', function (): void {
    $note = makeNote();
    $note->pullEvents();
    $note->promoteMaturity(Maturity::budding(), new FixedClock());

    $events = $note->pullEvents();

    expect($events)->toHaveCount(1)
        ->and($events[0])->toBeInstanceOf(MaturityPromoted::class)
        ->and($events[0]->newMaturity->value)->toBe('budding');
});

it('rejects skipping maturity levels (seedling to evergreen)', function (): void {
    $note = makeNote();

    expect(fn () => $note->promoteMaturity(Maturity::evergreen(), new FixedClock()))
        ->toThrow(InvalidMaturityTransition::class);
});

it('rejects any transition from archived', function (): void {
    $note = makeNote();
    $note->promoteMaturity(Maturity::archived(), new FixedClock());
    $note->pullEvents();

    expect(fn () => $note->promoteMaturity(Maturity::seedling(), new FixedClock()))
        ->toThrow(InvalidMaturityTransition::class);
});

it('rejects self-transition (seedling to seedling)', function (): void {
    $note = makeNote();

    expect(fn () => $note->promoteMaturity(Maturity::seedling(), new FixedClock()))
        ->toThrow(InvalidMaturityTransition::class);
});

it('publishes note by setting visibility to public', function (): void {
    $note = makeNote();
    $note->publish(new FixedClock());

    expect($note->visibility()->value)->toBe('public');
});

it('unpublishes note by setting visibility back to private', function (): void {
    $note = makeNote();
    $note->publish(new FixedClock());
    $note->unpublish(new FixedClock());

    expect($note->visibility()->value)->toBe('private');
});
