<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class PromotionController extends Controller
{
    // Generate the correct image URL
    private function imageUrl(string $image): string
    {
        // Support existing locally stored images
        if (
            str_starts_with($image, 'promotions/') &&
            preg_match('/\.(jpg|jpeg|png|webp)$/i', $image)
        ) {
            return asset('storage/' . $image);
        }

        // Support existing full URLs
        if (str_starts_with($image, 'http')) {
            return $image;
        }

        // New Cloudinary images
        $cloudName = config('services.cloudinary.cloud_name');

        return "https://res.cloudinary.com/{$cloudName}/image/upload/{$image}";
    }
    // Upload image to Cloudinary
    private function uploadToCloudinary($file): string
    {
        $cloudName = config('services.cloudinary.cloud_name');
        $apiKey = config('services.cloudinary.api_key');
        $apiSecret = config('services.cloudinary.api_secret');

        if (!$cloudName || !$apiKey || !$apiSecret) {
            throw new RuntimeException('Cloudinary credentials are missing.');
        }

        $response = Http::timeout(60)
            ->withBasicAuth($apiKey, $apiSecret)
            ->attach(
                'file',
                file_get_contents($file->getRealPath()),
                $file->getClientOriginalName()
            )
            ->post(
                "https://api.cloudinary.com/v1_1/{$cloudName}/image/upload",
                [
                    'folder' => 'promotions',
                ]
            );

        $response->throw();

        $publicId = $response->json('public_id');

        if (!$publicId) {
            throw new RuntimeException('Cloudinary did not return an image ID.');
        }

        return $publicId;
    }

    // Delete image from Cloudinary or local storage
    private function deleteImage(string $image): void
    {
        // Delete old locally stored images
        if (
            str_starts_with($image, 'promotions/') &&
            preg_match('/\.(jpg|jpeg|png|webp)$/i', $image)
        ) {
            Storage::disk('public')->delete($image);
            return;
        }

        // Do not attempt to delete an external URL
        if (str_starts_with($image, 'http')) {
            return;
        }

        $cloudName = config('services.cloudinary.cloud_name');
        $apiKey = config('services.cloudinary.api_key');
        $apiSecret = config('services.cloudinary.api_secret');

        if (!$cloudName || !$apiKey || !$apiSecret) {
            throw new RuntimeException('Cloudinary credentials are missing.');
        }

        $response = Http::timeout(30)
            ->asForm()
            ->withBasicAuth($apiKey, $apiSecret)
            ->post(
                "https://api.cloudinary.com/v1_1/{$cloudName}/image/destroy",
                [
                    'public_id' => $image,
                    'invalidate' => true,
                ]
            );

        $response->throw();
    }

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
                $promotion->image_url = $this->imageUrl($promotion->image);

                return $promotion;
            });

        return response()->json($promotions);
    }

    // ADMIN: Display all promotions
    public function adminIndex()
    {
        $promotions = Promotion::latest()
            ->get()
            ->map(function ($promotion) {
                $promotion->image_url = $this->imageUrl($promotion->image);

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

        // Upload image to Cloudinary
        $publicId = $this->uploadToCloudinary($request->file('image'));

        $promotion = Promotion::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'image' => $publicId,
            'start_date' => $validated['start_date'] ?? null,
            'end_date' => $validated['end_date'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Promotion uploaded successfully!',
            'promotion' => $promotion,
            'image_url' => $this->imageUrl($publicId),
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

        $oldImage = $promotion->image;
        $newImageUploaded = false;

        if ($request->hasFile('image')) {
            // Upload new image first
            $promotion->image = $this->uploadToCloudinary(
                $request->file('image')
            );

            $newImageUploaded = true;
        }

        // Do not fill the model with the UploadedFile object
        unset($validated['image']);

        $promotion->fill($validated);
        $promotion->save();

        // Delete old image only after successful database update
        if ($newImageUploaded) {
            $this->deleteImage($oldImage);
        }

        return response()->json([
            'message' => 'Promotion updated successfully!',
            'promotion' => $promotion,
            'image_url' => $this->imageUrl($promotion->image),
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

        $this->deleteImage($promotion->image);

        $promotion->delete();

        return response()->json([
            'message' => 'Promotion deleted successfully!'
        ]);
    }
}
