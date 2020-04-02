/**
 * Created by olgundutkan on 25.03.2020
 */

import React, { useEffect } from "react";
import { Graphics } from "pixi.js";
import { Container, PixiComponent, Stage } from "@inlet/react-pixi";

const Circle = PixiComponent("Circle", {
  create: props => new Graphics(),
  applyProps: (instance, _, props) => {
    const {
      id,
      x,
      y,
      width,
      fill,
      onCircleDragStart,
      onCircleDragEnd,
      onCircleDragMove
    } = props;

    instance.clear();
    instance.beginFill(fill);
    instance.drawCircle(x, y, width);
    instance.endFill();
    instance.x = x;
    instance.y = y;
    instance.interactive = true;
    instance.pivot.x = instance.width / 2;
    instance.pivot.y = instance.width / 2;
    instance
      .on("mousedown", event => onCircleDragStart(event, instance, id))
      .on("touchstart", event => onCircleDragStart(event, instance, id))
      .on("mouseup", event => onCircleDragEnd(instance, id))
      .on("mouseupoutside", event => onCircleDragEnd(instance, id))
      .on("touchend", event => onCircleDragEnd(instance, id))
      .on("touchendoutside", event => onCircleDragEnd(instance, id))
      .on("mousemove", event => onCircleDragMove(instance, id))
      .on("touchmove", event => onCircleDragMove(instance, id));
  }
});

const CanvasBoard = ({ circles, dragStart, dragEnd, onMove }) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log("CanvasBoard component mount");
    return () => {
      console.log("CanvasBoard component un mount");
    };
  }, []);

  const getPIXIColor = color => {
    let hex = color.replace("#", "");
    hex = "000000".substr(0, 6 - hex.length) + hex;

    return "0x" + hex;
  };

  const circleDragStartHandler = (event, graphics, id) => {
    graphics.data = event.data;
    graphics.dragging = true;
    return dragStart(id);
  };

  const circleDragEndHandler = (graphics, id) => {
    graphics.dragging = false;
    graphics.data = null;
    return dragEnd(id);
  };

  const circleMoveHandler = (graphics, id) => {
    if (graphics.dragging) {
      const newPosition = graphics.data.getLocalPosition(graphics.parent);
      graphics.x = newPosition.x;
      graphics.y = newPosition.y;
      return onMove(id, newPosition.x, newPosition.y);
    }
  };

  return (
    <Stage
      width={600}
      height={200}
      options={{ antialias: true, backgroundColor: 0x1d2230 }}
    >
      <Container interactive={true}>
        {circles.map(circle => {
          if (!!circle) {
            return (
              <Circle
                key={!!circle && circle.id}
                id={!!circle && circle.id}
                x={!!circle && parseInt(circle.position.x)}
                y={!!circle && parseInt(circle.position.y)}
                width={30}
                fill={getPIXIColor(!!circle ? circle.color : "#ffffff")}
                onCircleDragStart={circleDragStartHandler}
                onCircleDragEnd={circleDragEndHandler}
                onCircleDragMove={circleMoveHandler}
              />
            );
          }
          return false;
        })}
      </Container>
    </Stage>
  );
};

/**
 * Set default props of CanvasBoard component
 * @type {{}}
 */
CanvasBoard.defaultProps = {};

/**
 * Validate props of CanvasBoard component
 * @type {{}}
 */
CanvasBoard.prototypes = {};

export default CanvasBoard;
