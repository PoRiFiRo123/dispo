import React from "react";
import styles from "@/styles/home.module.css";

interface SubmitButtonProps {
  onClick: () => void;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, text }) => {
  return (
    <button className={styles.submitButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default SubmitButton;
