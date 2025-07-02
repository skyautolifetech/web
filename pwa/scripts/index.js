window.addEventListener('load', () => {
  registerSW();
});

function showPopup(imgId, overlayId) {
  const image = document.getElementById(imgId);
  const overlayCheck = document.getElementById(overlayId);
  switch (overlayCheck) {
    case "overlay-dome":
      const overlay = document.getElementById('overlay-dome' + imgId.replace(/\D/g, ''));
      break;
    case "overlay-bullet":
      const overlay = document.getElementById('overlay-bullet' + imgId.replace(/\D/g, ''));
      break;
    case "overlay-car":
      const overlay = document.getElementById('overlay-car' + imgId.replace(/\D/g, ''));
      break;
    default:
      break;
  }
  image.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function hidePopup(imgId, overlayId) {
  const image = document.getElementById(imgId);
  const overlayCheck = document.getElementById(overlayId);
  switch (overlayCheck) {
    case "overlay-dome":
      const overlay = document.getElementById('overlay-dome' + imgId.replace(/\D/g, ''));
      break;
    case "overlay-bullet":
      const overlay = document.getElementById('overlay-bullet' + imgId.replace(/\D/g, ''));
      break;
    case "overlay-car":
      const overlay = document.getElementById('overlay-car' + imgId.replace(/\D/g, ''));
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