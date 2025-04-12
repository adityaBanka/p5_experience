import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Canvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // The sketch function defines the p5 instance
    const sketch = (p) => {
      p.setup = () => {
        // Create a 400x400 canvas and attach it to the reference container
        p.createCanvas(400, 400);
      };

      p.draw = () => {
        // Clear the canvas with a light gray background
        p.background(220);
        // Set fill color to red, remove any stroke outline
        p.fill('red');
        p.noStroke();
        // Draw a circle centered at the current mouseX and mouseY
        p.ellipse(50, 50, 50, 50);
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
