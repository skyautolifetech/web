window.addEventListener('load', () => {
  registerSW();
});

function showPopup(imgId) {
  const image = document.getElementById(imgId);
  switch (image) {
    case "img_dome":
      const overlay = document.getElementById('overlay_dome' + imgId.replace(/\D/g, ''));
      break;
    case "img_bullet":
      const overlay = document.getElementById('overlay_bullet' + imgId.replace(/\D/g, ''));
      break;
    case "img_car":
      const overlay = document.getElementById('overlay_car' + imgId.replace(/\D/g, ''));
      break;
    default:
      break;
  }
  image.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function hidePopup(imgId) {
  const image = document.getElementById(imgId);
  switch (image) {
    case "img_dome":
      const overlay = document.getElementById('overlay_dome' + imgId.replace(/\D/g, ''));
      break;
    case "img_bullet":
      const overlay = document.getElementById('overlay_bullet' + imgId.replace(/\D/g, ''));
      break;
    case "img_car":
      const overlay = document.getElementById('overlay_car' + imgId.replace(/\D/g, ''));
      break;
    default:
      break;
  }
  image.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.removeProperty('overflow');
}

function ShowHideView(targetid, selfid) {
  const show = document.getElementById(targetid);
  const hide = document.getElementById(selfid);
  show.style.display = "block";
  hide.style.display = "none";
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}