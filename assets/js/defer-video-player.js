/* Will swap all video thumbs upon click to the actual video embed. */
var uniqueEmbedID = 0;

document.querySelectorAll(".video-media-thumb").forEach(el => {
  el.setAttribute("number", uniqueEmbedID);
  el.addEventListener("click", function(ev) {
    ev.preventDefault();

    const dataURL = el.getAttribute("data");
    const vidW = el.getAttribute("data-width");
    const vidH = el.getAttribute("data-height");
    const vidPolicy = el.getAttribute("data-policy");
    const customID = `deferred-video-player${el.getAttribute("number")}`;

    el.parentElement.innerHTML = `<iframe src="${dataURL}" width="${vidW}" height="${vidH}" title="Embed Video Player" id="${customID}" allow="autoplay; encrypted-media" referrerpolicy="${vidPolicy}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>`;
  });
  uniqueEmbedID += 1;
});