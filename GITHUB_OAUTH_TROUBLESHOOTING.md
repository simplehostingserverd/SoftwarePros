# GitHub OAuth AccessDenied Error - Complete Fix Guide

## Current Issue
You're getting "Access was denied" when trying to sign in with GitHub OAuth.

## ✅ **Step-by-Step Fix**

### 1. **Update GitHub OAuth App Settings**

Go to: `https://github.com/settings/applications/`

Find your app with Client ID: `Ov23liG3Da9UqJhj2tyW`

**Set these values EXACTLY:**

| Field | Value |
|-------|-------|
| **Application name** | `SoftwarePros Authentication` |
| **Homepage URL** | `https://www.softwarepros.org` |
| **Authorization callback URL** | `https://www.softwarepros.org/api/auth/callback/github` |
| **Application description** | `Authentication system for SoftwarePros business platform` |

### 2. **Critical Callback URL Check**

The callback URL MUST be exactly:
```
https://www.softwarepros.org/api/auth/callback/github
```

**Common mistakes that cause AccessDenied:**
- ❌ `https://softwarepros.org/api/auth/callback/github` (missing www)
- ❌ `http://www.softwarepros.org/api/auth/callback/github` (http instead of https)
- ❌ `https://www.softwarepros.org/api/auth/callback` (missing /github)
- ❌ Extra spaces or characters

### 3. **Verify Environment Variables**

Your current config is:
```bash
NEXTAUTH_URL="https://www.softwarepros.org"
GITHUB_CLIENT_ID="Ov23liG3Da9UqJhj2tyW"
GITHUB_CLIENT_SECRET="7fe400de8965f317e12b1ec6d264a2c1248e2550"
```

✅ These look correct, but double-check the Client Secret matches GitHub.

### 4. **Test the Configuration**

After updating GitHub settings:

1. **Clear browser cache/cookies** for softwarepros.org
2. **Wait 5 minutes** for GitHub to propagate changes
3. **Try signing in again**

### 5. **Debug Information**

Visit: `https://www.softwarepros.org/api/auth/debug` (development only)

This will show you:
- Environment variables status
- Expected callback URL
- Current configuration

### 6. **Alternative Testing**

Try these URLs to test the OAuth flow:

**Direct GitHub OAuth URL:**
```
https://github.com/login/oauth/authorize?client_id=Ov23liG3Da9UqJhj2tyW&redirect_uri=https://www.softwarepros.org/api/auth/callback/github&scope=user:email&state=test
```

**NextAuth Sign-in URL:**
```
https://www.softwarepros.org/api/auth/signin/github
```

## 🔍 **Common Causes & Solutions**

### **Issue 1: Wrong Callback URL**
- **Symptom**: AccessDenied immediately
- **Fix**: Update GitHub app callback URL to exact match

### **Issue 2: Environment Variables Not Loaded**
- **Symptom**: AccessDenied or configuration errors
- **Fix**: Restart your deployment after setting env vars

### **Issue 3: GitHub App Suspended/Inactive**
- **Symptom**: AccessDenied or app not found
- **Fix**: Check GitHub app status, reactivate if needed

### **Issue 4: Domain Mismatch**
- **Symptom**: AccessDenied when redirecting
- **Fix**: Ensure all URLs use exact same domain (with www)

### **Issue 5: HTTPS Certificate Issues**
- **Symptom**: SSL/TLS errors during OAuth
- **Fix**: Verify SSL certificate is valid for www.softwarepros.org

## 🛠️ **Deployment Steps**

If you update environment variables:

1. **Update your deployment platform** (Coolify) with new env vars
2. **Restart the application**
3. **Clear DNS/CDN cache** if using Cloudflare
4. **Test the OAuth flow**

## 📞 **If Still Not Working**

1. **Check GitHub App Status**: Make sure it's not suspended
2. **Verify Domain Ownership**: Ensure you own www.softwarepros.org
3. **Test with HTTP**: Temporarily test with localhost to isolate issues
4. **Contact GitHub Support**: If the app seems misconfigured

## 🎯 **Expected Flow**

1. User clicks "Continue with GitHub"
2. Redirects to: `https://github.com/login/oauth/authorize?client_id=...`
3. User authorizes on GitHub
4. GitHub redirects to: `https://www.softwarepros.org/api/auth/callback/github`
5. NextAuth processes the callback
6. User is signed in and redirected to dashboard

Any break in this flow will cause AccessDenied errors.

## ✅ **Final Checklist**

- [ ] GitHub OAuth app callback URL is exactly `https://www.softwarepros.org/api/auth/callback/github`
- [ ] Homepage URL is `https://www.softwarepros.org`
- [ ] Environment variables are set correctly in production
- [ ] Application has been restarted after env var changes
- [ ] Browser cache has been cleared
- [ ] SSL certificate is valid for www.softwarepros.org

Once you've completed these steps, the GitHub OAuth should work perfectly! 🚀