## ✨ Features

### Core Functionality
- 🔍 **Restaurant Discovery** - Search, filter, and browse restaurants
- 📅 **Reservation System** - Book, modify, and cancel reservations
- ⭐ **Reviews & Ratings** - Post reviews and rate restaurants
- ❤️ **Favorites** - Save favorite restaurants for quick access
- 👤 **User Profiles** - Manage personal information and preferences
- 📱 **Responsive Design** - Mobile, tablet, and desktop optimized

### Advanced Features
- 🎲 **Surprise Me** - Random restaurant recommendations
- 🗳️ **Group Polls** - Vote on restaurant choices with friends
- 💰 **Split Bill Calculator** - Calculate bill splits with tips
- ⏰ **Waitlist Management** - Join waitlists for fully booked slots
- 🔔 **Notifications** - Booking confirmations and reminders (mocked)

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Framework | 18.x |
| **TypeScript** | Type Safety | 5.x |
| **Tailwind CSS** | Styling | 3.x |
| **React Router** | Navigation | 6.x |
| **Lucide React** | Icons | Latest |
| **Vite** | Build Tool | 5.x |
| **Vitest** | Unit Testing | Latest |
| **Cypress** | E2E Testing | 13.x |

### Backend
- **localStorage** - Client-side data persistence (simulates backend)
- **Mock Data** - Pre-populated restaurants, users, and reservations

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

### Required Software

1. **Node.js** (v18.x or higher)
   - Download: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (v9.x or higher) or **yarn** (v1.22.x or higher)
   - npm comes with Node.js
   - Verify installation: `npm --version`

3. **Git** (v2.x or higher)
   - Download: https://git-scm.com/
   - Verify installation: `git --version`

4. **Code Editor** (Recommended: Visual Studio Code)
   - Download: https://code.visualstudio.com/

### Optional but Recommended

- **React Developer Tools** - Browser extension for debugging
- **Cypress** - Already included, but may need system dependencies (see below)

---

## 🚀 Installation

Follow these steps to get TableNow running on your local machine:

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/YOUR-USERNAME/tablenow.git

# OR using SSH
git clone git@github.com:YOUR-USERNAME/tablenow.git

# Navigate into the project directory
cd tablenow
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages including:
- React and React DOM
- TypeScript and type definitions
- Tailwind CSS and PostCSS
- React Router
- Lucide React icons
- Development tools (Vite, Vitest, Cypress)

**Expected installation time:** 2-5 minutes depending on your internet connection.

### Step 3: Verify Installation

```bash
# Check if all dependencies are installed
npm list --depth=0

# OR with yarn
yarn list --depth=0
```

You should see a list of installed packages without any errors.

---

## 🏃 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

**Expected output:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Open your browser and navigate to **http://localhost:5173/**

The application will automatically reload when you make changes to the source code.

### Production Build

Create an optimized production build:

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist/` directory.

---

## 📁 Project Structure

```
tablenow/
├── public/                 # Static assets
│   └── favicon.ico
├── src/
│   ├── components/        # React components
│   │   ├── layout/       # Navigation, Footer, Layout
│   │   ├── restaurant/   # Restaurant cards, details
│   │   ├── booking/      # Booking flow components
│   │   ├── ui/           # Reusable UI components
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── RestaurantList.tsx
│   │   ├── RestaurantDetail.tsx
│   │   ├── Booking.tsx
│   │   ├── Reservations.tsx
│   │   └── ...
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ReservationContext.tsx
│   │   └── FavoritesContext.tsx
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── data/             # Mock data
│   │   ├── restaurants.ts
│   │   ├── users.ts
│   │   └── reservations.ts
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── cypress/              # E2E tests
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── tests/                # Unit tests
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
