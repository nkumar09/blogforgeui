import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { generateBlog } from "../services/blogApi";
import RevisionModal from "../components/RevisionModal";

export default function DraftReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTopic = location.state?.selectedTopic;
  const settings = location.state?.settings;

  const [draft, setDraft] = useState("");
  const [seo, setSeo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!settings || !selectedTopic) {
      setError("Missing required data. Please start from the beginning.");
      setLoading(false);
      return;
    }

    const fetchDraft = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await generateBlog({
          theme: settings.theme,
          preferred_tone: settings.preferred_tone || settings.tone,  // Support both casing
          desired_depth: settings.desired_depth || settings.depth,
          word_count: settings.word_count || settings.wordCount,
          selected_topic: selectedTopic,
        });
        setDraft(response.draft);
        setSeo(response.seo_metadata);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [settings, selectedTopic]);

  const handleApprove = () => {
    navigate("/seo-output", {
      state: {
        seo: {
          title: extractTitle(seo),
          description: extractDescription(seo),
          keywords: extractKeywords(seo),
        },
        draft: draft,
      },
    });
  };

  if (!selectedTopic || !settings) {
    return (
      <PageLayout>
        <div className="text-lg text-gray-500">No topic selected. Please start from the beginning.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      sidebar={
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-300">Step 3: Review Your Draft</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li><strong>Topic:</strong> <span className="text-gray-200">{selectedTopic}</span></li>
            <li><strong>Tone:</strong> {settings.tone || settings.preferred_tone}</li>
            <li><strong>Depth:</strong> {settings.depth || settings.desired_depth}</li>
            <li><strong>Word Count:</strong> {settings.wordCount || settings.word_count}</li>
          </ul>
        </div>
      }
    >
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-blue-200">AI-Generated Blog Draft</h2>

        {loading && <div className="text-gray-500">Generating draft...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}

        {!loading && !error && (
          <>
            <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded-2xl p-8 text-gray-100 whitespace-pre-line leading-relaxed max-h-[50vh] overflow-auto shadow-lg
            transition-transform duration-200 ease-in-out hover:scale-[1.01]">
              {draft}
            </div>

            <h2 className="text-xl font-bold text-blue-300">SEO Metadata</h2>
            <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded-2xl p-4 text-gray-300 whitespace-pre-line shadow-lg">
              {seo}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleApprove}
                className="bg-green-600 text-white py-2 px-8 rounded font-semibold hover:bg-green-700
                  transition-all duration-200 ease-in-out focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
                Approve Draft &gt;
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-800 text-white py-2 px-8 rounded font-semibold hover:bg-blue-900
                  transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
                Revise Draft
              </button>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <RevisionModal
          onClose={() => setShowModal(false)}
          onSubmit={async (notes) => {
            setShowModal(false);
            setLoading(true);
            setError("");
            try {
              const response = await generateBlog({
                theme: settings.theme,
                preferred_tone: settings.preferred_tone || settings.tone,
                desired_depth: settings.desired_depth || settings.depth,
                word_count: settings.word_count || settings.wordCount,
                selected_topic: selectedTopic,
                revision_notes: notes,
              });
              setDraft(response.draft);
              setSeo(response.seo_metadata);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }}
        />
      )}
    </PageLayout>
  );
}

// Optional helpers
function extractTitle(seoText) {
  const match = seoText.match(/\*\*SEO-Friendly Title:\*\*\s*"?([^"\n]+)"?/i);
  return match ? match[1].trim() : "";
}

function extractDescription(seoText) {
  const match = seoText.match(/\*\*Meta Description:\*\*\s*(.+)/i);
  return match ? match[1].trim() : "";
}

function extractKeywords(seoText) {
  const match = seoText.match(/\*\*(Keywords|Relevant Keywords):\*\*([\s\S]*)/i);
  if (!match) return [];
  return match[2]
    .split(/\n+/)
    .map(line => line.replace(/^\d+\.\s*/, "").replace(/^-+\s*/, "").trim())
    .filter(k => k && !k.startsWith("**"));
}