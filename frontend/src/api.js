// Central place for talking to the Express backend.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export const api = {
  sendMessage: (data) =>
    request("/contact", { method: "POST", body: JSON.stringify(data) }),
  askQuestion: (data) =>
    request("/questions", { method: "POST", body: JSON.stringify(data) }),
  getFaq: () => request("/questions"),
  getProjects: () => request("/projects"),
  chat: (messages) =>
    request("/chat", { method: "POST", body: JSON.stringify({ messages }) }),
  askPdf: (question) =>
    request("/pdf/ask", { method: "POST", body: JSON.stringify({ question }) }),
  pdfActive: () => request("/pdf/active"),

  // admin requires key
  adminInbox: (key) => request("/contact", { headers: { "x-admin-key": key } }),
  adminQuestions: (key) =>
    request("/questions/all", { headers: { "x-admin-key": key } }),
  adminReply: (key, id, answer) =>
    request(`/questions/${id}`, {
      method: "PATCH",
      headers: { "x-admin-key": key },
      body: JSON.stringify({ answer }),
    }),

    adminDeleteProject: (key, id) =>
    request(`/projects/${id}`, { method: 'DELETE', headers: { 'x-admin-key': key } }),

  adminUpdateProjectImage: async (key, id, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'x-admin-key': key },
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to update image');
    return res.json();
  },

  
  adminAddProject: async (key, data, imageFile) => {

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) formData.append(k, v);
    });
    if (imageFile) formData.append("image", imageFile);
    const res = await fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: { "x-admin-key": key },
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to add project");
    return res.json();
  },

  adminUploadPdf: async (key, file) => {
    const formData = new FormData();
    formData.append("pdf", file);
    const res = await fetch(`${BASE_URL}/pdf/upload`, {
      method: "POST",
      headers: { "x-admin-key": key },
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
};
