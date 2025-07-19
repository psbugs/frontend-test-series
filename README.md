# 🎯 Frontend Admin Panel – Test Series Platform

This project is the **Admin Panel frontend** for a Test Series platform. Built using **React.js**, **Redux Toolkit**, **Tailwind CSS**, and modern UI libraries, it provides all necessary tools for admins to create, update, monitor, and analyze test series and learner performance.

---

## 🧩 Features

- 👤 Admin Login with Role-based Access
- 📦 Create and Manage Test Series
- 📄 Bulk Upload Questions (CSV supported)
- 📈 Dynamic Analytics Dashboard (Test-wise, Skill-wise)
- 🧠 Skill Tagging and Scoring Integration
- 🔄 Attempt Limits & Shuffle Logic Management
- 📊 View Results and Export Reports
- 🌐 Fully Responsive Admin UI (Tailwind CSS)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/frontend-admin-test-series.git
cd frontend-admin-test-series

2. Install Dependencies

npm install

3. Environment Setup
Create a .env file in the root directory with the following:


VITE_API_BASE_URL=http://localhost:5000/api

Adjust the URL to match your backend API.

4. Start the App

npm run dev
The app will run locally on: http://localhost:5173

🧾 Project Structure

src/
├── app/              # Redux Toolkit store setup
├── components/       # Reusable components (modals, forms)
├── pages/            # Route-level components
├── features/         # Slice logic and API services
├── services/         # API interaction layer
├── layouts/          # Page wrappers with nav/header
├── routes/           # Protected & public routing
└── utils/            # Helper functions
🧪 Testing
Currently manual testing is supported using tools like:

Postman

Mock Service Worker (MSW) (recommended for integration)

📦 Build for Production

npm run build
Then deploy the dist folder to any static hosting platform (e.g., Vercel, Netlify, Surge).

📬 Backend Integration
Make sure the Backend Test Series API service is running and accessible.

📦 Example backend: backend-test-series-apis

🛠 Tech Stack
React 19

Redux Toolkit

Tailwind CSS

React Router

Formik + Yup

Axios

👨‍💻 Developer Info
Your Name

Email: praveen786sunhare@gmail.com

GitHub: github.com/ps_bugs

📄 License
Licensed under the MIT License.

Let me know if you want this customized with your **name**, **GitHub links**, or include a **screenshot section**, **deployment guide**, or **API integration demo video** link. ​:contentReference[oaicite:0]{index=0}​
```

FYI : I have tested this using creds

For admin panel use the credentials

Email : praveen786sunhare@example.com
Pass : Interview2025@@

For learner dashboard you can use

Email : kinshu@gmail.com
Pass : Interview2025@@
