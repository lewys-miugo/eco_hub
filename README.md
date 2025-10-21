# 🌍 Eco Hub - Hello World Application

A modern full-stack hello world application demonstrating a complete web development workflow with **Flask**, **PostgreSQL**, **Next.js**, and **Tailwind CSS**.

## ✨ Features

- 🎨 **Beautiful UI** - Built with Next.js and Tailwind CSS
- 🔌 **RESTful API** - Flask backend with CORS support
- 🗄️ **Database Integration** - PostgreSQL connection
- 🌙 **Dark Mode** - Full dark mode support
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Hot Reload** - Development with instant updates
- 🔒 **Type Safe** - TypeScript throughout

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser (Port 3000)               │
│              Next.js Frontend (React)               │
│         Tailwind CSS + TypeScript                   │
└────────────────────┬────────────────────────────────┘
                     │ HTTP Requests
                     ↓
┌─────────────────────────────────────────────────────┐
│              Flask Backend (Port 5000)              │
│         Python + Flask-CORS                        │
│         RESTful API Endpoints                       │
└────────────────────┬────────────────────────────────┘
                     │ SQL Queries
                     ↓
┌─────────────────────────────────────────────────────┐
│           PostgreSQL Database                       │
│         Relational Data Storage                     │
└─────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
eco_hub/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Environment template
│   └── venv/                  # Virtual environment
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # Main page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.ts     # Tailwind config
│   └── tsconfig.json          # TypeScript config
│
├── SETUP_GUIDE.md             # Detailed setup instructions
├── QUICKSTART.md              # Quick start guide
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL 12+

### Installation

1. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database credentials
```

2. **Frontend Setup**
```bash
cd frontend
npm install
```

3. **Start Services**

Terminal 1:
```bash
cd backend
source venv/bin/activate
python app.py
```

Terminal 2:
```bash
cd frontend
npm run dev
```

4. **Open Browser**
```
http://localhost:3000
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Comprehensive setup guide

## 🔌 API Endpoints

### GET /api/hello
Returns hello world message with database status

**Response:**
```json
{
  "message": "Hello from Flask!",
  "database": "Connected",
  "timestamp": "2024-10-21 12:34:56.789012",
  "status": "success"
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "healthy"
}
```

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Flask | 2.3.3 | Web framework |
| Flask-CORS | 4.0.0 | Cross-origin support |
| psycopg2 | 2.9.7 | PostgreSQL adapter |
| python-dotenv | 1.0.0 | Environment variables |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.x | React framework |
| React | 19.x | UI library |
| TypeScript | Latest | Type safety |
| Tailwind CSS | 3.x | Styling |

### Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| PostgreSQL | 12+ | Relational database |

## 🎯 Features Explained

### Frontend Features
- ✅ Client-side data fetching
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive grid layout
- ✅ Dark mode support
- ✅ TypeScript type safety

### Backend Features
- ✅ CORS enabled for frontend
- ✅ Database connection pooling
- ✅ Error handling
- ✅ Health check endpoint
- ✅ Environment variable support

## 🔄 Data Flow

1. User opens browser → http://localhost:3000
2. Next.js frontend loads
3. useEffect hook triggers API call
4. Fetch request sent to Flask backend
5. Flask connects to PostgreSQL
6. Database returns current timestamp
7. Flask returns JSON response
8. Frontend displays data with styling

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/eco_hub
FLASK_ENV=development
FLASK_DEBUG=True
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Heroku/AWS)
```bash
cd backend
# Configure for production
# Deploy to your hosting platform
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | `lsof -i :5000` then `kill -9 <PID>` |
| Port 3000 in use | `lsof -i :3000` then `kill -9 <PID>` |
| Database error | Ensure PostgreSQL is running and database exists |
| CORS error | Verify Flask-CORS is installed and enabled |
| Module not found | Run `pip install -r requirements.txt` or `npm install` |

## 📖 Learning Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🎓 Learning Outcomes

By working with this project, you'll learn:
- ✅ Full-stack web development
- ✅ Frontend-backend communication
- ✅ Database integration
- ✅ REST API design
- ✅ Modern web technologies
- ✅ Development workflow

---

**Happy coding! 🚀**

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

