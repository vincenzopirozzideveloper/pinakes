<?php

return [

    'driver' => env('SCOUT_DRIVER', 'meilisearch'),

    'prefix' => env('SCOUT_PREFIX', ''),

    'queue' => [
        'connection' => env('SCOUT_QUEUE_CONNECTION', false),
        'queue'      => env('SCOUT_QUEUE', 'scout'),
    ],

    'after_commit' => false,

    'chunk' => [
        'searchable'   => 500,
        'unsearchable' => 500,
    ],

    'soft_delete' => false,

    'identify' => env('SCOUT_IDENTIFY', false),

    'algolia' => [
        'id'     => env('ALGOLIA_APP_ID', ''),
        'secret' => env('ALGOLIA_SECRET', ''),
    ],

    'meilisearch' => [
        'host'    => env('MEILISEARCH_HOST', 'http://localhost:7700'),
        'key'     => env('MEILISEARCH_KEY'),
        'index-settings' => [],
    ],

    'typesense' => [
        'client-settings' => [
            'api_key' => env('TYPESENSE_API_KEY', 'xyz'),
            'nodes'   => [
                [
                    'host'     => env('TYPESENSE_HOST', 'localhost'),
                    'port'     => env('TYPESENSE_PORT', '8108'),
                    'protocol' => env('TYPESENSE_PROTOCOL', 'http'),
                ],
            ],
            'connection_timeout_seconds' => env('TYPESENSE_CONNECTION_TIMEOUT_SECONDS', 2),
        ],
        'model-settings' => [],
    ],

];
