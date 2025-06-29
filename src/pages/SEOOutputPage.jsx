import PageLayout from "../components/PageLayout";

export default function SEOOutputPage() {
  const seo = {
    title: "The Future of Psychology: Trends to Watch",
    description: "Explore emerging trends and insights in psychology for personal growth and understanding in today's world.",
    keywords: ["psychology", "mental health", "self-improvement", "trends", "behavior"]
  };

  return (
    <PageLayout
      sidebar={
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-300">Final Step: SEO & Output</h2>
          <p className="text-gray-400">Ready to publish or copy your optimized post!</p>
        </div>
      }
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-1">SEO Title</h3>
          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded p-4 text-gray-100">{seo.title}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-1">Meta Description</h3>
          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded p-4 text-gray-100">{seo.description}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-1">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {seo.keywords.map((kw, i) => (
              <span key={i} className="bg-blue-900/60 text-blue-200 px-2 py-1 rounded text-sm">{kw}</span>
            ))}
          </div>
        </div>
        <button className="bg-blue-700 text-white font-semibold py-2 px-6 rounded hover:bg-blue-800
            transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg active:scale-95">
          Copy All to Clipboard
        </button>
      </div>
    </PageLayout>
  );
}