window.addEventListener('load', function () {
  let container = document.getElementById('mandala-container');
  container.style.opacity = 1;
  for (i = 1; i <= 8; i++) {
    let layer = document.getElementById('layer' + i);
    layer.style.opacity = 1;
  }

  let initials = document.getElementById('initials');
  initials.style.opacity = 1;

  let splash = document.querySelector('#splash');
  splash.classList.add('glow');
  dotsAndLines(window.innerHeight, window.innerWidth);

  window.addEventListener('resize', () => {
    dotsAndLines(window.innerHeight, window.innerWidth);
  });


  softSkills()
});
