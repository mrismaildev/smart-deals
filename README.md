# React + Vite
# Smart Deals - Client Side 🚀

A dynamic and fully responsive frontend application for the **Smart Deals** platform. It allows users to browse products, place bids securely, and manage their bidding history seamlessly. 

## ✨ Key Features
* **Secure Authentication:** Integrated Firebase Authentication (Google/Email-Password) with seamless user state management.
* **Dynamic Bidding System:** Users can place bids on specific products, view their "My Bids" dashboard, and delete pending bids.
* **Protected Routes & Security:** Utilizes custom React hooks and Axios interceptors (`await user.getIdToken()`) to securely authorize API requests.
* **Pixel-Perfect UI:** Fully responsive design crafted with Tailwind CSS for optimal viewing across all devices.
* **Interactive UX:** Integrated SweetAlert2 for elegant alerts and confirmations.

## 🛠️ Tech Stack
* **Core:** React (Vite), JavaScript (ES6+)
* **Styling:** Tailwind CSS, DaisyUI
* **Routing:** React Router 
* **Authentication:** Firebase Auth
* **API Calls:** Axios (with custom secure instances and interceptor)

## ⚙️ Local Setup
1. Clone the repository: `git clone <your-repo-link>`
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add your Firebase config keys.
4. Start the development server: `npm run dev`
