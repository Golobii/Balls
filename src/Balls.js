import React from "react";
import { Engine, Render, World, Bodies } from "matter-js";

class Balls extends React.Component {
  constructor() {
    super();
    this.engine = Engine.create({
      // positionIterations: 20
    });
    this.spawn = this.spawn.bind(this);
  }
  componentDidMount() {
    // var Engine = Matter.Engine,
    //   Render = Matter.Render,
    //   World = Matter.World,
    //   Bodies = Matter.Bodies;

    // var engine = Engine.create({
    //   // positionIterations: 20
    // });

    var width = window.innerWidth;
    var height = window.innerHeight;

    var render = Render.create({
      element: document.body,
      engine: this.engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "white",
      },
    });

    var ground = Bodies.rectangle(width / 2, height - 5, width, 5, {
      isStatic: true,
      render: { visible: false },
    });
    var leftBorder = Bodies.rectangle(5, height - 5, width, 5, {
      isStatic: true,
      render: { visible: false },
      angle: 90 * (Math.PI / 180),
    });
    var rightBorder = Bodies.rectangle(width - 5, height - 5, width, 5, {
      isStatic: true,
      render: { visible: false },
      angle: 90 * (Math.PI / 180),
    });
    var topBorder = Bodies.rectangle(width / 2, 5, width, 5, {
      isStatic: true,
      render: { visible: false },
    });

    World.add(this.engine.world, [leftBorder, rightBorder, topBorder, ground]);

    Engine.run(this.engine);

    Render.run(render);

    // World.add(
    //   this.engine.world,
    //   Bodies.circle(150, 50, 30, { restitution: 0.7 })
    // );
  }

  spawn() {
    console.log(this.engine.world);
    World.add(
      this.engine.world,
      Bodies.circle(150, 50, 30, { restitution: 0.7 })
    );
  }

  render() {
    return (
      <main>
        <div ref={this.Balls} />
        <button onClick={this.spawn}>Click me</button>
      </main>
    );
  }
}

export default Balls;
