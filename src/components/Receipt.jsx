import { formatMoney, formatMoneyShort } from "../utils/formatMoney";

export default function Receipt({ lines, total }) {
  return (
    <div className="receiptWrap">
      <h2 className="receiptTitle">Your Receipt</h2>

      <div className="receiptList">
        {lines.map((line) => (
          <div className="receiptRow" key={line.id}>
            <div>{line.name}</div>
            <div>x{line.quantity}</div>
            <div className="receiptRowPrice">{formatMoneyShort(line.lineTotal)}</div>
          </div>
        ))}
      </div>

      <div className="receiptTotalLine" />

      <div className="receiptTotal">
        <div>TOTAL</div>

        <div className="totalPrice">{formatMoney(total)}</div>
      </div>
    </div>
  );
}


