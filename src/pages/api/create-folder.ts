import { NextApiRequest, NextApiResponse } from "next";
import { createDriveFolder } from "@/utils/googleDrive"; // Adjust path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  try {
    const folderId = await createDriveFolder(name);
    return res.status(200).json({ folderId, message: "Folder created successfully." });
  } catch (error) {
    console.error("❌ Error creating folder:", error);
    return res.status(500).json({ error: "Failed to create folder." });
  }
}
