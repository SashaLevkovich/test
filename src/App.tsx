import { useEffect, useRef, useState } from "react";
import { trackEvent } from "./lib/track";

type Screen = "loading" | "ask" | "yes";

const NO_TEXTS = [
  "нет",
  "подумай хорошо",
  "точно?",
  "Ну пожааалуйста ☺️",
  "Я принесу цветы! 🌹",
  "а если кино?",
  "последний шанс!",
  "ммм… всё-таки нет?",
  "Последний шанс 😅",
];

const DATE_INFO = {
  date: "31 октября 2025",
  time: "19:00",
  place: "кафе «Марсель»",
  address: "ул. Пушкина, 10",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [noIndex, setNoIndex] = useState(0);
  const [noFloating, setNoFloating] = useState(false);
  const [noPos, setNoPos] = useState<{ left: number; top: number } | null>(
    null,
  );

  const PADDING = 8;
  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const actionsRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const getBounds = () => {
    const wrap = actionsRef.current;
    const btn = noBtnRef.current;
    if (!wrap || !btn) return null;

    const wrapW = wrap.clientWidth;
    const wrapH = wrap.clientHeight;
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;

    const maxLeft = Math.max(PADDING, wrapW - btnW - PADDING);
    const maxTop = Math.max(PADDING, wrapH - btnH - PADDING);
    return { maxLeft, maxTop };
  };

  useEffect(() => {
    const t = setTimeout(() => setScreen("ask"), 6000);
    return () => clearTimeout(t);
  }, []);

  const moveNo = () => {
    const b = getBounds();
    if (!b) return;
    const left = PADDING + Math.random() * (b.maxLeft - PADDING);
    const top = PADDING + Math.random() * (b.maxTop - PADDING);
    setNoPos({ left, top });
  };
  const handleYes = () => {
    trackEvent("click_yes", { label: "yes" });
    setScreen("yes");
  };

  const handleNo = () => {
    trackEvent("click_no", { label: NO_TEXTS[noIndex] });

    if (!noFloating) {
      setNoFloating(true);
      requestAnimationFrame(moveNo);
    } else {
      moveNo();
    }
    setNoIndex(i => (i + 1) % NO_TEXTS.length);
  };

  useEffect(() => {
    const onResize = () => {
      if (!noFloating || !noPos) return;
      const b = getBounds();
      if (!b) return;
      setNoPos({
        left: clamp(noPos.left, PADDING, b.maxLeft),
        top: clamp(noPos.top, PADDING, b.maxTop),
      });
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [noFloating, noPos]);

  const hearts = Array.from({ length: 14 }).map((_, i) => {
    const size = 18 + Math.random() * 20;
    const left = Math.random() * 100;
    const duration = 14 + Math.random() * 12;
    const delay = -Math.random() * duration;
    return { id: i, size, left, duration, delay };
  });

  return (
    <>
      <div className="hearts" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={"h" + i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-10vh",
              fontSize: `${16 + Math.random() * 20}px`,
              animationDuration: `${10 + Math.random() * 14}s`,
              animationDelay: `${-Math.random() * 10}s`,
            }}>
            ❤️
          </div>
        ))}

        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={"r" + i}
            className="rat"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-15vh",
              fontSize: `${18 + Math.random() * 14}px`,
              animationDuration: `${18 + Math.random() * 12}s`,
              animationDelay: `${-Math.random() * 8}s`,
            }}>
            🐭
          </div>
        ))}
      </div>

      <div className="hearts" aria-hidden="true">
        {hearts.map(h => (
          <div
            key={h.id}
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

      <div className={`loader ${screen !== "loading" ? "hidden" : ""}`}>
        <img src="/rats-with-hearts.png" alt="Милые крыски с сердечками" />
      </div>

      <div className="container">
        {screen === "ask" && (
          <div
            className="card"
            role="dialog"
            aria-modal="true"
            aria-label="Приглашение">
            <h1 className="title">Пойдём на свидание? 💫</h1>
            <p className="subtitle">
              Обещаю кофе, смех и немного магии вечера.
            </p>

            <div className="actions" ref={actionsRef}>
              <button type="button" className="btn btn-yes" onClick={handleYes}>
                Да
              </button>

              <button
                type="button"
                className="btn btn-no"
                ref={noBtnRef}
                onClick={handleNo}
                style={
                  noFloating && noPos
                    ? {
                        position: "absolute",
                        left: noPos.left,
                        top: noPos.top,
                      }
                    : undefined
                }>
                {NO_TEXTS[noIndex]}
              </button>
            </div>
          </div>
        )}

        {screen === "yes" && (
          <div className="card info" role="status" aria-live="polite">
            <h2 className="title">Ура! 🌸</h2>
            <div className="when">
              {DATE_INFO.date}, {DATE_INFO.time}
            </div>
            <div className="where">
              {DATE_INFO.place}
              <br />
              {DATE_INFO.address}
            </div>
            <p className="subtitle">
              Я пришлю тебе отметку на карте. Одевайся удобно и красиво ✨
            </p>
          </div>
        )}
      </div>
    </>
  );
}
