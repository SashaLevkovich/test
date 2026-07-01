import { useState, useMemo } from "react";
import { getUpcomingDays } from "../lib/dates";

interface Props {
  onNext: (date: string, time: string) => void;
}

const TIMES = ["18:00", "19:00", "19:30", "20:00", "20:30", "21:00"];

export function DateTimeScreen({ onNext }: Props) {
  const upcomingDays = useMemo(() => getUpcomingDays(10), []);

  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedDateId || !selectedTime) return;

    const fullDateText =
      upcomingDays.find(d => d.id === selectedDateId)?.fullText ||
      selectedDateId;
    onNext(fullDateText, selectedTime);
  };

  return (
    <div className="card" role="dialog" aria-live="polite">
      <h2 className="title">Когда встретимся? 🗓️</h2>
      <p className="subtitle">Выбери удобный день и время</p>

      <div className="section-label">День</div>
      <div className="date-scroll">
        {upcomingDays.map(date => (
          <button
            key={date.id}
            className={`date-card ${selectedDateId === date.id ? "selected" : ""}`}
            onClick={() => setSelectedDateId(date.id)}>
            <span className="weekday">{date.weekday}</span>
            <span className="day">{date.day}</span>
          </button>
        ))}
      </div>

      <div className="section-label">Время</div>
      <div className="time-grid">
        {TIMES.map(time => (
          <button
            key={time}
            className={`time-chip ${selectedTime === time ? "selected" : ""}`}
            onClick={() => setSelectedTime(time)}>
            {time}
          </button>
        ))}
      </div>

      <div className="actions" style={{ minHeight: "auto", marginTop: "32px" }}>
        <button
          className="btn btn-yes"
          onClick={handleContinue}
          disabled={!selectedDateId || !selectedTime}
          style={{
            width: "100%",
            opacity: !selectedDateId || !selectedTime ? 0.5 : 1,
            cursor:
              !selectedDateId || !selectedTime ? "not-allowed" : "pointer",
          }}>
          Далее
        </button>
      </div>

      <button
        className="btn-outline"
        onClick={() => onNext("surprise", "surprise")}>
        ✨ Пока не знаю, выберем позже
      </button>
    </div>
  );
}
