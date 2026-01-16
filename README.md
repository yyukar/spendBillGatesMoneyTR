# Spend Bill Gates Money on TR — React Edition

A simple **“spend money”** style demo built with **React (Vite)**.  
You start with **$100,000,000,000** and buy/sell products (Mutt Motorcycles models).  
Balance updates with a **counting animation**, and purchases appear in **Your Receipt**.

---

## Live Demo

- [Vercel live demo](https://spend-bill-gates-money-tr.vercel.app/)

---

## Features

- **Starting Balance**
  - Starts with **$100,000,000,000**

- **Buy / Sell Logic**
  - **Buy** decreases balance
  - **Sell** increases balance
  - **Sell** is disabled when quantity is `0`
  - **Buy** is disabled when `price > balance`

- **Animated Balance**
  - Balance changes with a **counting effect** (e.g., 100 → 99 → 98…)

- **Receipt**
  - Receipt becomes visible **only after the first purchase**
  - Shows purchased items with:
    - quantity (xN)
    - line total (short format)
  - Shows **TOTAL** (full format)

- **Product Links + Image Fallback**
  - Product image and name link to the official product page
  - If the image can’t load, a **🏍️** fallback appears

---

## Getting Started

### Requirements
- Node.js (LTS recommended)
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build

```bash
npm run build
npm run preview
```

---

## Tech Stack

- React (Vite)
- CSS3

---

## Folder Structure

```text
spend-gates-tr/
├── src/
│   ├── components/
│   │   ├── BalanceBar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   └── Receipt.jsx
│   ├── data/
│   │   └── products.js
│   ├── styles/
│   │   ├── global.css
│   │   └── app.css
│   ├── utils/
│   │   └── formatMoney.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## Notes

- Balance is designed to stay correct in development even with **React StrictMode**.
- Money formatting:
  - **Cards + Balance Bar + TOTAL** use full format (e.g., `$3,950,000`)
  - **Receipt line totals** use short format (e.g., `$3.9m`)
- Product images are loaded via direct URLs; if blocked/unavailable, the UI falls back to **🏍️**.

---

## License

This project is currently **unlicensed**.  
You are free to use, modify, and learn from the code.
