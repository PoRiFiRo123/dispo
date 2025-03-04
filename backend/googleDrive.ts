import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Google Auth setup
const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth });

/**
 * Function to create a folder in Google Drive
 * @param folderName - The sanitized name for the folder
 * @returns {Promise<string>} Folder ID
 */
export async function createDriveFolder(folderName: string): Promise<string> {
  try {
    const sanitizedFolderName = folderName.replace(/\s+/g, "_");

    const response = await drive.files.create({
      requestBody: {
        name: sanitizedFolderName,
        mimeType: "application/vnd.google-apps.folder",
      },
      fields: "id",
    });

    if (response.data.id) {
      console.log(`✅ Folder Created: ${sanitizedFolderName} (ID: ${response.data.id})`);
      return response.data.id;
    } else {
      throw new Error("❌ Failed to retrieve folder ID.");
    }
  } catch (error) {
    console.error("❌ Error creating folder:", error);
    throw new Error("❌ Failed to create folder.");
  }
}
