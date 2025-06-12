<?php

namespace App\Http\Export;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\Filter\ParsesQuery;
use App\UI\Provider\Facade\ConfigurationProvider;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use ReflectionException;
use Spatie\QueryBuilder\QueryBuilder;

class Excel implements FromCollection, WithHeadings, WithMapping
{
    use Exportable;
    use ParsesQuery;

    /**
     * AbstractCrudController constructor.
     */
    public function __construct(protected Request $request, protected AbstractCrudController $controller, protected string $type)
    {
    }

    /**
     * @return AnonymousResourceCollection|QueryBuilder
     *
     * @throws ReflectionException
     */
    public function collection()
    {
        return $this->controller->prepareExportData();
    }

    protected $exportTableConfiguration;

    protected function getExportTableConfiguration()
    {
        if (empty($this->exportTableConfiguration)) {
            $model = $this->request->input('model');
            $key = (string) $this->request->input('key', '');

            /**
             * @var ConfigurationProvider $provider
             */
            $provider = resolve(ConfigurationProvider::class);
            $this->exportTableConfiguration = $provider->provide($model, $key);
        }

        return $this->exportTableConfiguration;
    }

    public function headings(): array
    {
        $row = [];
        $config = $this->getExportTableConfiguration();

        foreach ($config['fields'] as $field) {
            if ($this->type === 'all' || $field['visible']) {
                $row[] = $field['title'];
            }
        }

        return $row;
    }

    public function map($dataModel): array
    {
        return $dataModel->exportResource($this->getExportTableConfiguration(), $this->type);
    }
}
