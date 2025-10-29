# 🚀 Eco Hub Deployment Guide

## Overview
This guide covers deploying both the frontend (Next.js) and backend (Flask) to production.

---

## 📋 Prerequisites Checklist

Before deployment, ensure:
- [ ] All features are tested locally
- [ ] Environment variables are documented
- [ ] Database schema is finalized
- [ ] API endpoints are working
- [ ] Frontend builds successfully
- [ ] Production database is set up

---

## 🎯 Step-by-Step Deployment

### 1. Frontend Deployment (Next.js)

#### Option A: Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm install -g vercel

# From frontend directory
cd frontend
vercel

# Follow prompts:
# - Link to existing project or create new
# - Add environment variable: NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

**Manual Deployment:**
1. Push code to GitHub
2. Import project at vercel.com
3. Set environment variables
4. Deploy

#### Option B: Netlify
```bash
npm install -g netlify-cli
cd frontend

# Build and deploy
npm run build
netlify deploy --prod
```

#### Environment Variables Needed:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

---

### 2. Backend Deployment (Flask)

#### Option A: Render.com (Recommended)
1. Create new Web Service
2. Connect GitHub repository
3. Settings:
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app`
   - **Environment**: `Python 3`

4. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   FLASK_ENV=production
   FLASK_SECRET_KEY=your-secret-key
   JWT_SECRET_KEY=your-jwt-secret
   OPENAI_API_KEY=your-openai-key
   ```

5. Add PostgreSQL database (Render provides DATABASE_URL)

#### Option B: Railway.app
1. New Project → Deploy from GitHub
2. Add PostgreSQL database
3. Set environment variables
4. Deploy

#### Option C: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create eco-hub-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set DATABASE_URL=$(heroku pg:credentials:url DATABASE)
heroku config:set FLASK_ENV=production
heroku config:set FLASK_SECRET_KEY=your-secret-key
heroku config:set JWT_SECRET_KEY=your-jwt-secret
heroku config:set OPENAI_API_KEY=your-openai-key

# Deploy
git push heroku development:main
```

#### Option D: AWS EC2 (More Complex)
1. Launch EC2 instance (Ubuntu)
2. Install Python, Nginx, PostgreSQL
3. Clone repository
4. Set up Gunicorn + Nginx
5. Configure SSL with Let's Encrypt

---

### 3. Database Setup

#### Option A: Same Platform as Backend (Recommended)
- Render: Built-in PostgreSQL
- Railway: Built-in PostgreSQL  
- Heroku: Use Heroku Postgres addon

#### Option B: Separate Database Provider
- **Supabase** (PostgreSQL as a service)
- **Neon** (Serverless PostgreSQL)
- **PlanetScale** (MySQL alternative)

---

## 🔧 Production Configuration

### Backend Updates Needed:

1. **Update CORS in `backend/app.py`:**
```python
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://your-frontend-domain.vercel.app",
            "http://localhost:3000"  # Keep for local dev
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})
```

2. **Add production WSGI server:**
```bash
# Add to requirements.txt
gunicorn==21.2.0
```

3. **Create Procfile (for Heroku/Railway):**
```
web: cd backend && gunicorn app:app --bind 0.0.0.0:$PORT
```

---

## 🔐 Security Checklist

- [ ] Use strong, unique secrets for production
- [ ] Never commit `.env` files
- [ ] Use HTTPS for all connections
- [ ] Enable rate limiting on backend
- [ ] Sanitize user inputs
- [ ] Keep dependencies updated
- [ ] Use environment variables for all secrets
- [ ] Set up proper CORS origins

---

## 📊 Post-Deployment

1. **Test all endpoints:**
   ```bash
   curl https://your-backend.com/api/health
   curl https://your-backend.com/api/hello
   ```

2. **Verify database connection:**
   - Check backend logs
   - Test CRUD operations

3. **Test frontend:**
   - All pages load correctly
   - API calls work
   - Authentication works
   - Images/videos load

---

## 🐛 Common Deployment Issues

### Issue: Environment Variables Not Working
**Solution:** Ensure variable names match exactly (case-sensitive)

### Issue: Database Connection Failed  
**Solution:** Check DATABASE_URL format and credentials

### Issue: CORS Errors
**Solution:** Update CORS origins with production frontend URL

### Issue: Build Fails
**Solution:** Check build logs, ensure all dependencies are in requirements.txt

---

## 📞 Need Help?

If you run into issues:
1. Check deployment platform logs
2. Verify environment variables
3. Test API endpoints with Postman/curl
4. Review error messages carefully

---

## ✅ Deployment Checklist

Before going live:
- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible  
- [ ] Database connected and working
- [ ] Environment variables configured
- [ ] CORS configured for production
- [ ] SSL/HTTPS enabled
- [ ] All features tested in production
- [ ] Error handling working
- [ ] Loading states working
- [ ] Mobile responsive

