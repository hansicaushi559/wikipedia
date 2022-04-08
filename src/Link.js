import React from "react";
import "./link.css";

function Link({ data }) {
  return (
    <div className="results">
      <h2>{data.wiki_title}</h2>

      <div className="links-container">
        <a href={data.wiki_link} target="_blank">
          Go to wikipedia Page
        </a>
      </div>
    </div>
  );
}

export default Link;
