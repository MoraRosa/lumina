# Judge.me Reviews Setup Guide

## ✅ What's Been Done

I've integrated Judge.me reviews into your Lumina website (headless setup):

1. **Product Detail Pages** - Full review widget showing all customer reviews
2. **Product Cards** - Star rating badges on product listing pages
3. **Automatic Loading** - Judge.me script loads automatically on all pages
4. **Configuration** - `jdgmSettings` configured for your Shopify store

## 🔧 Shopify Setup Required

You need to install and configure Judge.me in your Shopify admin:

### Step 1: Install Judge.me App

1. Go to your Shopify Admin: https://admin.shopify.com/store/lumina-10151
2. Click **Apps** in the left sidebar
3. Click **Shopify App Store**
4. Search for **"Judge.me Product Reviews"**
5. Click **Install** (it's FREE)

### Step 2: Configure Judge.me Settings

After installation:

1. Open the Judge.me app from your Shopify admin
2. Go to **Settings** → **General Settings**
3. Make sure these are enabled:
   - ✅ **Enable reviews**
   - ✅ **Show review widget on product pages**
   - ✅ **Show star ratings on collection pages**

### Step 3: Get Your Shop Domain

Judge.me needs to know your shop domain:

1. In Judge.me settings, find **Shop Domain**
2. It should be: `lumina-10151.myshopify.com`
3. Make sure it's saved correctly

### Step 4: Import Existing Reviews (Optional)

If you have existing reviews from another platform:

1. Go to **Reviews** → **Import Reviews**
2. Follow the import wizard
3. Upload your CSV file with reviews

### Step 5: Request Reviews Automatically

Set up automatic review request emails:

1. Go to **Emails** → **Review Request Email**
2. Enable **Automatic Review Requests**
3. Set delay (recommended: 7-14 days after delivery)
4. Customize email template with your branding

## 🎨 Customization (Optional)

### Change Star Color

1. Go to **Settings** → **Widget Customization**
2. Change **Star Color** to match your brand (e.g., `#8B5CF6` for purple)
3. Click **Save**

### Review Widget Position

The widget is already positioned on your product pages. If you want to adjust:

- Edit `src/pages/ProductDetail.tsx`
- Move the `{/* Judge.me Reviews Section */}` block

## 🧪 Testing

### Test on Local Development:

```bash
npm run dev
```

Visit: http://localhost:8080/products/any-product

**Note**: Reviews won't show in local development until you:

1. Install Judge.me app in Shopify
2. Have at least one review for a product
3. The product ID matches between Shopify and your site

You should see:

- ⭐ Star ratings on product cards (if reviews exist)
- 📝 Full review widget on product detail pages

### Test on Production:

After deploying:

1. Visit: https://luminaco.skin/products/any-product
2. Scroll down to see the reviews section
3. If no reviews exist yet, you'll see "Loading reviews..." or "No reviews yet"

## 📊 How It Works

### Product Cards (Listing Pages)

```html
<div class="jdgm-widget jdgm-preview-badge" data-id="PRODUCT_ID" />
```

Shows: ⭐⭐⭐⭐⭐ (12 reviews)

### Product Detail Pages

```html
<div
  class="jdgm-widget jdgm-review-widget"
  data-id="PRODUCT_ID"
  data-product-title="Product Name"
  data-product-url="https://luminaco.skin/products/handle"
/>
```

Shows: Full review list with customer photos, ratings, and comments

## 🚀 Getting Your First Reviews

### Option 1: Request from Past Customers

1. Go to Judge.me → **Reviews** → **Request Reviews**
2. Upload customer emails
3. Send review request emails

### Option 2: Add Manual Reviews

1. Go to Judge.me → **Reviews** → **Add Review**
2. Enter customer details and review
3. Click **Save**

### Option 3: Wait for Automatic Requests

- After customers receive their orders
- Judge.me automatically sends review requests
- Reviews appear on your site automatically

## 🎯 Best Practices

1. **Incentivize Reviews**: Offer 10% off next purchase for leaving a review
2. **Respond to Reviews**: Reply to all reviews (good and bad) to show you care
3. **Share Reviews**: Post great reviews on social media
4. **Photo Reviews**: Encourage customers to upload photos (higher conversion)
5. **Review Reminders**: Send 1-2 reminder emails if no response

## 🔍 Troubleshooting

### Reviews Not Showing?

1. **Check Judge.me is installed** in Shopify admin
2. **Verify shop domain** is correct in Judge.me settings
3. **Clear browser cache** and refresh the page
4. **Check browser console** for JavaScript errors (F12 → Console)

### Star Ratings Not Appearing?

1. Make sure products have reviews in Judge.me
2. Check that product IDs match between Shopify and your site
3. Verify Judge.me script is loading (check Network tab in browser DevTools)

### Widget Styling Issues?

Judge.me widgets inherit your site's styles. To customize:

1. Go to Judge.me → **Settings** → **Widget Customization**
2. Add custom CSS if needed
3. Or edit `src/index.css` to add Judge.me-specific styles

## 📞 Support

- **Judge.me Support**: https://judge.me/support
- **Judge.me Documentation**: https://judge.me/docs
- **Live Chat**: Available in Judge.me app dashboard

## ✨ Next Steps

1. ✅ Install Judge.me app in Shopify
2. ✅ Configure settings
3. ✅ Request reviews from past customers
4. ✅ Deploy your site: `npm run deploy`
5. ✅ Test on production: https://luminaco.skin

---

**Note**: Judge.me is FREE for up to 50 orders/month. Perfect for starting out! 🎉
