import type { InviteState } from "../lib/types";

interface Props {
  data: InviteState;
  onReset: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  food: "Вкусный ужин 🍷",
  culture: "Эстетика и искусство 🎭",
  active: "Немного драйва 🎢",
  chill: "Уютный чилл 🌙",
  surprise: "Сюрприз ✨",
};

export function SummaryScreen({ data, onReset }: Props) {
  const formatLabel = data.category
    ? CATEGORY_LABELS[data.category]
    : "Сюрприз ✨";

  return (
    <div className="card info" role="status" aria-live="polite">
      <h2 className="title">Всё готово! 💌</h2>
      <p className="subtitle">Твой официальный билет на идеальный вечер</p>

      <div className="ticket">
        <div className="ticket-row">
          <span className="ticket-label">Дата</span>
          <span className="ticket-value">
            {data.date === "surprise" ? "Сюрприз ✨" : data.date}
          </span>
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Время</span>
          <span className="ticket-value">
            {data.time === "surprise" ? "Сюрприз ✨" : data.time}
          </span>
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Формат</span>
          <span className="ticket-value">{formatLabel}</span>
        </div>

        {data.details && data.category !== "surprise" && (
          <div className="ticket-row">
            <span className="ticket-label">Пожелания</span>
            <span className="ticket-value">{data.details}</span>
          </div>
        )}
      </div>

      <div className="actions" style={{ minHeight: "auto", marginTop: "32px" }}>
        <button
          className="btn btn-yes"
          onClick={() => window.open("https://t.me/lhrec", "_blank")}
          style={{ width: "100%" }}>
          Написать мне
        </button>
      </div>

      <button
        className="btn-outline"
        style={{
          border: "none",
          marginTop: "16px",
          fontSize: "14px",
          padding: "8px",
        }}
        onClick={onReset}>
        Изменить выбор
      </button>
    </div>
  );
}
