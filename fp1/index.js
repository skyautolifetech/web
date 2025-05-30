function showPopup(imgId) {
  const image = document.getElementById(imgId);
  const overlay = document.getElementById('overlay' + imgId.replace(/\D/g, ''));
  image.classList.add('active');
  overlay.classList.add('active');
}
function hidePopup(imgId) {
  const image = document.getElementById(imgId);
  const overlay = document.getElementById('overlay' + imgId.replace(/\D/g, ''));
  image.classList.remove('active');
  overlay.classList.remove('active');
}

function ShowHideView(targetid, selfid) {
  const show = document.getElementById(targetid);
  const hide = document.getElementById(selfid);
  show.style.display = "block";
  hide.style.display = "none";
}

const grad = document.getElementById("pathroom");
let angle = 0;
function rotateGradient() {
  angle = (angle + 2) % 360;
  grad.setAttribute("gradientTransform", `rotate(${angle}, 0.5, 0.5)`);
}
setInterval(rotateGradient, 10); // Adjust rotation speed here
