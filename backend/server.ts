import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createDriveFolder } from "./googleDrive";

const app = express();
const PORT = 5000;

// ✅ Allow frontend requests
app.use(cors({ origin: "*", credentials: true }));

app.use(bodyParser.json());

app.post("/create-folder", async (req, res) => {
  console.log("📡 Received request to create folder:", req.body);

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  try {
    const folderId = await createDriveFolder(name);
    console.log("✅ Folder Created:", folderId);
    return res.status(200).json({ folderId, message: "Folder created successfully." });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: "Failed to create folder." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
