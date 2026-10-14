require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");
const questionRoutes = require("./routes/questions");
const projectRoutes = require("./routes/projects");
const chatRoutes = require("./routes/chat");
const pdfRoutes = require("./routes/pdf");

const app = express();

// Allow frontend requests
app.use(
  cors({
    origin: [
      "https://argaatech.com",
      "https://www.argaatech.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  }),
);

app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/contact", contactRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/pdf", pdfRoutes);

// Serve React frontend
const frontendPath = path.join(__dirname, "public");

app.use(express.static(frontendPath));

// React Router fallback
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: err.message || "Server error",
  });
});

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Argaa Tech API running on port ${PORT}`);
});
