document.getElementById("floorplan").addEventListener("load", function () {
    
    const svgDoc = document.getElementById("floorplan").contentDocument;
    if (!svgDoc) {
        console.error("SVG contentDocument not found");
        return;
    }

    // Define the rooms (lights)
    const rooms = [
        "area.bedroom",
        "area.guesttoilet",
        "area.hallway",
        "area.office",
        "area.livingroom",
        "area.guestroom",
        "area.kitchen",
        "area.restroom",
        "area.udestue"
    ];

    // Make rooms clickable (toggle light)
    rooms.forEach(roomId => {  
        const room = svgDoc.getElementById(roomId);
        if (room) {
            room.style.cursor = "pointer";
            room.addEventListener("click", function () {
                room.classList.toggle("light-on");
                room.classList.toggle("light-off");
                // Home Assistant: Toggle light
                if (window.hass) {
                    const entityId = roomId.replace("area.", "light.");
                    hass.callService("light", "toggle", { entity_id: entityId });
                }
            });
        } else {
            console.warn(`Room ID ${roomId} not found in SVG`);
        }
    });

    // Make fan interactive (toggle spinning)
    const fan = svgDoc.getElementById("switch.udestue_fan");
    if (fan) {
        fan.style.cursor = "pointer";
        fan.addEventListener("click", function () {
            fan.classList.toggle("spinning");
            if (window.hass) {
                hass.callService("switch", "toggle", { entity_id: "switch.udestue_fan" });
            }
        });
    } else {
        console.warn("Fan ID switch.udestue_fan not found in SVG");
    }

    // Function to generate random temperature
    function getRandomTemperature(min, max) {
        return (Math.random() * (max - min) + min).toFixed(1) + "°C";
    }

    // Temperature display using Home Assistant states or fallback
    const temperatures = {
        "sensor.livingroom": "25°C",
        "sensor.udestue": "24°C",
        "sensor.ac_temperature": "23°C"
    };

    // Display temperatures
    const acTempElement = svgDoc.getElementById("tspan148");
    const livingroom = svgDoc.getElementById("tspan148-9");
    const udestue = svgDoc.getElementById("tspan148-9-7");

    function updateTemperatures() {
        // Update the temperatures randomly between 23°C and 27°C
        temperatures["sensor.livingroom"] = getRandomTemperature(23, 27);
        temperatures["sensor.udestue"] = getRandomTemperature(23, 27);
        temperatures["sensor.ac_temperature"] = getRandomTemperature(23, 27);

        if (acTempElement) {
            acTempElement.textContent = temperatures["sensor.ac_temperature"];
             acTempElement.style.fill = "white";
        } else {
            console.warn("AC temp element tspan148 not found in SVG");
        }

        if (livingroom) {
            livingroom.textContent = temperatures["sensor.livingroom"];
             livingroom.style.fill = "white";
        } else {
            console.warn("Livingroom temp element tspan148-9 not found in SVG");
        }

        if (udestue) {
            udestue.textContent = temperatures["sensor.udestue"];
               udestue.style.fill = "white";
        } else {
            console.warn("Udestue temp element tspan148-9-7 not found in SVG");
        }
    }

    // Update temperature every second
    setInterval(updateTemperatures, 1000);
});