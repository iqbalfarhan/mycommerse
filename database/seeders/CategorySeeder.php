<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Category model has SoftDeletes
        $permissions = [
            'menu category',
            'index category',
            'show category',
            'create category',
            'update category',
            'delete category',
            // "archived category",
            // "restore category",
            // "force delete category",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => 'category',
                'name' => $permit,
            ]);
        }
    }
}
