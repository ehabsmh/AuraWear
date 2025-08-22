"use client";

import { useEffect, useState } from "react";

export default function Countdown({ endDate }: { endDate: string }) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const end = new Date(endDate).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, end - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);

      setLabel(d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`);
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [endDate]);

  return <span>{label || "—"}</span>;
}
