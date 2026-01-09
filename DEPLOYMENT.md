# 🚀 Bloom & Petal Nepal - Deployment Guide

## Pre-Deployment Checklist

### 1. **Environment Setup**
- [ ] Node.js v16+ installed
- [ ] npm v8+ installed
- [ ] All dependencies installed: `npm install`
- [ ] Environment variables configured

### 2. **Code Quality**
```bash
# Run tests
npm test

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

### 3. **Build Optimization**
```bash
# Build for production
npm run build

# Check bundle size
npm run analyze-bundle

# Test production build locally
npm run preview
```

## Deployment Platforms

### **Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Benefits:**
- Zero-config deployment
- Automatic HTTPS
- Edge network
- Automatic previews for PRs
- Great performance

### **Option 2: Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**Benefits:**
- One-click deployment from Git
- Built-in CI/CD
- Form handling
- Serverless functions support

### **Option 3: GitHub Pages**
1. Update `vite.config.ts`:
```typescript
export default {
  base: '/BloomAndPetalNepal/',
  // ... other config
}
```

2. Deploy:
```bash
npm run build
npm run deploy
```

### **Option 4: Docker (Self-Hosted)**
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

```bash
# Build Docker image
docker build -t bloom-petal:latest .

# Run container
docker run -p 3000:3000 bloom-petal:latest
```

## Production Checklist

### **Security**
- [ ] Remove console.log statements
- [ ] Enable HTTPS
- [ ] Set secure headers (CSP, X-Frame-Options)
- [ ] Validate all user inputs
- [ ] Use environment variables for sensitive data
- [ ] Implement rate limiting

### **Performance**
- [ ] Minify CSS/JS
- [ ] Optimize images (use WebP)
- [ ] Enable gzip compression
- [ ] Use CDN for static assets
- [ ] Implement caching strategies
- [ ] Monitor Core Web Vitals

### **SEO**
- [ ] Add meta tags
- [ ] Create sitemap.xml
- [ ] Robots.txt configuration
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)

### **Monitoring**
- [ ] Set up error tracking (Sentry)
- [ ] Enable analytics (Google Analytics)
- [ ] Monitor uptime (Uptime Robot)
- [ ] Check performance metrics (Lighthouse)

## Environment Variables

Create `.env.production`:
```env
VITE_API_URL=https://your-api.com
VITE_GOOGLE_MAPS_KEY=your_key_here
VITE_ANALYTICS_ID=your_analytics_id
```

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Post-Deployment

### **Testing**
```bash
# Test production URL
curl https://your-domain.com

# Check SSL certificate
openssl s_client -connect your-domain.com:443
```

### **Monitoring**
- Check error logs
- Monitor analytics
- Test critical user flows
- Verify performance metrics

### **Rollback Plan**
```bash
# If issues arise
git revert <commit-hash>
npm run build
# Redeploy
```

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Score | > 90 |
| First Contentful Paint | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.8s |

## Troubleshooting

### **Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Performance Issues**
```bash
# Analyze bundle
npm run analyze-bundle

# Check dependencies
npm ls --depth=0
```

### **Memory Issues**
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## Support & Maintenance

- Monitor uptime: UptimeRobot, StatusPage
- Track errors: Sentry, Rollbar
- Analyze performance: New Relic, DataDog
- Log aggregation: LogRocket, Loggly

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Web Vitals](https://web.dev/vitals/)
- [Security Headers](https://securityheaders.com/)

---

**Last Updated:** January 2026
**Maintained by:** Bloom & Petal Nepal Team
