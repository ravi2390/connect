<?php

namespace Aft\SSRS\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CatalogResource extends JsonResource
{
    #[\Override]
    public function toArray($request): array
    {
        $typeName = 'unknown';
        switch ($this->TypeName) {
            case 'Folder':
                $typeName = 'directory';
                break;
            case 'Report':
                $typeName = 'report';
                break;
        }
        $children = [];
        if (! empty($this->Children)) {
            foreach ($this->Children as $child) {
                $children[] = new CatalogResource($child);
            }
        }

        return [
            'path' => $this->Path,
            'name' => $this->Name,
            'type' => $typeName,
            'children' => $children,
        ];
    }
}
