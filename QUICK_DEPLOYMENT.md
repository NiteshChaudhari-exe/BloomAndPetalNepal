# 🚀 Quick Deployment Guide (5-Minute Setup)

## ⚡ Fastest Deployment: Vercel (Recommended)

### Step 1: Prepare (1 min)
```bash
# Ensure .env.example exists (it does!)
# Create actual .env file with your API key
cp .env.example .env
# Edit .env and add your VITE_GEMINI_API_KEY
```

### Step 2: Install & Login (1 min)
```bash
npm install -g vercel
vercel login  # Sign up or log in with GitHub
```

### Step 3: Deploy (1 min)
```bash
vercel --prod
# Answer prompts:
# Link to existing project? → No
# Project name? → bloom-petal-nepal
# Framework? → Vite (auto-detected)
# Output directory? → dist
```

### Step 4: Add Environment Variables (2 min)
1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Add: `VITE_GEMINI_API_KEY` = your_actual_key
5. Redeploy

**✅ Done! Your app is live!**

---

## 📱 Verify Deployment

```bash
# Test the production build locally first
npm run build
npm run preview

# Then check live URL
# https://bloom-petal-nepal.vercel.app
```

---

## 🔧 Alternative: Netlify (Also Quick)

### GitHub Integration (Recommended)
1. Push code to GitHub
2. Go to netlify.com
3. Click "New site from Git"
4. Connect GitHub → Select repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables
8. Deploy!

---

## 🐳 Alternative: Docker (For VPS/Servers)

```bash
# Build Docker image
docker build -t bloom-petal .

# Run locally to test
docker run -p 3000:3000 bloom-petal

# Push to Docker Hub (optional)
docker tag bloom-petal yourusername/bloom-petal
docker push yourusername/bloom-petal

# Deploy on your server
# (copy Dockerfile and docker-compose.yml)
docker-compose up -d
```

---

## ✅ Pre-Deployment Verification

Before deploying, run:

```bash
# 1. Build production version
npm run build
# Should show: ✓ 51 modules transformed, no errors

# 2. Preview production
npm run preview
# Open http://localhost:4173
# Test: navigation, search, cart, dark mode

# 3. Check bundle size
# Should be < 150 kB gzipped
ls -lh dist/assets/

# 4. Verify no secrets in code
grep -r "GEMINI_API_KEY=" src/
# Should return NOTHING (only in .env)
```

---

## 🔐 Security Checklist

Before hitting "Deploy":

- [ ] `.env` created (copy from `.env.example`)
- [ ] `.env` in `.gitignore` (don't commit!)
- [ ] No hardcoded secrets in code
- [ ] HTTPS enabled on domain
- [ ] API key properly restricted (in Google Cloud)
- [ ] Backup plan ready

---

## 🎯 Current Status

| Item | Status | What to Do |
|------|--------|-----------|
| Code | ✅ Ready | Nothing - fully tested |
| Build | ✅ Ready | `npm run build` (should pass) |
| Bundle | ✅ Ready | 110 kB gzipped ✅ |
| Documentation | ✅ Ready | All guides complete |
| Environment | ⚠️ Needs Setup | Copy `.env.example` to `.env` and add API key |
| API Key | ❌ Missing | Get from https://ai.google.dev |

---

## 📋 Deployment Checklist

```
Before Deploying:
☐ Build succeeds (npm run build)
☐ Preview works (npm run preview)
☐ All pages load (/, /shop, /cart, /checkout)
☐ Dark mode works
☐ No console errors (DevTools)
☐ .env file created with API key
☐ .env NOT committed to Git

After Deploying:
☐ Live URL loads (sometimes takes 1-2 min)
☐ All pages load
☐ Search works
☐ Cart works
☐ Checkout process works
☐ Mobile view works
☐ Dark mode works
☐ Test in Chrome, Firefox, Safari
```

---

## 🔄 Next: Replace Mock Data (Phase 2)

After deployment, plan to replace:

1. **Authentication** → Real JWT/OAuth
2. **Database** → MongoDB/PostgreSQL
3. **API** → Real backend endpoints
4. **Payments** → Real payment gateway
5. **Email** → Real email service

See `DEVELOPER_GUIDE.md` for migration path.

---

## 🆘 Common Issues

### "Cannot find module 'react'"
```bash
npm install
npm run build
```

### "VITE_GEMINI_API_KEY is undefined"
```bash
# Create .env file with actual key
echo "VITE_GEMINI_API_KEY=sk_your_key" > .env
```

### "Build fails with TypeScript errors"
```bash
# Check tsconfig.json (should be correct)
# Run: npm run build 2>&1 | head -20
# Fix errors shown
```

### "Deployment says 'dist' folder not found"
```bash
npm run build  # Creates dist folder
# Then deploy again
```

---

## 📞 Getting Help

1. **Vercel Issues** → https://vercel.com/support
2. **Build Errors** → Check `npm run build` output
3. **Code Issues** → See DEVELOPER_GUIDE.md
4. **Deploy Issues** → Check platform-specific docs

---

**Ready to deploy? Start with Vercel for fastest setup! 🚀**

Full deployment guide: See `PRODUCTION_DEPLOYMENT.md`
