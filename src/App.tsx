import { useInviteState } from "./hook/useInviteState";
import { sendTelegramNotification } from "./lib/telegram";
import { AskScreen } from "./pages/AskScreen";
import { BackgroundElements } from "./pages/BackgroundElements";
import { CategoryScreen } from "./pages/CategoryScreen";
import { DateTimeScreen } from "./pages/DateTimeScreen";
import { DetailsScreen } from "./pages/DetailsScreen";
import { SummaryScreen } from "./pages/SummaryScreen";
import { TransitionScreen } from "./pages/TransitionScreen";

export default function App() {
  const { state, updateState, resetState } = useInviteState();

  const renderScreen = () => {
    switch (state.step) {
      case "ask":
        return <AskScreen onYes={() => updateState({ step: "transition" })} />;

      case "transition":
        return (
          <TransitionScreen onNext={() => updateState({ step: "datetime" })} />
        );

      case "datetime":
        return (
          <DateTimeScreen
            onNext={(date, time) =>
              updateState({ date, time, step: "category" })
            }
          />
        );

      case "category":
        return (
          <CategoryScreen
            onNext={category => {
              if (category === "surprise") {
                const finalState = {
                  ...state,
                  category,
                  step: "summary" as const,
                };
                updateState(finalState);
                sendTelegramNotification(finalState);
              } else {
                updateState({ category, step: "details" });
              }
            }}
            onBack={() => updateState({ step: "datetime" })}
          />
        );

      case "details":
        return (
          <DetailsScreen
            category={state.category!}
            onNext={details => {
              const finalState = {
                ...state,
                details,
                step: "summary" as const,
              };
              updateState(finalState);
              sendTelegramNotification(finalState);
            }}
            onBack={() => updateState({ step: "category" })}
          />
        );

      case "summary":
        return <SummaryScreen data={state} onReset={resetState} />;

      default:
        return null;
    }
  };

  return (
    <>
      <BackgroundElements />
      <div className="container">{renderScreen()}</div>
    </>
  );
}
