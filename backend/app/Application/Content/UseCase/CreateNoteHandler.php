<?php

declare(strict_types=1);

namespace App\Application\Content\UseCase;

use App\Application\Content\Command\CreateNoteCommand;
use App\Application\Workspace\WorkspaceContext;
use App\Domain\Content\Aggregate\Note;
use App\Domain\Content\Repository\NoteRepository;
use App\Domain\Content\Service\SlugGenerator;
use App\Domain\Content\ValueObject\ContentId;
use App\Domain\Content\ValueObject\Markdown;
use App\Domain\Content\ValueObject\Title;
use App\Domain\Shared\Bus\EventBus;
use App\Domain\Shared\Clock\Clock;
use Illuminate\Database\DatabaseManager;

final class CreateNoteHandler
{
    public function __construct(
        private readonly NoteRepository $noteRepository,
        private readonly SlugGenerator $slugGenerator,
        private readonly WorkspaceContext $context,
        private readonly Clock $clock,
        private readonly EventBus $eventBus,
        private readonly DatabaseManager $db,
    ) {}

    public function handle(CreateNoteCommand $command): ContentId
    {
        return $this->db->transaction(function () use ($command): ContentId {
            $id   = ContentId::generate();
            $note = Note::create(
                id:          $id,
                workspaceId: $this->context->workspaceId(),
                authorId:    $this->context->userId(),
                title:       Title::fromString($command->title),
                slug:        $this->slugGenerator->forTitle(
                                 $this->context->workspaceId(),
                                 $command->title,
                                 $command->slug,
                             ),
                body:        Markdown::fromString($command->body),
                clock:       $this->clock,
            );

            $this->noteRepository->save($note);

            $events = $note->pullEvents();

            $this->db->afterCommit(
                function () use ($events): void {
                    foreach ($events as $event) {
                        $this->eventBus->dispatch($event);
                    }
                }
            );

            return $id;
        });
    }
}
