# 📸 Customer Review Images

This folder contains customer-submitted images for product reviews.

## 📁 Folder Structure

```
reviews/
├── body-butter/        ← Lumina Body Butter review images
├── bloome/             ← Bloomé Fragrance Oil review images
├── coconut-veil/       ← Coconut Veil Fragrance Oil review images
└── [product-name]/     ← Add folders for new products as needed
```

## 🎯 How to Add Review Images

### 1. Receive Customer Images
When customers send review photos via email, Instagram, etc.

### 2. Optimize Images First! ⚠️
**ALWAYS optimize before adding to project:**
- Go to https://tinypng.com/
- Drag & drop the image
- Download the compressed version
- This reduces file size by 60-70% without quality loss

### 3. Save to Correct Folder
- **Body Butter reviews** → `body-butter/`
- **Bloomé reviews** → `bloome/`
- **Coconut Veil reviews** → `coconut-veil/`

### 4. Naming Convention
Use descriptive, lowercase names with hyphens:
- ✅ `sarah-texture-shot.jpg`
- ✅ `jessica-packaging-1.jpg`
- ✅ `customer-application.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `Review Photo.jpg` (no spaces!)

### 5. Update reviews.ts
Add the image path to the review:

```typescript
// In src/data/reviews.ts
{
  id: 5,
  author: "Sarah M",
  rating: 5,
  title: "Love it!",
  content: "Amazing product!",
  date: "2026-02-15",
  verified: true,
  images: [
    "/images/reviews/body-butter/sarah-texture-shot.jpg",
    "/images/reviews/body-butter/sarah-packaging-1.jpg"
  ],
}
```

## 📐 Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Max width**: 1200px (resize larger images)
- **Target size**: Under 500KB per image
- **Aspect ratio**: Any (will be cropped to square)
- **Limit**: 1-3 images per review (3 looks best)

## 🛠️ Optimization Tools

- **TinyPNG** (easiest): https://tinypng.com/
- **Squoosh** (advanced): https://squoosh.app/
- **ImageOptim** (Mac): https://imageoptim.com/

## ✅ Quick Checklist

When adding a new review image:
- [ ] Received customer permission to use photo
- [ ] Optimized image with TinyPNG
- [ ] Saved to correct product folder
- [ ] Used descriptive filename (lowercase, hyphens)
- [ ] Added path to reviews.ts
- [ ] Tested on localhost

## 📝 Example

Customer "Jessica T" sends 2 photos for Body Butter:

1. **Save here:**
   - `public/images/reviews/body-butter/jessica-texture.jpg`
   - `public/images/reviews/body-butter/jessica-jar.jpg`

2. **Reference in code:**
   ```typescript
   images: [
     "/images/reviews/body-butter/jessica-texture.jpg",
     "/images/reviews/body-butter/jessica-jar.jpg"
   ]
   ```

3. **Result:** Images appear in a 2-column grid below the review text

---

**Need help?** See `REVIEW_IMAGES_GUIDE.md` and `EXAMPLE_REVIEW_WITH_IMAGES.md` in the project root.

