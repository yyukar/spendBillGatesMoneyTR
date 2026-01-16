import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  quantities,
  onBuy,
  onSell,
  onSetQuantity,
  canBuyFn,
}) {
  return (
    <div className="grid">
      {products.map((p) => {
        const qty = quantities[p.id] ?? 0;

        return (
          <ProductCard
            key={p.id}
            product={p}
            quantity={qty}
            onBuy={() => onBuy(p)}
            onSell={() => onSell(p)}
            onSetQuantity={(nextQty) => onSetQuantity(p, nextQty)}
            canSell={qty > 0}
            canBuy={canBuyFn(p)}
          />
        );
      })}
    </div>
  );
}


