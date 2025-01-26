import React from "react";
import { TypeAnimation } from "react-type-animation";

const codesquence = `1  <!DOCTYPE html>\n2  <html>\n3  head><title>Example</title>\n4  <linkrel="stylesheet"href="styles.css">\n5  </head>\n6  <body>\n7  <h1><ahref="/">Header</a></h1>\n8  <nav><ahref="one/">One</a>\n9 <ahref="two/">Two</a><ahref="three/">Three</a></nav>`;

export default function CodeTyping() {
  return (
    <div className="p-4 border border-borderGray">
      <TypeAnimation
        style={{
          whiteSpace: "pre-line",
          height: "280px",
          display: "block",
          color: "#E7BC5B",
          fontWeight: 600,
          fontSize: "18px",
        }}
        sequence={[codesquence, 1000, ""]}
        repeat={Infinity}
      />
    </div>
  );
}
