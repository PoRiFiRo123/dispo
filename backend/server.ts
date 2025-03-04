import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createDriveFolder } from "./googleDrive";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

/**
 * Route to create a Google Drive folder
 * Expects: { name: "folder_name" } in the request body
 */
app.post("/create-folder", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  try {
    const folderId = await createDriveFolder(name);
    return res.status(200).json({ folderId, message: "Folder created successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create folder." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
