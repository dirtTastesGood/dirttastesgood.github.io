const dotsAndLines = (windowHeight, windowWidth) => {
  const canvas = document.querySelector('#projects-bg');

  const context = canvas.getContext('2d');
  let animationFrameId;

  canvas.height = windowHeight;
  canvas.width = windowWidth;

  const dots = [];
  const totalDots = Math.floor((windowHeight * windowWidth) / 10000);
  console.log(Math.floor((windowHeight * windowWidth) / 10000));
  const distThreshold = 200;
  let frameCount = 0;
  for (let i = 0; i < 25; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dot = new Dot(context, x, y, 2);
    dots.push(dot);
  }

  const render = () => {
    context.fillStyle = '#393e44';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // context.fillStyle = bgColor;
    // context.fillRect(0, 0, canvas.width, canvas.height);
    frameCount++;

    dots.forEach(dot => {
      let neighbors = dots
        .map(otherDot => {
          let dist = Math.sqrt(
            (dot.x - otherDot.x) ** 2 + (dot.y - otherDot.y) ** 2
          );
          if (otherDot !== dot && dist < distThreshold) {
            let opacity = 1 - dist / distThreshold;
            return { ...otherDot, opacity };
          }
          return null;
        })
        .filter(neighbor => neighbor !== null);

      dot.update();
      dot.drawLines(neighbors);
      dot.draw();
    });

    animationFrameId = window.requestAnimationFrame(render);
  };
  render();
};
