# Journey Now 🚖  
_A Next-Gen Ride-Hailing Platform (Uber Clone)_

## 🚀 Introduction  
Journey Now is a modern ride-hailing platform designed to provide a seamless experience for both passengers and captains (drivers). It connects riders with nearby captains, offering a smooth, real-time booking process with location tracking, fare estimation, and secure payments.
<img width="1440" alt="Screenshot 2568-02-13 at 3 19 41 AM" style="border-radius: 30px;" src="https://github.com/user-attachments/assets/12d7bf0e-6bcb-459c-941b-629e99f77340" />
<img width="1440" alt="Screenshot 2568-02-13 at 3 22 26 AM" style="border-radius: 30px;" src="https://github.com/user-attachments/assets/d09a5cdb-ef14-4a12-997f-bfc4d3c65348" />

## 🛠️ Features  
- 🔹 **User & Captain Authentication** (Signup/Login)  
- 📍 **Real-time Location Tracking** using Google Maps API  
- 🚖 **Ride Booking & Matching** (Find nearby captains)  
- 💳 **Payment Integration** (Secure Transactions)  
- 📡 **Live WebSocket Communication** (Socket.io)  
- 🏎️ **Captain Dashboard** (Track earnings & rides)  
- 🔔 **Push Notifications** for ride updates  
- 🔐 **JWT-Based Authentication** for security  

## 🏗️ Tech Stack  
### 🌐 Frontend:  
- React.js (Vite)  
- Tailwind CSS  
- Axios for API requests  

### 🖥️ Backend:  
- Node.js (Express.js)  
- MongoDB (Mongoose ORM)  
- Socket.io (Real-time communication)  
- JWT Authentication  
- Cloudinary (For user/captain profile images)  

## 📦 Installation & Setup  
### Prerequisites:  
- Node.js (v18+)  
- MongoDB  
- Redis (for caching, optional)  

### 🔧 Backend Setup  
```bash
git clone https://github.com/yourusername/journey-now.git
cd journey-now/backend
npm install
cp .env.example .env   # Configure environment variables
npm run dev  # Start backend server
🌍 Frontend Setup
bash
Copy
Edit
cd journey-now/frontend
npm install
npm run dev  # Start frontend development server
🛠️ Environment Variables (.env)
Create a .env file in the backend directory with:

plaintext
Copy
Edit
PORT=5000  
MONGO_URI=mongodb+srv://<your-db-url>  
JWT_SECRET=<your-secret-key>  
SOCKET_URL=<your-backend-url>  
🚀 Deployment
📡 Backend
Deployed on Railway / Vercel

bash
Copy
Edit
npm run build
npm start
🎨 Frontend
Deployed on Vercel

bash
Copy
Edit
npm run build
vercel deploy
📄 API Endpoints
Auth Routes
POST /users/register - Register a new user
POST /users/login - Login and get JWT
GET /users/profile - Fetch user profile
Ride Routes
POST /rides/request - Request a new ride
POST /rides/accept/:rideId - Captain accepts a ride
GET /rides/status/:rideId - Get ride status
WebSocket Events
join - User/Captain joins a session
update-location-captain - Update captain's location
ride-request - Notify captains of a new ride
🤝 Contributing
Contributions are welcome! Fork the repo and create a pull request.

🏆 Acknowledgments
Special thanks to OpenAI, Google Maps API, and the developer community for support in building Journey Now.

