import React from "react";
import { Engine, Render, World, Bodies } from "matter-js";

class Balls extends React.Component {
  constructor() {
    super();
    this.engine = Engine.create({
      // positionIterations: 20
    });
    this.state = {
      shape: "Circle",
      size: 50,
      err: false,
      height: 50,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputHeight = this.handleInputHeight.bind(this);

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
    var height = window.innerHeight - 200;

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
    let size = this.state.size;
    switch (this.state.shape) {
      case "Circle":
        World.add(
          this.engine.world,
          Bodies.circle(230, 50, size, { restitution: 0.7 })
        );
        break;

      case "Rectangle":
        World.add(
          this.engine.world,
          Bodies.rectangle(200, 50, size, this.state.height, {
            restitution: 0.7,
          })
        );
        break;

      default:
        World.add(
          this.engine.world,
          Bodies.polygon(200, 50, 3, size, { restitution: 0.7 })
        );
    }
  }

  handleChange(e) {
    this.setState({ shape: e.target.value });
  }

  handleInput(e) {
    let size = e.target.value;
    if (!isNaN(size)) {
      if (this.state.shape === "Rectangle" && (size <= 700 || size < 9)) {
        this.setState({ size: size });
        this.setState({ err: false });
      } else if (size > 200 || size <= 9) {
        this.setState({ err: true });
      } else {
        this.setState({ size: size });
        this.setState({ err: false });
      }
    } else {
      this.setState({ err: true });
    }
  }
  handleInputHeight(e) {
    let size = e.target.value;
    if (!isNaN(size)) {
      if (size > 300 || size <= 9) {
        this.setState({ err: true });
      } else {
        this.setState({ height: size });
        this.setState({ err: false });
      }
    } else {
      this.setState({ err: true });
    }
  }

  Circle = () => {
    return (
      <div className="option-input">
        <label htmlFor="input">Select a radius (10 - 200):</label>
        <input
          type="text"
          name="input"
          className="option-input"
          onChange={this.handleInput}
          // placeholder=""
        />
      </div>
    );
  };
  Rectangle = () => {
    return (
      <div className="option-input">
        <label htmlFor="input-width">Width:</label>
        <input
          name="input-width"
          className="option-input"
          onInput={this.handleInput}
        />
        <label htmlFor="input-height">Height:</label>
        <input
          name="input-height"
          className="option-input"
          onInput={this.handleInputHeight}
        />
      </div>
    );
  };
  Triangle = () => {
    return (
      <div className="option-input">
        <label htmlFor="input-width">Radius:</label>
        <input
          name="input-width"
          className="option-input"
          onInput={this.handleInput}
        />
      </div>
    );
  };
  render() {
    const Error = () => {
      return <p>Input Error</p>;
    };
    return (
      <main>
        {this.state.err ? <Error /> : null}
        <div ref={this.Balls} />
        <div className="option-table">
          <label htmlFor="shapes">Select a shape:</label>
          <select
            name="shapes"
            id="shapes"
            value={this.state.fruit}
            onChange={this.handleChange}
          >
            <option value="Circle">Circle</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Triangle">Triangle</option>
          </select>
          {this.state.shape === "Circle" ? <this.Circle /> : null}
          {this.state.shape === "Rectangle" ? <this.Rectangle /> : null}
          {this.state.shape === "Triangle" ? <this.Triangle /> : null}
          <button name="button" className="spawn-button" onClick={this.spawn}>
            Click me
          </button>
        </div>
      </main>
    );
  }
}

export default Balls;
