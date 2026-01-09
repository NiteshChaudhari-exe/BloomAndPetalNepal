# 📋 .env.local Analysis & Production Setup Guide

**Analysis Date**: January 9, 2026  
**Status**: ✅ Ready for Production Setup  
**Current File**: `.env.local` (analyzed)

---

## 🔍 Current .env.local Analysis

### What's Currently in Your .env.local

```
GEMINI_API_KEY=PLACEHOLDER_API_KEY
VITE_GEMINI_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000
NODE_ENV=development
... (40+ variables, most commented)
```

### Issues Identified ⚠️

1. **Line 1**: `GEMINI_API_KEY=PLACEHOLDER_API_KEY`
   - ❌ Should be `VITE_GEMINI_API_KEY` (Vite prefix missing)
   - ❌ Using placeholder value
   - Action: Remove this line

2. **Line 6**: `VITE_GEMINI_API_KEY=your_api_key_here`
   - ❌ Placeholder value
   - Action: Replace with actual API key

3. **Most Other Variables**: Commented out
   - ✅ Good (won't interfere)
   - Action: Only enable what you need

---

## 🎯 Step-by-Step Production Setup

### STEP 1: Clean Up .env.local (2 minutes)

Delete the first problematic line and keep only what's needed:

**Remove**: Line 1 (`GEMINI_API_KEY=PLACEHOLDER_API_KEY`)

**Result**: Your `.env.local` should start with:
```bash
# Bloom & Petal Nepal - Environment Variables Template
# Copy this file to .env and fill in with your actual values

# Google Generative AI - Required for AI-powered recommendations
# Get your API key from: https://ai.google.dev
VITE_GEMINI_API_KEY=your_api_key_here
```

---

### STEP 2: Get Your API Key (5 minutes)

**Where**: https://ai.google.dev  
**Process**:
1. Go to https://ai.google.dev
2. Click "Get API Key"
3. Sign in with Google (create account if needed)
4. Click "Create API key in Google Cloud Console"
5. Copy the API key (looks like: `AIza...`)
6. ⚠️ **Keep this secret! Never commit to Git!**

**Example** (DO NOT use this, it's fake):
```
VITE_GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### STEP 3: Update .env.local with Your Key (1 minute)

Replace `your_api_key_here` with your actual key:

**Change From**:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

**Change To**:
```
VITE_GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### STEP 4: Keep Only Essential Variables (2 minutes)

Your `.env.local` should have **only**:

```bash
# Google Generative AI - REQUIRED
VITE_GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Environment Mode - REQUIRED
NODE_ENV=development

# Backend API Configuration - For Phase 2
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000

# Feature Flags - Leave as is for now
VITE_ENABLE_DEMO_MODE=true
VITE_ENABLE_MOCK_DATA=true
```

**Delete/Comment Out** everything else for now (payment gateways, analytics, email, Firebase, etc.)

---

### STEP 5: Test Locally (2 minutes)

```bash
# Clear any cached builds
npm run build
# Expected: ✓ 51 modules transformed. No errors.

# Run dev server
npm run dev
# Expected: Running at http://localhost:5173

# Test in browser:
# - Check console (F12) - no errors
# - Navigate pages - all work
# - Dark mode - toggles correctly
```

---

### STEP 6: Prepare for Deployment (3 minutes)

**For Vercel/Netlify** (Recommended):
- ✅ Do NOT upload `.env.local` file
- ✅ Add environment variables in dashboard instead
- Instructions below

**For Docker/Self-Hosted**:
- ✅ Use `.env.local` for local testing
- ✅ Pass variables via environment on production server
- Don't commit `.env.local` to Git

---

## 🚀 Deployment: Environment Variables by Platform

### Platform 1: Vercel (Easiest)

**Step 1**: Deploy
```bash
npm install -g vercel
vercel --prod
```

**Step 2**: Add Environment Variables
1. Go to: https://vercel.com/dashboard
2. Select your project: `bloom-petal-nepal`
3. Navigate: Settings → Environment Variables
4. Add new variable:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: (paste your actual key from ai.google.dev)
   - **Environments**: All (Development, Preview, Production)
5. Click "Save"
6. Redeploy: Dashboard → Deployments → Redeploy latest

---

### Platform 2: Netlify (Git Integration)

**Step 1**: Connect GitHub
1. Go to: https://app.netlify.com
2. Click "Add new site"
3. "Import an existing project"
4. Select GitHub
5. Choose `BloomAndPetalNepal` repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

**Step 2**: Add Environment Variables
1. Site settings → Build & Deploy → Environment
2. Add variable:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: (paste your actual key)
3. Save
4. Trigger deploy: Push to GitHub (auto-deploys)

---

### Platform 3: Docker (Self-Hosted)

**For Local Testing**:
- Use `.env.local` file as is
- Run: `docker run -p 3000:3000 bloom-petal`

**For Production Server**:
```bash
docker run -p 3000:3000 \
  -e VITE_GEMINI_API_KEY=AIzaSy... \
  -e NODE_ENV=production \
  bloom-petal:latest
```

Or use `docker-compose.yml`:
```yaml
environment:
  VITE_GEMINI_API_KEY: ${VITE_GEMINI_API_KEY}
  NODE_ENV: production
```

---

## 📊 .env.local Variables Explained

### Critical Variables (MUST Have)

| Variable | Purpose | Value | Source |
|----------|---------|-------|--------|
| `VITE_GEMINI_API_KEY` | AI recommendations | `AIzaSy...` | https://ai.google.dev |
| `NODE_ENV` | Environment mode | `production` | Set by deployment platform |

### Important Variables (Should Have)

| Variable | Purpose | Value | Notes |
|----------|---------|-------|-------|
| `VITE_ENABLE_DEMO_MODE` | Use mock data | `true` | For Phase 1 (no backend) |
| `VITE_ENABLE_MOCK_DATA` | Use mock products | `true` | Replace with `false` in Phase 2 |

### Future Variables (Phase 2)

| Variable | Purpose | When to Add |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | Backend API endpoint | When you build backend |
| `VITE_STRIPE_PUBLIC_KEY` | Payment processing | When adding payments |
| `VITE_ESEWA_MERCHANT_CODE` | Nepal payments | When adding eSewa |
| `VITE_GOOGLE_ANALYTICS_ID` | Analytics | When setting up tracking |
| `VITE_SENTRY_DSN` | Error tracking | When setting up monitoring |

---

## ⚠️ Security Checklist

### DO ✅
- [x] Keep API key private
- [x] Add to deployment dashboard (Vercel/Netlify)
- [x] Use `.env.local` for local development only
- [x] Add `.env.local` to `.gitignore` (already done)
- [x] Regenerate keys if accidentally committed

### DON'T ❌
- [ ] Commit `.env.local` to Git
- [ ] Share API key in messages/emails
- [ ] Use placeholder values in production
- [ ] Hardcode keys in source code
- [ ] Push API key to GitHub

---

## 🔄 Current Status

| Item | Status | Action Needed |
|------|--------|---------------|
| `.env.local` exists | ✅ | Remove line 1 (GEMINI_API_KEY=...) |
| Variables documented | ✅ | Review which you need |
| API key | ❌ Missing | Get from ai.google.dev |
| .gitignore protection | ✅ | Already configured |
| Ready to deploy | ⏳ | After completing steps above |

---

## 🚀 Quick Command Reference

### Local Development
```bash
# Set up local environment
cp .env.example .env.local
# Edit .env.local and add VITE_GEMINI_API_KEY=AIzaSy...

# Run local dev server
npm run dev

# Test build
npm run build && npm run preview
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (first time)
vercel --prod

# Redeploy (after adding env vars in dashboard)
vercel --prod
```

### Docker Deployment
```bash
# Build image
docker build -t bloom-petal .

# Run with environment variable
docker run -p 3000:3000 \
  -e VITE_GEMINI_API_KEY=AIzaSy... \
  bloom-petal
```

---

## 📝 Complete Production Checklist

### Before Deploying
- [ ] Remove line 1 from `.env.local` (GEMINI_API_KEY=PLACEHOLDER)
- [ ] Get API key from https://ai.google.dev
- [ ] Update VITE_GEMINI_API_KEY with actual key
- [ ] Run `npm run build` (should succeed)
- [ ] Run `npm run preview` (test locally)
- [ ] Verify no errors in console
- [ ] Test all pages work

### During Deployment
- [ ] Choose platform (Vercel/Netlify recommended)
- [ ] Deploy code
- [ ] Add environment variables in platform dashboard
- [ ] Trigger redeploy

### After Deployment
- [ ] Visit live URL
- [ ] Verify pages load
- [ ] Test features (cart, checkout, dark mode)
- [ ] Check browser console (no errors)
- [ ] Test on mobile

---

## 🎯 Next Steps (In Order)

1. **RIGHT NOW** (2 min):
   - Remove line 1 from `.env.local`
   - Save file

2. **NEXT** (5 min):
   - Get API key from https://ai.google.dev
   - Update `VITE_GEMINI_API_KEY` in `.env.local`

3. **THEN** (5 min):
   - Run `npm run build`
   - Run `npm run preview`
   - Test in browser

4. **FINALLY** (10 min):
   - Choose deployment platform
   - Follow platform's instructions
   - Add environment variables in dashboard
   - Deploy and test live

---

## 📞 Troubleshooting

### "VITE_GEMINI_API_KEY is undefined"
```bash
# Check if variable is set
echo %VITE_GEMINI_API_KEY%  # Windows
echo $VITE_GEMINI_API_KEY    # Mac/Linux

# Make sure .env.local has the correct line:
VITE_GEMINI_API_KEY=AIzaSy...  # Correct prefix (VITE_)
GEMINI_API_KEY=...              # Wrong prefix (missing VITE_)
```

### "API Key Invalid"
- ✅ Get key from: https://ai.google.dev
- ✅ Key must start with: `AIzaSy...`
- ✅ Copy the full key (very long string)

### "Build fails"
```bash
# Try:
npm ci          # Clean install dependencies
npm run build   # Build again
```

### "Works locally but fails on production"
- ✅ Check platform dashboard for env variables
- ✅ Verify variable name: `VITE_GEMINI_API_KEY` (exact)
- ✅ Redeploy after adding variables

---

## 🎉 Summary

Your `.env.local` is **90% ready**. Just:

1. ✅ Remove problematic first line
2. ✅ Get API key (5 minutes)
3. ✅ Update the value
4. ✅ Test locally
5. ✅ Deploy

**Then you're live! 🚀**

---

**Questions?** See DEVELOPER_GUIDE.md or QUICK_DEPLOYMENT.md

**Ready?** Follow steps above to deploy in 15 minutes!
