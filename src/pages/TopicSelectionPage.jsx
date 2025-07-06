import PageLayout from "../components/PageLayout";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TopicSelectionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = location.state?.settings;
  const topics = location.state?.topics;

  const [selected, setSelected] = useState(null);

  if (!settings || !topics) {
    return (
      <PageLayout>
        <div className="text-lg text-gray-500">Missing topics or settings. Please start over.</div>
      </PageLayout>
    );
  }

  const handleNext = () => {
    if (selected === null) return;
    navigate("/draft", {
      state: {
        settings,
        selectedTopic: topics[selected],
      },
    });
  };

  return (
    <PageLayout
      sidebar={
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-300">Step 2: Choose a Topic</h2>
          <p className="text-gray-400">Pick one topic to move forward with your AI-generated blog draft.</p>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <button
              key={i}
              className={`
                text-left bg-neutral-900/80 backdrop-blur-md border-2 rounded-xl px-6 py-5
                shadow-md border-neutral-700
                transition-transform duration-200 ease-in-out
                hover:border-blue-700 hover:scale-[1.03] active:scale-95 focus:ring-2 focus:ring-blue-500
                ${selected === i ? "border-blue-500 bg-blue-950/80 scale-105" : ""}
              `}
              onClick={() => setSelected(i)}
              type="button"
              style={{ minHeight: "90px" }}
            >
              <span className="text-gray-100">{topic}</span>
            </button>
          ))}
        </div>
        <button
          className={`mt-8 bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800
            transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg active:scale-95
            ${selected === null ? "opacity-60 cursor-not-allowed" : ""}
          `}
          disabled={selected === null}
          onClick={handleNext}
        >
          Next: Generate Draft
        </button>
      </div>
    </PageLayout>
  );
}