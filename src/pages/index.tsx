import { useState } from "react";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import styles from "@/styles/home.module.css";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("⚠️ Please enter your name.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/create-folder", { name });

      if (response.status === 200) {
        setMessage(`✅ Folder Created Successfully! Folder ID: ${response.data.folderId}`);
      } else {
        setMessage("❌ Error creating folder.");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      setMessage("❌ Failed to fetch data from the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.heading}>Enter Your Name</h1>
        <InputField value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
        <SubmitButton onClick={handleSubmit} text={loading ? "Creating Folder..." : "Add Your Photos"} />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
