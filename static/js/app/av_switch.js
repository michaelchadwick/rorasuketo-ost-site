function getWidth() {
  const image = document.querySelector(".split-image");
  const video = document.querySelector(".split-video");

  if (window.innerWidth < 801) {
    if (video) video.style.display = "none";
    if (image) image.style.display = "block";
  } else {
    if (video) video.style.display = "block";
    if (image) image.style.display = "none";
  }
}

if (window.innerWidth < 801) {
  if (video) video.parentNode.removeChild(video);
} else {
  window.onload = getWidth;
  window.onresize = getWidth;
}
