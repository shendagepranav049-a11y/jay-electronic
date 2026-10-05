import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "./InformationSection.css";

function InformationSection() {
  const [content, setContent] = useState({
    heading: "Latest Information",
    description:
      "For the latest information about our technology solutions and services, please get in touch with Jay Electronics.",
    buttonText: "Get in Touch",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "siteContent", "information"),
      (snapshot) => {
        if (snapshot.exists()) {
          setContent((prev) => ({
            ...prev,
            ...snapshot.data(),
          }));
        }
      },
      (error) => {
        console.error("Information loading error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="information"
      className="information-section"
    >
      <div className="information-container">

        <div className="information-label">
          JAY ELECTRONICS
        </div>

        <h2>{content.heading}</h2>

        <p>{content.description}</p>

        <a
          href="#contact"
          className="information-button ui-button"
        >
          {content.buttonText}
        </a>

      </div>
    </section>
  );
}

export default InformationSection;