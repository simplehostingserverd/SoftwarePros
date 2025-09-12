# Local Email Testing Guide

## Quick Tests (No Database Required!)

Your contact form works completely independently of the database. Here are simple ways to test it locally:

## Option 1: Simple Email Test

Test the email sending functionality directly:

```bash
node test-email.js
```

**What this does:**
- Creates a temporary test email account (Ethereal)
- Sends a test email using your contact form format
- Provides a preview URL to see exactly what gets sent
- **No database or server required!**

## Option 2: Full API Test

Test the complete contact form API endpoint:

```bash
# 1. Start the dev server
npm run dev

# 2. In another terminal, run the API test
node test-contact-api.js
```

**What this does:**
- Sends a real POST request to `/api/contact`
- Tests the complete form validation
- Tests the actual email sending
- Shows exactly what happens when someone submits the form

## Option 3: Test in Browser

1. Start dev server: `npm run dev`
2. Go to: `http://localhost:3000/contact`
3. Fill out and submit the form
4. Check terminal logs for email preview URLs

## Development Email Behavior

In development mode (`NODE_ENV=development`), the mailer automatically:
- ✅ Uses Ethereal Email (no configuration needed)
- ✅ Provides preview URLs in console logs
- ✅ Works without any SMTP setup
- ✅ Shows exactly what production emails will look like

## Expected Output

When working correctly, you'll see:
```
Development mode: Creating Ethereal test account
Ethereal test account created successfully
Contact email preview URL: https://ethereal.email/message/abc123...
Email sent successfully: <message-id>
```

## Troubleshooting

**"SMTP configuration error"** in browser:
- This means the email sending failed
- Check terminal logs for detailed error messages
- In development, it should use Ethereal automatically

**"Network error"** in terminal tests:
- Make sure dev server is running (`npm run dev`)
- Check that port 3000 is available
- Wait for server to fully start

**No preview URL in logs:**
- Check if you're in development mode
- Look for any error messages in terminal
- Try the simple `test-email.js` first

## Production Testing

For production (cPanel) testing:
1. Set up SMTP environment variables (see EMAIL_SETUP.md)
2. Deploy to cPanel
3. Test contact form on live site
4. Check email arrives at `simplehostingserverd@proton.me`

## Why This Works Without Database

The contact form is completely independent:
- ✅ Validates form data with Zod
- ✅ Sends email directly with Nodemailer  
- ✅ Returns success/error response
- ❌ **No database interaction at all!**

This makes it perfect for cPanel deployment where database setup might be complex.