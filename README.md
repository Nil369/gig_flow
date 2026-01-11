# GigFlow - Modern Freelance Marketplace

A full-stack freelance marketplace platform built with React, Node.js, Express, MongoDB, and Socket.IO. Features real-time notifications, modern UI with shadcn components, and comprehensive gig/bid management.

## 🚀 Features

### Core Features
- **User Authentication**: Secure JWT-based authentication with HttpOnly cookies
- **Gig Management**: Create, browse, and manage freelance opportunities
- **Bidding System**: Freelancers can bid on gigs with custom messages and pricing
- **Hiring Logic**: Clients can review bids and hire freelancers (with atomic operations)
- **Real-time Notifications**: Socket.IO powered instant notifications when hired or rejected
- **Search & Filter**: Search gigs by title with real-time filtering
- **Responsive Design**: Fully responsive UI for mobile, tablet, and desktop

### UI/UX Highlights
- **Modern Design**: Beautiful gradient backgrounds and smooth animations
- **shadcn Components**: Premium UI components from shadcn/ui
- **Dark Mode**: Built-in theme switching
- **Toast Notifications**: User-friendly feedback using Sonner
- **Loading States**: Skeleton loaders for better UX
- **Status Badges**: Clear visual indicators for gig and bid statuses

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS 4** for styling
- **shadcn/ui** for components
- **React Router** for navigation
- **Axios** for API calls
- **Socket.IO Client** for real-time features
- **Framer Motion** for animations
- **Sonner** for toast notifications

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Socket.IO** for WebSocket connections
- **JWT** for authentication
- **bcrypt** for password hashing
- **Helmet** & **compression** for security and performance

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured for local development:
```env
VITE_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## 🎯 Usage

### For Clients
1. **Register/Login**: Create an account or sign in
2. **Post a Gig**: Click "Post a Gig" and describe your project
3. **Review Bids**: Navigate to "My Gigs" and click on a gig to see all bids
4. **Hire Freelancer**: Click "Hire This Freelancer" on your preferred bid
5. **Real-time Updates**: All other bidders get instant rejection notifications

### For Freelancers
1. **Register/Login**: Create an account or sign in
2. **Browse Gigs**: Explore available opportunities
3. **Submit Bid**: Click on a gig and submit your proposal with price and message
4. **Track Bids**: View all your bids in "My Bids" with status updates
5. **Get Notified**: Receive instant notifications when hired or rejected

## 🔐 Security Features

- **HttpOnly Cookies**: JWT tokens stored securely
- **Password Hashing**: bcrypt with salt rounds
- **CORS Protection**: Whitelisted origins
- **Rate Limiting**: Protection against brute force
- **Helmet.js**: Security headers
- **Input Validation**: Server-side validation for all endpoints

## 🎨 UI Components Used

- Cards, Buttons, Inputs, Textareas
- Badges, Dialogs, Dropdowns
- Tabs, Avatars, Separators
- Skeletons, Scroll Areas
- Toast Notifications (Sonner)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔄 Real-time Features

Socket.IO implementation includes:
- Auto-join user rooms on connection
- Instant hire notifications to freelancers
- Bid rejection notifications for non-selected bidders
- Notification history in navbar dropdown
- Unread notification badge counter

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - Get all open gigs (with search)
- `GET /api/gigs/:id` - Get gig by ID
- `POST /api/gigs` - Create new gig (protected)
- `GET /api/gigs/my-gigs` - Get my posted gigs (protected)

### Bids
- `POST /api/bids` - Submit a bid (protected)
- `GET /api/bids/my-bids` - Get my bids (protected)
- `GET /api/bids/:gigId` - Get bids for a gig (owner only)
- `PATCH /api/bids/:bidId/hire` - Hire a freelancer (owner only)

## 👨‍💻 Developer Notes

### Bonus Features Implemented
1. ✅ **Transactional Integrity**: Atomic hiring logic with race condition prevention. 
2. ✅ **Real-time Updates**: Socket.IO notifications for hiring and rejections

> Note: Transactional Feature will not work for local mongodb server.

### Key Features
- Context API for state management
- Protected routes for authenticated pages
- Optimistic UI updates
- Error handling with toast notifications
- Skeleton loading states
- Responsive mobile-first design

### Future Enhancements
- User profiles and ratings
- File uploads for gig attachments
- Payment integration
- Chat system between clients and freelancers
- Advanced search filters
- Email notifications

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Aceternity UI](https://ui.aceternity.com/) for design inspiration

