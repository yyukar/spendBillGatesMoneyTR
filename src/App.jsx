import { useMemo, useState } from "react";
import "./styles/app.css";

import { PRODUCTS } from "./data/products";
import BalanceBar from "./components/BalanceBar";
import ProductGrid from "./components/ProductGrid";
import Receipt from "./components/Receipt";

const INITIAL_BALANCE = 100_000_000_000;

export default function App() {

  const [quantities, setQuantities] = useState({});


  const receiptLines = useMemo(() => {
    const lines = PRODUCTS.map((p) => {
      const q = quantities[p.id] ?? 0;
      if (q <= 0) return null;
      return {
        id: p.id,
        name: p.name,
        quantity: q,
        lineTotal: q * p.price,
      };
    }).filter(Boolean);


    lines.sort((a, b) => b.lineTotal - a.lineTotal);
    return lines;
  }, [quantities]);


  const spentTotal = useMemo(() => {
    return receiptLines.reduce((sum, l) => sum + l.lineTotal, 0);
  }, [receiptLines]);


  const balance = INITIAL_BALANCE - spentTotal;

  function canBuyFn(product) {
    return balance >= product.price;
  }

  function handleBuy(product) {
    if (balance < product.price) return;

    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + 1,
    }));
  }

  function handleSell(product) {
    setQuantities((prev) => {
      const current = prev[product.id] ?? 0;
      if (current <= 0) return prev;

      const next = { ...prev };
      if (current === 1) delete next[product.id];
      else next[product.id] = current - 1;

      return next;
    });
  }


  function handleSetQuantity(product, nextQty) {
    const wanted = Math.max(0, Math.floor(Number(nextQty) || 0));

    setQuantities((prev) => {
      const currentQty = prev[product.id] ?? 0;


      let spentExcludingThis = 0;
      for (const p of PRODUCTS) {
        if (p.id === product.id) continue;
        const q = prev[p.id] ?? 0;
        spentExcludingThis += q * p.price;
      }


      const availableForThis = INITIAL_BALANCE - spentExcludingThis;
      const maxQty = Math.floor(availableForThis / product.price);

      const finalQty = Math.min(wanted, Math.max(0, maxQty));

      if (finalQty === currentQty) return prev;

      const next = { ...prev };
      if (finalQty <= 0) delete next[product.id];
      else next[product.id] = finalQty;

      return next;
    });
  }

  return (

    <div className="app">
      <div className="titleBar">
        <h1 className="titleText">Spend Bill Gates Money on TR</h1>
      </div>

      <BalanceBar balance={balance} />

      <div className="container">
        <ProductGrid
          products={PRODUCTS}
          quantities={quantities}
          onBuy={handleBuy}
          onSell={handleSell}
          onSetQuantity={handleSetQuantity}
          canBuyFn={canBuyFn}
        />

        {receiptLines.length > 0 && (
          <Receipt lines={receiptLines} total={spentTotal} />
        )}

      </div>
    </div>
  );
}


