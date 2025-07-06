import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { generateTopics } from "../services/blogApi"; // ⬅️ Import new API function

const tones = ["Conversational", "Analytical", "Contemplative"];
const depths = ["Shallow", "Medium", "In-Depth"];

export default function UserSettingsPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("");
  const [tone, setTone] = useState(tones[0]);
  const [depth, setDepth] = useState(depths[1]);
  const [wordCount, setWordCount] = useState(800);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const settings = { theme, preferred_tone: tone, desired_depth: depth, word_count: wordCount };

    try {
      const response = await generateTopics(settings);
      const topics = response.topics;

      navigate("/topics", { state: { settings, topics } });
    } catch (error) {
      console.error("Failed to generate topics:", error);
      alert("Error generating topics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      sidebar={
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-300">BlogForge AI</h2>
          <p className="text-gray-400">
            Your personal agentic AI blog coach.<br />
            Set your blog preferences and get AI-generated ideas and drafts tailored to you.
          </p>
        </div>
      }
    >
      <form
        className="bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-lg mx-auto border border-neutral-800
        transition-transform duration-200 ease-in-out hover:scale-[1.01]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-blue-200 mb-6">Blog Settings</h2>
        <div className="mb-5">
          <label className="block font-medium text-gray-300 mb-1">Theme</label>
          <input
            type="text"
            className="w-full bg-neutral-800 text-gray-100 border border-neutral-700 rounded px-3 py-2 outline-none focus:border-blue-500"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g. Psychology"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block font-medium text-gray-300 mb-1">Preferred Tone</label>
          <select
            className="w-full bg-neutral-800 text-gray-100 border border-neutral-700 rounded px-3 py-2 outline-none focus:border-blue-500"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            {tones.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="mb-5">
          <label className="block font-medium text-gray-300 mb-1">Desired Depth</label>
          <select
            className="w-full bg-neutral-800 text-gray-100 border border-neutral-700 rounded px-3 py-2 outline-none focus:border-blue-500"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
          >
            {depths.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="mb-8">
          <label className="block font-medium text-gray-300 mb-1">Word Count</label>
          <input
            type="number"
            className="w-full bg-neutral-800 text-gray-100 border border-neutral-700 rounded px-3 py-2 outline-none focus:border-blue-500"
            min={300}
            max={3000}
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800
          transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg active:scale-95"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Topics"}
        </button>
      </form>
    </PageLayout>
  );
}