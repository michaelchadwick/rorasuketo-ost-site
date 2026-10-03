(async function () {
  let currentIndex = 0;
  let track = null;

  const player = document.querySelectorAll("audio")[0];
  const rewind = document.querySelector("#rewind");
  const forward = document.querySelector("#forward");
  const playlist = document.querySelector("#playlist");
  const tracks = playlist.querySelectorAll("li a");
  const len = tracks.length - 1;

  player.volume = 1.0;

  tracks.forEach((t) => {
    t.addEventListener("click", (elem) => {
      elem.preventDefault();

      track = elem.target.closest("a");
      currentIndex = track.dataset.index - 1;
      play(track);
    });
  });

  rewind.addEventListener("click", (elem) => {
    elem.preventDefault();

    goBack();
  });

  forward.addEventListener("click", (elem) => {
    elem.preventDefault();

    goForward();
  });

  player.addEventListener("ended", (elem) => {
    elem.preventDefault();

    goForward();
  });

  function goForward() {
    currentIndex = currentIndex == len ? 0 : currentIndex + 1;

    changeTrack(currentIndex);
  }

  function goBack() {
    currentIndex = currentIndex == 0 ? len : currentIndex - 1;

    changeTrack(currentIndex);
  }

  function changeTrack(currentIndex) {
    play(tracks[currentIndex]);
  }

  function play(track) {
    player.src = track.href;
    tracks.forEach((track) => track.closest("li").classList.remove("active"));
    track.parentElement.classList.add("active");
    player.load();
    player.play();
  }
})();
