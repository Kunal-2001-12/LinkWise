
# LinkWise

> A modern, full-stack URL shortener and analytics platform built with Next.js, MongoDB, and Genkit AI. Designed and developed by **Kunal Sur**.

---

## Features

- **User Registration & Authentication**: Secure sign-up and login with JWT and bcrypt password hashing.
- **URL Shortening**: Instantly generate unique, memorable short links from long URLs.
- **URL Redirection**: Fast, reliable redirection from short links to original URLs.
- **Dashboard**: Manage all your links, view analytics, and delete URLs in a clean dashboard.
- **Analytics**: Track clicks, locations, and devices for each link (with beautiful charts).
- **QR Code Generation**: Instantly generate QR codes for every short link (no external API required).
- **Team Management**: Collaborate with your team, assign roles, and manage links together.
- **Responsive UI**: Fully responsive, modern design with smooth transitions and clear visual hierarchy.

## Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS, Lucide Icons
- **Backend**: Next.js API routes, MongoDB (via Mongoose or native driver)
- **AI Integration**: Genkit AI for smart features
- **Authentication**: JWT, bcrypt
- **State Management**: React Context, Hooks
- **Other Libraries**: qrcode.react, recharts, react-hook-form, zod, date-fns

## Style Guidelines

- **Primary color**: Slate blue (#7395AE)
- **Background**: Light gray (#D7CEC7)
- **Accent**: Soft violet (#6B5B95)
- **Fonts**: 'Poppins' (headline), 'PT Sans' (body)
- **Icons**: Simple, line-based (Lucide)
- **Layout**: Clean, structured, with clear hierarchy
- **Animations**: Subtle transitions and feedback

## Folder Structure

- `src/app/` — Main app pages and routes
- `src/components/` — Reusable UI and dashboard components
- `src/ai/` — Genkit AI integration
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions
- `docs/` — Project documentation and blueprints

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kunal-2001-12/LinkWise.git
   cd LinkWise
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory:
     ```env
     MONGODB_URI=mongodb+srv://kunalsur2001:PjyAVAl4HEtgN73L@cluster0.sbufhce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - (Replace with your actual MongoDB URI if you change your password or cluster)
   - Make sure your MongoDB user has read/write access to your database (e.g., `linkwise`).
   - If you see authentication errors, double-check your username, password, and database permissions in MongoDB Atlas.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   - By default, the app runs on [http://localhost:3004](http://localhost:3004)
   - If you see `EADDRINUSE` errors, it means the port is already in use. Either stop the process using that port, or run on a different port:
     ```bash
     npm run dev -- -p 3005
     ```
5. **Open your browser:**
   - Visit [http://localhost:3004](http://localhost:3004) (or your chosen port)

## Usage

- Register a new account or log in.
- Shorten URLs and manage them from your dashboard.
- View analytics and generate QR codes for your links.
- Collaborate with your team (if enabled).


## Environment Variables

- `MONGODB_URI` — MongoDB connection string (required, see above)

## Author

**Kunal Sur**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
