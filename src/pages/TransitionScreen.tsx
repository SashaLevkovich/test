interface Props {
  onNext: () => void;
}

export function TransitionScreen({ onNext }: Props) {
  return (
    <div className="card" role="dialog" aria-live="polite">
      <h2 className="title">Ура! 🎉</h2>
      <p className="subtitle">
        Я очень рад! А теперь давай сделаем этот вечер идеальным. Ответь на пару
        вопросов, чтобы я всё организовал.
      </p>

      <div className="actions" style={{ minHeight: "auto", marginTop: "24px" }}>
        <button
          className="btn btn-yes"
          onClick={onNext}
          style={{ width: "100%" }}>
          Давай! ✨
        </button>
      </div>
    </div>
  );
}
