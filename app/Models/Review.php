<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    // protected $table = 'reviews';

    /*
    protected $fillable = [
        'transaction_id',
        'user_id',
        'rating',
        'comment'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
}
