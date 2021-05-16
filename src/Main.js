import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <main>
      <a href="/shapes">Shapes</a>
      <Link to="/dino">Dino</Link>
    </main>
  );
}

export default Main;
