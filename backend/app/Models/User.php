<?php

declare(strict_types=1);

namespace App\Models;

use App\Infrastructure\Persistence\Eloquent\Model\UserModel;

/**
 * Alias for factory resolution.
 * All application code MUST use UserModel directly.
 */
final class User extends UserModel
{
}
