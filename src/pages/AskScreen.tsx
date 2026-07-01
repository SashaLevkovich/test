import { useEffect, useRef, useState } from "react";

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

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const shuffle = <T,>(arr: T[]) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

interface Props {
  onYes: () => void;
}

export function AskScreen({ onYes }: Props) {
  const [noIndex, setNoIndex] = useState(0);
  const [, setNoQueue] = useState<number[]>([]);
  const [noFloating, setNoFloating] = useState(false);
  const [noPos, setNoPos] = useState<{ left: number; top: number } | null>(
    null,
  );

  const [clickCount, setClickCount] = useState(0);

  const PADDING = 8;
  const actionsRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

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
    setNoQueue(shuffle(range(NO_TEXTS.length).slice(1)));
  }, []);

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

  const moveNo = () => {
    const b = getBounds();
    if (!b) return;
    const left = PADDING + Math.random() * (b.maxLeft - PADDING);
    const top = PADDING + Math.random() * (b.maxTop - PADDING);
    setNoPos({ left, top });
  };

  const handleNo = () => {
    setClickCount(prev => prev + 1);

    if (clickCount >= 6) {
      alert("Я не принимаю отказов 😅 Жми 'Да'!");
      return;
    }

    if (!noFloating) {
      setNoFloating(true);
      requestAnimationFrame(moveNo);
    } else {
      moveNo();
    }

    setNoQueue(prevQ => {
      const current = noIndex;
      const pool = prevQ.length
        ? prevQ
        : shuffle(range(NO_TEXTS.length).filter(i => i !== current));
      const [next, ...rest] = pool;
      setNoIndex(next);
      return rest;
    });
  };

  return (
    <div
      className="card"
      role="dialog"
      aria-modal="true"
      aria-label="Приглашение">
      <h1 className="title">Пойдём на свидание? 💫</h1>
      <p className="subtitle">Обещаю романтику, смех и немного магии вечера.</p>

      <div className="actions" ref={actionsRef}>
        <button type="button" className="btn btn-yes" onClick={onYes}>
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
          {clickCount >= 6 ? "Сдаюсь 🏳️" : NO_TEXTS[noIndex]}
        </button>
      </div>
    </div>
  );
}
