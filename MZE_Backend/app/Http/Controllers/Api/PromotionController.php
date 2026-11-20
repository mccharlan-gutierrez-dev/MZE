<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PromotionController extends Controller
{
    // GET: Display active promotions
   // PUBLIC: Display active promotions
    public function index()
    {
        $promotions = Promotion::where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('start_date')
                    ->orWhereDate('start_date', '<=', now());
            })
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhereDate('end_date', '>=', now());
            })
            ->latest()
            ->get()
            ->map(function ($promotion) {
                $promotion->image_url = asset(
                    'storage/' . $promotion->image
                );

                return $promotion;
            });

        return response()->json($promotions);
    }

    // ADMIN: Display all promotions
    public function adminIndex()
    {
        $promotions = Promotion::latest()->get()
            ->map(function ($promotion) {
                $promotion->image_url = asset(
                    'storage/' . $promotion->image
                );

                return $promotion;
            });

        return response()->json($promotions);
    }


    // POST: Upload promotion
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:20480',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'sometimes|boolean',
        ]);

        $path = $request->file('image')
            ->store('promotions', 'public');

        $promotion = Promotion::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'image' => $path,
            'start_date' => $validated['start_date'] ?? null,
            'end_date' => $validated['end_date'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Promotion uploaded successfully!',
            'promotion' => $promotion,
            'image_url' => asset('storage/' . $path),
        ], 201);
    }

    // ADMIN: Update promotion
    public function update(Request $request, $id)
    {
        $promotion = Promotion::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:20480',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'sometimes|boolean',
        ]);

        if ($request->hasFile('image')) {
            $newPath = $request->file('image')
                ->store('promotions', 'public');

            Storage::disk('public')->delete($promotion->image);

            $promotion->image = $newPath;
        }

        $promotion->fill($validated);
        $promotion->save();

        return response()->json([
            'message' => 'Promotion updated successfully!',
            'promotion' => $promotion,
            'image_url' => asset('storage/' . $promotion->image),
        ]);
    }

    // ADMIN: Activate / Deactivate promotion
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $promotion = Promotion::findOrFail($id);

        $promotion->update([
            'is_active' => $validated['is_active'],
        ]);

        return response()->json([
            'message' => 'Promotion status updated successfully!',
            'promotion' => $promotion,
        ]);
    }

    // DELETE: Remove promotion
    public function destroy($id)
    {
        $promotion = Promotion::findOrFail($id);

        Storage::disk('public')->delete($promotion->image);

        $promotion->delete();

        return response()->json([
            'message' => 'Promotion deleted successfully!'
        ]);
    }
}
