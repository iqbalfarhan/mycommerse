<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Transaction extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    // protected $table = 'transactions';

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

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
}
