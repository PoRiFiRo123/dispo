import { useState } from "react";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import styles from "@/styles/home.module.css";

export default function Home() {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/create-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Folder Created: ${data.folderId}`);
      } else {
        alert("Error creating folder.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.heading}>Enter your name</h1>
        <InputField value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
        <SubmitButton onClick={handleSubmit} text="Add your photos" />
      </div>
    </div>
  );
}
