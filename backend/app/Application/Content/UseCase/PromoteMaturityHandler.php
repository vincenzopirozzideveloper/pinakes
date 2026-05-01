<?php

declare(strict_types=1);

namespace App\Application\Content\UseCase;

use App\Application\Workspace\WorkspaceContext;
use App\Domain\Content\Repository\NoteRepository;
use App\Domain\Content\ValueObject\Maturity;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Shared\Bus\EventBus;
use App\Domain\Shared\Clock\Clock;
use Illuminate\Database\DatabaseManager;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class PromoteMaturityHandler
{
    public function __construct(
        private readonly NoteRepository $noteRepository,
        private readonly WorkspaceContext $context,
        private readonly Clock $clock,
        private readonly EventBus $eventBus,
        private readonly DatabaseManager $db,
    ) {}

    public function handle(string $slug, string $targetMaturity): void
    {
        $this->db->transaction(function () use ($slug, $targetMaturity): void {
            $note = $this->noteRepository->findBySlug(
                $this->context->workspaceId(),
                Slug::fromString($slug),
            );

            if ($note === null) {
                throw new NotFoundHttpException("Note with slug \"{$slug}\" not found.");
            }

            $note->promoteMaturity(Maturity::fromString($targetMaturity), $this->clock);

            $this->noteRepository->save($note);

            $events = $note->pullEvents();

            $this->db->afterCommit(
                function () use ($events): void {
                    foreach ($events as $event) {
                        $this->eventBus->dispatch($event);
                    }
                }
            );
        });
    }
}
