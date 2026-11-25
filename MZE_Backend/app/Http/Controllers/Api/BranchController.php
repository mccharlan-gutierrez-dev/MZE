<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    // GET: Display all branches
    public function index()
    {
        return response()->json(
            Branch::orderBy('id', 'asc')->get()
        );
    }

    // POST: Add a new branch
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'contact' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'hours' => 'nullable|string|max:255',
            'closed' => 'nullable|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $branch = Branch::create($validated);

        return response()->json([
            'message' => 'Branch added successfully!',
            'branch' => $branch,
        ], 201);
    }

    // GET: Display one branch
    public function show(string $id)
    {
        $branch = Branch::findOrFail($id);

        return response()->json($branch);
    }

    // PUT/PATCH: Update a branch
    public function update(Request $request, string $id)
    {
        $branch = Branch::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string',
            'contact' => 'sometimes|required|string|max:50',
            'email' => 'nullable|email|max:255',
            'hours' => 'nullable|string|max:255',
            'closed' => 'nullable|string|max:255',
            'latitude' => 'sometimes|required|numeric|between:-90,90',
            'longitude' => 'sometimes|required|numeric|between:-180,180',
        ]);

        $branch->update($validated);

        return response()->json([
            'message' => 'Branch updated successfully!',
            'branch' => $branch,
        ]);
    }

    // DELETE: Remove a branch
    public function destroy(string $id)
    {
        $branch = Branch::findOrFail($id);

        $branch->delete();

        return response()->json([
            'message' => 'Branch deleted successfully!',
        ]);
    }
}
