# 📧 EmailJS Setup Guide for Contact Form

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's FREE!)
3. Verify your email

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Connect your Gmail account
   - **Outlook**: Connect your Outlook account
   - **Other**: Use SMTP settings
4. Click **"Create Service"**
5. **Copy the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Body:**
```
You have a new message from your Lumina Skincare website!

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the Lumina Skincare contact form.
Reply to: {{from_email}}
```

4. Click **"Save"**
5. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy your Public Key** (e.g., `abcdefghijklmnop`)

### Step 5: Add to .env File
Add these three lines to your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

Replace with your actual IDs from steps above!

### Step 6: Test It!
1. Restart your dev server: `npm run dev`
2. Go to `http://localhost:5173/contact`
3. Fill out the form and submit
4. Check your email inbox - you should receive the message!

---

## 📝 Notes

- **Free Tier**: 200 emails/month (plenty for most small businesses)
- **Emails go to**: The email you connected in Step 2
- **Auto-reply**: You can set up auto-replies in EmailJS dashboard
- **Spam protection**: EmailJS has built-in rate limiting

---

## 🎨 Customization

### Change Recipient Email
The contact form sends to `support@luminaco.skin` by default. To change:

1. Open `src/pages/Contact.tsx`
2. Find line with `to_email: "support@luminaco.skin"`
3. Change to your desired email

### Add More Fields
You can add fields like phone number, company, etc. Just:
1. Add field to the form in `Contact.tsx`
2. Add field to EmailJS template
3. Pass field in `emailjs.send()` call

---

## 🐛 Troubleshooting

**"Failed to send message"**
- Check that all 3 env variables are set correctly
- Make sure you restarted dev server after adding env vars
- Check EmailJS dashboard for error logs

**"Email not received"**
- Check spam folder
- Verify email service is connected in EmailJS dashboard
- Check EmailJS usage limits (200/month on free tier)

**"CORS error"**
- Make sure you're using the Public Key, not Private Key
- Check that your domain is allowed in EmailJS settings

---

## ✅ Done!

Your contact form is now fully functional! 🎉

When you deploy to GitHub Pages, the form will automatically work there too (no additional setup needed).

