<?php

namespace Database\Seeders;

require_once 'helpers.php';

use App\Models\FileAttachmentTypes;
use Illuminate\Database\Seeder;

class FileAttachmentTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $auditColumns = [
            'CreatedBy' => 1,
            'UpdatedBy' => 1,
        ];

        $fileAttachmentTypesFile = openInputCSV(__DIR__.'/data/fileAttachmentTypes.csv', true, $headers, false);

        FileAttachmentTypes::withoutEvents(function () use ($fileAttachmentTypesFile, $headers, $auditColumns) {
            while ($data = fgetcsv($fileAttachmentTypesFile)) {
                $data = array_combine($headers, $data);
                FileAttachmentTypes::updateOrCreate(
                    ['FileAttachmentType' => $data['fileAttachmentType']],
                    array_merge(
                        $auditColumns
                    )
                );
            }
        });

        closeInputCSV($fileAttachmentTypesFile);
    }
}
