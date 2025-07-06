import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserSettingsPage from "./pages/UserSettingsPage";
import TopicSelectionPage from "./pages/TopicSelectionPage";
import DraftReviewPage from "./pages/DraftReviewPage";
import SEOOutputPage from "./pages/SEOOutputPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/settings" />} />
      <Route path="/settings" element={<UserSettingsPage />} />
      <Route path="/topics" element={<TopicSelectionPage />} />
      <Route path="/draft" element={<DraftReviewPage />} />
      <Route path="/seo-output" element={<SEOOutputPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar />
    </Router>
  );
}