<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Transaction extends Model 
{
    use HasFactory;
    
    

    //protected $table = 'transactions';

    /*
    protected $fillable = [
        'user_id',
        'courier_id',
        'items',
        'description',
        'status',
        'total_price',
        'paid'
    ];
    */

    public static $statusLists = ['pending', 'shipping', 'delivered', 'cancelled'];

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $casts = [
        'items' => 'array',
        'paid' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courier()
    {
        return $this->belongsTo(Courier::class);
    }

    
}
