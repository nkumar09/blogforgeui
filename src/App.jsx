import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserSettingsPage from "./pages/UserSettingsPage";
import TopicSelectionPage from "./pages/TopicSelectionPage";
import DraftReviewPage from "./pages/DraftReviewPage";
import SEOOutputPage from "./pages/SEOOutputPage";

function AppRoutes() {
  const [settings, setSettings] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  const handleSettingsSubmit = (data) => {
    setSettings(data);
    const theme = data.theme || "Blogging";
    setTopics([
      `The Future of ${theme}: Trends to Watch`,
      `${theme} for Beginners: A Complete Guide`,
      `How to Overcome Common Challenges in ${theme}`,
      `10 Proven Strategies for Success in ${theme}`,
      `The Psychology Behind Effective ${theme}`
    ]);
    navigate("/topics");
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    navigate("/draft");
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/settings" />} />
      <Route path="/settings" element={<UserSettingsPage onSubmit={handleSettingsSubmit} />} />
      <Route path="/topics" element={<TopicSelectionPage topics={topics} onSelect={handleTopicSelect} />} />
      <Route path="/draft" element={<DraftReviewPage topic={selectedTopic} settings={settings} />} />
      <Route path="/seo" element={<SEOOutputPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}