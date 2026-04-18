<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AssistantController extends Controller
{
    public function index()
    {
        $assistants = User::where('role', 'assistant')
            ->orderByDesc('created_at')
            ->get();

        return view('admin.assistants.index', [
            'assistants' => $assistants,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^\+?[0-9]{9,15}$/'],
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'assistant',
            'address' => $data['address'] ?? null,
            'phone' => $data['phone'],
        ]);

        return redirect()
            ->route('admin.assistants.index')
            ->with('status', 'Assistant created successfully.');
    }
}
