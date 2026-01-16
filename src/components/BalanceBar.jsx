import { useEffect, useRef, useState } from "react";
import { formatMoney } from "../utils/formatMoney";

export default function BalanceBar({ balance }) {
    const [displayBalance, setDisplayBalance] = useState(balance);
    const intervalRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const start = displayBalance;
        const end = balance;
        const diff = end - start;
        const absDiff = Math.abs(diff);

        if (absDiff === 0) return;

        const SMALL_STEP_LIMIT = 2000;

        if (absDiff <= SMALL_STEP_LIMIT) {
            const step = diff > 0 ? 1 : -1;

            const totalDuration = 450;
            const msPerStep = Math.max(12, Math.floor(totalDuration / absDiff));

            intervalRef.current = setInterval(() => {
                setDisplayBalance((prev) => {
                    const next = prev + step;
                    if ((step === 1 && next >= end) || (step === -1 && next <= end)) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        return end;
                    }
                    return next;
                });
            }, msPerStep);

            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }

        const duration = 600;
        const startTime = performance.now();

        const tick = (now) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(start + diff * eased);
            setDisplayBalance(value);

            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setDisplayBalance(end);
            }
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [balance]);

    return <div className="balanceBar">{formatMoney(displayBalance)}</div>;
}

