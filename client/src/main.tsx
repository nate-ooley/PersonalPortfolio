import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set up meta tags for SEO
const head = document.head;
const title = document.createElement("title");
title.textContent = "John Doe | Developer & Photographer";

const meta = document.createElement("meta");
meta.name = "description";
meta.content = "Portfolio and photography showcase of John Doe, developer and photographer based in San Francisco.";

// Add Favicon
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>";

head.appendChild(title);
head.appendChild(meta);
head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(<App />);
