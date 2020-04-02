/**
 * Created by olgundutkan on 27.03.2020
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Graphics, Stage } from "@inlet/react-pixi";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const StressTestBoard = ({ clients, dragStart, dragEnd, onMove }) => {
  const classes = useStyles();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log("StressTestBoard component mount");
    return () => {
      console.log("StressTestBoard component un mount");
    };
  }, []);

  /**
   * Get PIXI color
   * @param color
   * @returns {string}
   */
  const getPIXIColor = color => {
    let hex = color.replace("#", "");
    hex = "000000".substr(0, 6 - hex.length) + hex;
    return "0x" + hex;
  };

  const onCircleDragStart = (event, graphics, id) => {
    graphics.data = event.data;
    graphics.dragging = true;
    return dragStart(id);
  };

  const onCircleDragEnd = (graphics, id) => {
    graphics.dragging = false;
    graphics.data = null;
    return dragEnd(id);
  };

  const onCircleMove = (graphics, id) => {
    if (graphics.dragging) {
      const newPosition = graphics.data.getLocalPosition(graphics.parent);
      // graphics.x = newPosition.x;
      // graphics.y = newPosition.y;
      return onMove(id, newPosition.x, newPosition.y);
    }
  };
  return (
    <Paper elevation={3}>
      <Stage
        height={500}
        options={{ antialias: true, transparent: true, roundPixel: true }}
        className={classes.root}
      >
        <Container interactive={true}>
          {clients.map(client => {
            if (
              client &&
              parseInt(client.position.x) &&
              parseInt(client.position.y)
            ) {
              return (
                <Graphics
                  key={client.id}
                  preventRedraw={true}
                  draw={g => {
                    // clear the graphics
                    g.clear();
                    // start drawing
                    g.lineStyle(0);
                    g.beginFill(getPIXIColor(client.color));
                    g.drawCircle(
                      parseInt(client.position.x),
                      parseInt(client.position.y),
                      30
                    );
                    g.endFill();
                    g.interactive = true;
                    g.pivot.x = parseInt(client.position.x);
                    g.pivot.y = parseInt(client.position.y);
                    g.on("mousedown", event =>
                      onCircleDragStart(event, g, client.id)
                    )
                      .on("touchstart", event =>
                        onCircleDragStart(event, g, client.id)
                      )
                      .on("mouseup", event => onCircleDragEnd(g, client.id))
                      .on("mouseupoutside", event =>
                        onCircleDragEnd(g, client.id)
                      )
                      .on("touchend", event => onCircleDragEnd(g, client.id))
                      .on("touchendoutside", event =>
                        onCircleDragEnd(g, client.id)
                      )
                      .on("mousemove", event => onCircleMove(g, client.id))
                      .on("touchmove", event => onCircleMove(g, client.id));
                  }}
                  x={parseInt(client.position.x)}
                  y={parseInt(client.position.y)}
                  interactive={true}
                />
              );
            }
          })}
        </Container>
      </Stage>
    </Paper>
  );
};

/**
 * Set default props of StressTestBoard component
 * @type {{}}
 */
StressTestBoard.defaultProps = {
  clients: []
};

/**
 * Validate props of StressTestBoard component
 * @type {{}}
 */
StressTestBoard.prototypes = {
  clients: PropTypes.array,
  dragStart: PropTypes.func,
  dragEnd: PropTypes.func,
  onMove: PropTypes.func
};

export default StressTestBoard;
