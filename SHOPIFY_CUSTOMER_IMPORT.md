# 📬 Shopify Customer Import Guide

## Overview

Since your site is a **headless React frontend** with no backend, and Shopify's `/contact` endpoint has CORS restrictions, we store form submissions **locally in the browser** and provide an **admin page** where you can export them as CSV files to import into Shopify.

---

## 🎯 How It Works

### 1. **Newsletter Signups** (Footer)
- When someone subscribes to the newsletter, their email is stored in browser localStorage
- You can view all signups at `/admin/submissions`
- Export as CSV and import to Shopify Customers

### 2. **Contact Form Submissions** (Contact Page)
- When someone submits the contact form, their details are stored in browser localStorage
- You can view all submissions at `/admin/submissions`
- Export as CSV and import to Shopify Customers

---

## 📊 Admin Page

### Access the Admin Page
Go to: **`https://luminaco.skin/admin/submissions`**

### Features
- ✅ View all newsletter signups
- ✅ View all contact form submissions
- ✅ Export newsletter signups as CSV
- ✅ Export contact submissions as CSV
- ✅ Clear data after importing to Shopify

---

## 📥 Import to Shopify

### Newsletter Signups

1. Go to `/admin/submissions` on your website
2. Click **"Export CSV"** under Newsletter Signups
3. In Shopify Admin, go to **Customers** → **Import**
4. Upload the CSV file
5. Map columns:
   - `Email` → Email
   - `Accepts Marketing` → Accepts Marketing
6. Click **Import**
7. After successful import, click **Clear** button on the admin page

### Contact Form Submissions

1. Go to `/admin/submissions` on your website
2. Click **"Export CSV"** under Contact Form Submissions
3. In Shopify Admin, go to **Customers** → **Import**
4. Upload the CSV file
5. Map columns:
   - `Name` → First Name (or Full Name)
   - `Email` → Email
   - `Message` → Note
6. Click **Import**
7. After successful import, click **Clear** button on the admin page

---

## 🔒 Security Note

The admin page is **publicly accessible** at `/admin/submissions`. Since this is a static site with no authentication:

### Option 1: Keep it simple (current setup)
- The URL is not linked anywhere on the site
- Only you know the URL
- Data is stored in browser localStorage (only visible to that browser)

### Option 2: Add password protection (recommended)
If you want to add a simple password, let me know and I can add a password prompt to the admin page.

---

## 📝 CSV Format

### Newsletter Signups CSV
```csv
Email,Subscribed At,Source,Accepts Marketing
customer@example.com,2025-01-05T10:30:00.000Z,website-newsletter,yes
```

### Contact Submissions CSV
```csv
Name,Email,Subject,Message,Submitted At,Source
John Doe,john@example.com,Product Question,"I have a question about...",2025-01-05T10:30:00.000Z,website-contact-form
```

---

## 🚀 Workflow

1. **Customer submits form** → Stored in browser localStorage
2. **You visit `/admin/submissions`** → View all submissions
3. **Export as CSV** → Download CSV file
4. **Import to Shopify** → Upload CSV to Shopify Customers
5. **Clear data** → Remove imported data from localStorage

---

## 💡 Tips

- **Check regularly**: Visit `/admin/submissions` weekly to export new submissions
- **Bookmark the page**: Save `/admin/submissions` in your bookmarks for easy access
- **Don't clear before importing**: Make sure you've successfully imported to Shopify before clicking "Clear"
- **Multiple browsers**: Data is stored per browser, so use the same browser/device to access the admin page

---

## 🐛 Troubleshooting

**Q: I don't see any submissions on the admin page**
- Make sure you're using the same browser where customers submitted forms
- Check if localStorage is enabled in your browser
- Try submitting a test form yourself

**Q: Can I access submissions from a different device?**
- No, localStorage is browser-specific. You need to access the admin page from the same browser where the site is being viewed by customers
- **Solution**: Since your site is public, customers use their own browsers. You'll need to check the admin page from YOUR browser after testing, or add a backend solution

**Q: This seems limited, is there a better way?**
- Yes! You can set up a **serverless function** (Netlify Functions, Vercel Functions, or Cloudflare Workers) to handle form submissions and send them directly to Shopify's Admin API
- Let me know if you want me to set this up!

---

## 🎨 Alternative Solutions

If you want automatic Shopify integration without manual CSV imports:

1. **Netlify/Vercel Functions** (Recommended)
   - Add a serverless function to your deployment
   - Forms submit to the function
   - Function creates customers in Shopify via Admin API
   - No manual work needed!

2. **Third-party services**
   - Zapier: Connect forms to Shopify
   - Make (Integromat): Automate form → Shopify
   - FormSpree: Form backend with Shopify integration

Let me know if you want me to implement any of these! 🚀

