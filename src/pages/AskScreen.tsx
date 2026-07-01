import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/track";

const NO_TEXTS = [
  "нет",
  "подумай хорошо",
  "точно?",
  "Ну пожааалуйста ☺️",
  "Я принесу цветы! 🌹",
  "а если кино?",
  "последний шанс!",
  "ммм… всё-таки нет?",
  "ты хорошо подумала???",
  "подумай о нашем будущем",
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
  const [scale, setScale] = useState(1);

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
    const wrap = actionsRef.current;
    const btn = noBtnRef.current;
    if (!wrap || !btn) return;

    const b = getBounds();
    if (!b) return;

    const newScale = Math.max(0.5, 1 - clickCount * 0.1);
    setScale(newScale);

    let newLeft, newTop;
    let isOverlapping = true;

    while (isOverlapping) {
      newLeft = PADDING + Math.random() * (b.maxLeft - PADDING);
      newTop = PADDING + Math.random() * (b.maxTop - PADDING);

      if (newLeft < 150 && newTop > 50) {
        continue;
      }
      isOverlapping = false;
    }

    setNoPos({ left: newLeft!, top: newTop! });
  };

  const handleNo = () => {
    trackEvent("click_no", { label: NO_TEXTS[noIndex] });

    setClickCount(prev => prev + 1);

    if (!noFloating) setNoFloating(true);

    if (clickCount >= NO_TEXTS.length) {
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
      <p className="subtitle">
        Обещаю романтику, смех и немного магии вечера. С твоей улыбкой, уверен,
        получится вдвойне волшебно
      </p>

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
                  transform: `scale(${scale})`,
                }
              : undefined
          }>
          {clickCount >= NO_TEXTS.length ? "Сдаюсь 🏳️" : NO_TEXTS[noIndex]}
        </button>
      </div>
    </div>
  );
}
