<?php

namespace Aft\SSRS;

use ArrayObject;

class Catalog extends ArrayObject
{
    //protected array $items;
    //protected int $position = 0;

    public function __construct($data)
    {
        $dataType = gettype($data);
        $items = [];
        if ($dataType === 'object' && property_exists($data, 'CatalogItems')) {
            $items = $this->ssrsCatalogItemsToArray($data->CatalogItems);
        } else {
            throw new \Exception('Unknown catalog type '.gettype($dataType));
        }
        //$this->items = $items;
        parent::__construct($items);
    }

    protected function ssrsCatalogItemsToArray($data): array
    {
        $dataType = gettype($data);
        $items = [];
        if ($dataType === 'object' && property_exists($data, 'CatalogItem')) {
            $items = $this->ssrsCatalogItemToArray($data->CatalogItem);
        } else {
            throw new \Exception('Unknown catalog items type '.gettype($dataType));
        }

        return $items;
    }

    protected function ssrsCatalogItemToArray($data): array
    {
        $dataType = gettype($data);
        switch ($dataType) {
            case 'array':
                $item = [];
                foreach ($data as $subItem) {
                    $item[] = $subItem;
                }

                return $item;
            case 'object':
                return [$data];
        }
        throw new \Exception('Unknown catalog it type '.gettype($dataType));
    }

    /*public function toArray() {
        return (array)$this;
    }*/
}
