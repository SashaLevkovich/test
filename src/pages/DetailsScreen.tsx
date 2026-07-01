import type { Category } from "../lib/types";

interface Props {
  category: Category;
  onNext: (details: string) => void;
  onBack: () => void;
}

const OPTIONS = {
  food: [
    { id: "Итальянская классика", emoji: "🍝", label: "Италия" },
    { id: "Азиатский вайб", emoji: "🍣", label: "Азия" },
    { id: "Уютная грузинская", emoji: "🥟", label: "Грузия" },
    { id: "Морепродукты", emoji: "🦪", label: "Морепродукты" },
    { id: "Мясо и вино", emoji: "🥩", label: "Стейки" },
    { id: "Красивые коктейли", emoji: "🍸", label: "Бары" },
  ],
  culture: [
    { id: "Кино на заднем ряду", emoji: "🍿", label: "Кино" },
    { id: "Живая музыка / Неоклассика", emoji: "🎻", label: "Музыка" },
    { id: "Современная выставка", emoji: "🖼️", label: "Выставка" },
    { id: "Театр", emoji: "🎭", label: "Театр" },
    { id: "Стендап", emoji: "🎤", label: "Стендап" },
    { id: "Джаз-клуб", emoji: "🎷", label: "Джаз" },
  ],
  active: [
    { id: "Сбить все кегли", emoji: "🎳", label: "Боулинг" },
    { id: "Загнать восьмерку", emoji: "🎱", label: "Бильярд" },
    { id: "Покатушки на самокатах", emoji: "🛴", label: "Самокаты" },
    { id: "Настольные игры", emoji: "🎲", label: "Настолки" },
    { id: "Картинг", emoji: "🏎️", label: "Картинг" },
    { id: "VR Арена", emoji: "🥽", label: "VR Игры" },
  ],
  chill: [
    { id: "Вечерняя прогулка", emoji: "🚶‍♀️", label: "Прогулка" },
    { id: "Кофе и спешелти десерты", emoji: "🥐", label: "Кофейня" },
    { id: "Уютная чайная", emoji: "🍵", label: "Чайная церемнония" },
    { id: "Кальянный лаунж", emoji: "💨", label: "Кальян" },
    { id: "Свидание на крыше", emoji: "🌇", label: "Крыша" },
  ],
};

const HEADINGS = {
  food: {
    title: "Что больше по вкусу? 🤤",
    subtitle: "Выбери, чего сегодня просит душа",
  },
  culture: {
    title: "К чему лежит душа? 🎟️",
    subtitle: "Вдохновение и красивые впечатления",
  },
  active: { title: "Чем займемся? 🎯", subtitle: "Выбери формат развлечения" },
  chill: {
    title: "Как расслабимся? ☁️",
    subtitle: "Максимальный уют и никаких забот",
  },
};

export function DetailsScreen({ category, onNext, onBack }: Props) {
  if (category === "surprise") return null;

  const currentOptions = OPTIONS[category];
  const { title, subtitle } = HEADINGS[category];

  return (
    <div className="card" role="dialog" aria-live="polite">
      <button className="btn-back" onClick={onBack} aria-label="Назад">
        ← Назад
      </button>
      <h2 className="title">{title}</h2>
      <p className="subtitle">{subtitle}</p>

      <div className="choice-grid">
        {currentOptions.map(opt => (
          <button
            key={opt.id}
            className="choice-btn"
            onClick={() => onNext(opt.id)}>
            <span className="emoji" aria-hidden="true">
              {opt.emoji}
            </span>
            <span style={{ fontSize: "15px" }}>{opt.label}</span>
          </button>
        ))}
      </div>

      <button
        className="btn-outline"
        onClick={() => onNext("Доверяю твоему вкусу ✨")}
        style={{ marginTop: "24px" }}>
        ✨ Доверяю твоему вкусу, выбери сам
      </button>
    </div>
  );
}
