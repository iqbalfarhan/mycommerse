<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass('index transaction');

        $data = Transaction::query()
            ->with(['user', 'courier'])
            ->when($request->name, function ($q, $v) {
                $q->where('name', $v);
            })
            ->orderBy('created_at', 'desc');

        return Inertia::render('transaction/index', [
            'transactions' => $data->get(),
            'query' => $request->input(),
            'statusLists' => Transaction::$statusLists,
            'permissions' => [
                'canAdd' => $this->user->can('create transaction'),
                'canShow' => $this->user->can('show transaction'),
                'canUpdate' => $this->user->can('update transaction'),
                'canDelete' => $this->user->can('delete transaction'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
