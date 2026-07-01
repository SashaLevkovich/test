interface Props {
  onNext: () => void;
}

export function TransitionScreen({ onNext }: Props) {
  return (
    <div className="card" role="dialog" aria-live="polite">
      <h2 className="title">Ура! 🎉</h2>
      <p className="subtitle">
        Очень рад! <br /> Чтобы вечер прошел четенько, ответь на пару вопросов.
        Обещаю, в анкете не будет вопросов про мои «лучшие качества» или знание
        квантовой физики))))
      </p>

      <div className="actions" style={{ minHeight: "auto", marginTop: "24px" }}>
        <button
          className="btn btn-yes"
          onClick={onNext}
          style={{ width: "100%" }}>
          Сгораю от нетерпения! ✨
        </button>
      </div>
    </div>
  );
}
