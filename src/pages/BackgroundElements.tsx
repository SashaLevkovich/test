import { useMemo } from "react";

export function BackgroundElements() {
  const hearts = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      size: 18 + Math.random() * 20,
      left: Math.random() * 100,
      duration: 14 + Math.random() * 12,
      delay: -Math.random() * 20,
    }));
  }, []);

  const backgroundHearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: 16 + Math.random() * 20,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 14,
      delay: -Math.random() * 10,
    }));
  }, []);

  const rats = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      size: 18 + Math.random() * 14,
      left: Math.random() * 100,
      duration: 18 + Math.random() * 12,
      delay: -Math.random() * 8,
    }));
  }, []);

  return (
    <>
      <div className="hearts" aria-hidden="true">
        {backgroundHearts.map(h => (
          <div
            key={"bh" + h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              bottom: "-10vh",
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}>
            ❤️
          </div>
        ))}

        {rats.map(r => (
          <div
            key={"r" + r.id}
            className="rat"
            style={{
              left: `${r.left}%`,
              bottom: "-15vh",
              fontSize: `${r.size}px`,
              animationDuration: `${r.duration}s`,
              animationDelay: `${r.delay}s`,
            }}>
            🐭
          </div>
        ))}
      </div>

      <div className="hearts" aria-hidden="true">
        {hearts.map(h => (
          <div
            key={"h" + h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              bottom: "-10vh",
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}>
            ❤️
          </div>
        ))}
      </div>
    </>
  );
}
