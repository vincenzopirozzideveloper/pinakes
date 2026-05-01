<?php

declare(strict_types=1);

namespace App\Application\Content\UseCase;

use App\Application\Content\Command\UpdateNoteCommand;
use App\Application\Workspace\WorkspaceContext;
use App\Domain\Content\Repository\NoteRepository;
use App\Domain\Content\ValueObject\Excerpt;
use App\Domain\Content\ValueObject\Markdown;
use App\Domain\Content\ValueObject\Slug;
use App\Domain\Content\ValueObject\Title;
use App\Domain\Shared\Clock\Clock;
use Illuminate\Database\DatabaseManager;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class UpdateNoteHandler
{
    public function __construct(
        private readonly NoteRepository $noteRepository,
        private readonly WorkspaceContext $context,
        private readonly Clock $clock,
        private readonly DatabaseManager $db,
    ) {}

    public function handle(UpdateNoteCommand $command): void
    {
        $this->db->transaction(function () use ($command): void {
            $note = $this->noteRepository->findBySlug(
                $this->context->workspaceId(),
                Slug::fromString($command->slug),
            );

            if ($note === null) {
                throw new NotFoundHttpException(
                    "Note with slug \"{$command->slug}\" not found."
                );
            }

            $note->update(
                title:   Title::fromString($command->title),
                body:    Markdown::fromString($command->body),
                excerpt: $command->excerpt !== null
                    ? Excerpt::fromString($command->excerpt)
                    : Excerpt::empty(),
                clock:   $this->clock,
            );

            $this->noteRepository->save($note);
        });
    }
}
