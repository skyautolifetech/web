window.addEventListener('load', () => {
  registerSW();
});

function showPopup(imgId) {
  const image = document.getElementById(imgId);
  const overlay = document.getElementById('overlay' + imgId.replace(/\D/g, ''));
  image.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function hidePopup(imgId) {
  const image = document.getElementById(imgId);
  const overlay = document.getElementById('overlay' + imgId.replace(/\D/g, ''));
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