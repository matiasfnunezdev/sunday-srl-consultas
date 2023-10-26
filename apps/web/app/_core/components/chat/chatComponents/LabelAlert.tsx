"use client";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const LabelAlert = () => {
  const [showAlert, setShowAlert] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setShowAlert(false);
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }, []);

  //   if (!showAlert) {
  //     return null;
  //   }

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "100px",
        width: "auto",
        backgroundColor: "#DBD638CC", // el "CC" al final es para la transparencia
        border: "1px solid #DBD638",
        borderRadius: "5px",
        zIndex: 1000,
        textAlign: "center",
      }}
    >
      <p style={{ color: "black", fontSize: 24 }}>
        <FontAwesomeIcon icon={faCircleExclamation} className="pr-2" />
        Debe etiquetar antes de cerrar
      </p>
    </div>
  );
};

export default LabelAlert;
