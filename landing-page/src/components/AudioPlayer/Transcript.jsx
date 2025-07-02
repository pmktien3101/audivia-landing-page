import React from "react";
import './styles.css'

export default function Transcript({ text }) {
  const formattedText = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="transcript-container">
      <p className="transcript-text">{formattedText}</p>
    </div>
  );
}
