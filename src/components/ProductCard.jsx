import { useState } from "react";
import { formatMoney } from "../utils/formatMoney";

export default function ProductCard({
  product,
  quantity,
  onBuy,
  onSell,
  canBuy,
  canSell,
}) {
  const [imgError, setImgError] = useState(false);
  const showImg = product.image && !imgError;

  return (
    <div className="card">
      <div className="cardTop">
        <a
          className="productLink"
          href={product.url}
          target="_blank"
          rel="noreferrer"
          title="Mutt sayfasını aç"
        >
          {showImg ? (
            <img
              className="productImg"
              src={product.image}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="productImgFallback" aria-label="Motorcycle">
              🏍️
            </div>
          )}
        </a>
      </div>

      <a
        className="productLink"
        href={product.url}
        target="_blank"
        rel="noreferrer"
      >
        <h3 className="productName">{product.name}</h3>
      </a>

      <p className="productPrice">{formatMoney(product.price)}</p>

      <div className="actions">
        <button className="btn btnSell" onClick={onSell} disabled={!canSell}>
          Sell
        </button>

        <input className="qtyInput" value={quantity} readOnly />

        <button className="btn btnBuy" onClick={onBuy} disabled={!canBuy}>
          Buy
        </button>
      </div>
    </div>
  );
}






