import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Canvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let padding = 0;
      let size = 10;
      let grid = [];

      let state = true;
      p.mousePressed = () => {
        if (state === true) {
          p.noStroke();
        }
        if (state === false) {
          p.stroke(5);
        }
        state = !state;
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        p.noStroke();

        for (let x = 0; x < p.windowWidth; x += size) {
          let col = [];
          for (let y = 0; y < p.windowHeight; y += size) {
            col.push({
              color: p.random(0, 128 + 32),
              x: x,
              y: y,
            });
          }
          grid.push(col);
        }
      };

      p.draw = () => {
        p.background(0);
        
        p.show();
      };

      p.update = () => {

      }

      p.show = () => {
        for (let x = 0; x < grid.length; x++) {
          for (let y = 0; y < grid[x].length; y++) {
            p.fill(0, grid[x][y].color, 0);
            p.rect(grid[x][y].x + padding/2, grid[x][y].y + padding/2, size - padding, size - padding, 5);
          }
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

    };


    // Create a new p5 instance and attach it to the DOM element
    const myP5 = new p5(sketch, containerRef.current);

    // Cleanup function when the component unmounts
    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default P5Canvas;
