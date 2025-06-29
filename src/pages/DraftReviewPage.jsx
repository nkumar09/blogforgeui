import PageLayout from "../components/PageLayout";

export default function DraftReviewPage({ topic, settings }) {
  if (!topic || !settings) {
    return (
      <PageLayout>
        <div className="text-lg text-gray-500">No topic selected. Please start from the beginning.</div>
      </PageLayout>
    );
  }

  const exampleDraft = `
In today’s world, the importance of psychology is more evident than ever. Understanding human behavior, motivation, and emotional intelligence can unlock pathways to personal growth and meaningful relationships.
...
`.trim();

  return (
    <PageLayout
      sidebar={
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-300">Step 3: Review Your Draft</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li><strong>Topic:</strong> <span className="text-gray-200">{topic}</span></li>
            <li><strong>Tone:</strong> {settings.tone}</li>
            <li><strong>Depth:</strong> {settings.depth}</li>
            <li><strong>Word Count:</strong> {settings.wordCount}</li>
          </ul>
        </div>
      }
    >
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-blue-200">AI-Generated Blog Draft</h2>
        <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded-2xl p-8 text-gray-100 whitespace-pre-line leading-relaxed max-h-[50vh] overflow-auto shadow-lg
        transition-transform duration-200 ease-in-out hover:scale-[1.01]">
          {exampleDraft}
        </div>
        <div className="flex gap-4">
          <button className="bg-green-600 text-white py-2 px-8 rounded font-semibold hover:bg-green-700
            transition-all duration-200 ease-in-out focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
            Approve Draft &gt;
          </button>
          <button className="bg-blue-800 text-white py-2 px-8 rounded font-semibold hover:bg-blue-900
            transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
            Revise Draft
          </button>
        </div>
      </div>
    </PageLayout>
  );
}