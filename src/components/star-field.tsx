"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: "sm" | "lg";
  duration: number;
  delay: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() > 0.85 ? "lg" : "sm",
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  }));
}

export function StarField() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStars(generateStars(35));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="star-field text-primary/40 dark:text-primary/60">
      {stars.map((star) => (
        <span
          key={star.id}
          className={`star ${star.size === "lg" ? "star-lg" : ""}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
