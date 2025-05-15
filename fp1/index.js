function toggleLights(element) {
  const currentOpacity = parseFloat(getComputedStyle(element).opacity);
  element.style.opacity = currentOpacity === 0 ? "1" : "0";
}

function toggleShine(element) {
  const currentOpacity = parseFloat(getComputedStyle(element).opacity);
  element.style.opacity = currentOpacity === 0 ? "0.5" : "0";
}

function toggleGate(element, max = 125, origin = 17.7205, speed = 1) {
  // Don't run if already animating
  if (element.dataset.timer) return;
  // Initialize state if not set
  if (!element.dataset.atEnd) {
    element.dataset.atEnd = "false";
  }
  let goingForward = element.dataset.atEnd === "false";
  const interval = setInterval(() => {
    let x = parseInt(element.getAttribute("x"));
    if (goingForward) {
      x += speed;
      if (x >= max) {
        x = max;
        clearInterval(interval);
        element.dataset.timer = "";
        element.dataset.atEnd = "true";
      }
    } else {
      x -= speed;
      if (x <= origin) {
        x = origin;
        clearInterval(interval);
        element.dataset.timer = "";
        element.dataset.atEnd = "false";
      }
    }
    element.setAttribute("x", x);
  }, 20);
  element.dataset.timer = interval;
}

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

function getRandomTemperature(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1) + "°C";
}
function updateTemperatures() {
  const svgObject = document.getElementById("floorplan");
  if (!svgObject || !svgObject.contentDocument) return;
  const svgDoc = svgObject.contentDocument;
  const tempTspan = svgDoc.getElementById("temp");
  if (tempTspan) {
    tempTspan.textContent = getRandomTemperature(23, 27);
  }
}
// Retry updating every 5 seconds
setInterval(updateTemperatures, 5000);
