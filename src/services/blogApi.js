const API_URL = import.meta.env.VITE_API_URL;

export async function generateTopics(inputs) {
  const response = await fetch(`${API_URL}/generate-topics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to generate topics");
  }

  return response.json();
}

export async function generateBlog(inputs) {
  const response = await fetch(`${API_URL}/generate-blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to generate blog draft");
  }

  return response.json();
}