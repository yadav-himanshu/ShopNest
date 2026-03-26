# 🛍️ ShopNest

**ShopNest** is a premium, high-performance E-commerce Single Page Application (SPA) built entirely with **Vanilla JavaScript**, modern **CSS3**, and **HTML5**. It leverages a custom-built routing system and a service-oriented architecture to provide a seamless, fluid shopping experience without the overhead of heavy frameworks.

![ShopNest Banner](https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80) 

---

## ✨ Features

- 🛒 **Dynamic Shopping Cart**: Real-time cart management with a glassmorphism drawer interface.
- ❤️ **Wishlist System**: Save your favorite items with instant badge updates across the app.
- 🔐 **User Authentication**: Secure signup and login flow using `localStorage` for session persistence.
- 🌓 **Adaptive Theme**: Toggle between Light and Dark modes with automatic system preference detection.
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop using a mobile-first design approach.
- 📦 **Order Management**: Simulate checkout and view order history through a dedicated profile dashboard.
- 🚀 **Lightning Fast**: Built with a custom SPA router for near-instant page transitions.
- 💎 **Premium UI**: Modern aesthetics featuring glassmorphism, smooth animations, and skeleton loaders.

## 🛠️ Tech Stack

- **Core**: Vanilla JavaScript (ES6+ Modules)
- **Styling**: CSS3 (Custom Variables, Flexbox, Grid, Glassmorphism)
- **Routing**: Custom SPA Router with History API support
- **State Management**: Service-based architecture with `localStorage`
- **API**: [FakeStoreAPI](https://fakestoreapi.com/) for real-time product data
- **Icons**: SVG-based dynamic iconography

## 📂 Project Structure

```text
ShopNest/
├── index.html          # Main entry point
├── src/
│   ├── components/     # Reusable UI components (Navbar, Footer, Cart, etc.)
│   ├── pages/          # Page components (Shop, Product, Profile, etc.)
│   ├── services/       # Business logic & API interactions (Auth, Cart, Api)
│   ├── styles/         # Global styles and theme variables
│   ├── utils/          # Helper functions and core Router logic
│   └── main.js         # Application initialization and route definitions
└── README.md           # Project documentation
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yadav-himanshu/ShopNest.git
   ```

2. **Open the project**:
   Simply open `index.html` in your browser or use a local development server like **Live Server** in VS Code.

3. **Explore**:
   - Browse products from different categories.
   - Sign up/Login to unlock the wishlist and checkout features.
   - Switch themes using the icon in the navigation bar.

## 🎨 Design Philosophy

ShopNest focuses on **visual excellence** and **user engagement**. The interface uses:
- **Glassmorphism**: Subtle blurs and translucent backgrounds for a premium feel.
- **Micro-animations**: Hover effects and transitions that make the app feel alive.
- **Skeleton Loaders**: Ensuring a smooth experience even while data is fetching.

---

Built with ❤️ by [Himanshu](https://github.com/yadav-himanshu)
