import type { Category } from "../lib/types";

interface Props {
  onNext: (category: Category) => void;
  onBack: () => void;
}

export function CategoryScreen({ onNext, onBack }: Props) {
  return (
    <div className="card" role="dialog" aria-live="polite">
      <h2 className="title">Чего бы тебе хотелось? 🎨</h2>
      <p className="subtitle">Выбери настроение нашего вечера</p>

      <div
        className="choice-grid"
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <button className="choice-btn" onClick={() => onNext("food")}>
          <span className="emoji" aria-hidden="true">
            🍷
          </span>
          <span style={{ fontSize: "15px", textAlign: "center" }}>
            Вкусный ужин
          </span>
        </button>

        <button className="choice-btn" onClick={() => onNext("culture")}>
          <span className="emoji" aria-hidden="true">
            🎭
          </span>
          <span style={{ fontSize: "15px", textAlign: "center" }}>
            Эстетика и искусство
          </span>
        </button>

        <button className="choice-btn" onClick={() => onNext("active")}>
          <span className="emoji" aria-hidden="true">
            🎢
          </span>
          <span style={{ fontSize: "15px", textAlign: "center" }}>
            Немного драйва
          </span>
        </button>

        <button className="choice-btn" onClick={() => onNext("chill")}>
          <span className="emoji" aria-hidden="true">
            🌙
          </span>
          <span style={{ fontSize: "15px", textAlign: "center" }}>
            Уютный чилл
          </span>
        </button>
      </div>

      <button
        className="btn-outline"
        onClick={() => onNext("surprise")}
        style={{ marginTop: "24px" }}>
        ✨ Сделай мне сюрприз
      </button>
      <button className="btn-back" onClick={onBack} aria-label="Назад">
        ← Назад
      </button>
    </div>
  );
}
