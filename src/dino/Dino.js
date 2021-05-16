import React, { useState } from "react";
let running = false;

function Dino() {
  let jumping = false;

  const [cactusFinal, setCactusFinal] = useState([]);

  let cactie = [
    {
      id: 0,
      style: "cactus",
      size: 50,
      left: 200,
    },
  ];

  document.addEventListener("keydown", (e) => jump(e));

  const start = () => {
    running = true;
    setCactusFinal(cactie);
    setInterval(function () {
      if (!running) {
        return;
      }
      let dino = document.getElementById("dino");
      let dinoMarginTop = window.getComputedStyle(dino).marginTop;

      for (let i = 0; i < cactie.length; i++) {
        let cactus = document.getElementById(`cactus${cactie[i].id}`);
        console.log(cactus);
        let cactusLeft = window.getComputedStyle(cactus).left;

        if (cactusLeft <= 10) {
          console.log("bum");
        } else {
          cactie[i].left -= 0.5;
          cactie.push({
            id: 1,
            style: "cactus",
            size: 50,
            left: 280,
          });
          setCactusFinal(cactie);
          console.log(cactie[i].left);
        }
      }
    }, 200);
  };

  const jump = (e) => {
    if (e.key === " " && jumping === false) {
      if (!running) {
        console.log("start");
        start();
      }
      jumping = true;
      const dino = document.getElementById("dino");
      dino.classList.add("dino-jump");
      setTimeout(() => {
        jumping = false;
        dino.classList.remove("dino-jump");
      }, 500);
    }
    console.log(running);
  };

  return (
    <main>
      <div id="field">
        <div id="dino" className="dino" />
        {cactusFinal.map((cactus, index) => {
          console.log(cactus.left);
          return (
            <div
              style={{ left: cactus.left }}
              id={`cactus${cactus.id}`}
              key={`cactus ${index}`}
              className="cactus"
            />
          );
        })}
      </div>
    </main>
  );
}

export default Dino;
