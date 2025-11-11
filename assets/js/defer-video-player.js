/* Will swap all video thumbs upon click to the actual video embed. */
document.querySelectorAll(".video-media-thumb").forEach(el => {
  el.addEventListener("click", function(ev) {
    ev.preventDefault();
    const dataURL = el.getAttribute("data");
    const vidW = el.getAttribute("data-width");
    const vidH = el.getAttribute("data-height");
    el.parentElement.innerHTML = `<iframe src="${dataURL}" width="${vidW}" height="${vidH}" title="Video Player" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>`;
  });
});
