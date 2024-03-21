import * as lib from "./js/canvas_funcs.mjs";

window.onload = () => {
    // Aufruf: initialisier Canvas, id des HTM: "canvas"
    const { canvas, context } = lib.initCanvas("canvas");

    canvas.addEventListener("touchstart", (evt) => {
        setFingers(evt, true);
    });

    canvas.addEventListener("touchmove", (evt) => {
        setFingers(evt, false);
    });

    canvas.addEventListener("touchend", (evt) => {
        rmFingers(evt);
    });

    const fingers = {};
    function setFingers(evt, isStart = false) {
        evt.preventDefault();
        for (let t of evt.changedTouches) {
            fingers[t.identifier] = { x: t.pageX, y: t.pageY };
        }
    }

    function rmFingers(evt) {
        evt.preventDefault();
        for (let t of evt.changedTouches) {
            delete fingers[t.identifier];
        }
    }


    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const ids = Object.keys(fingers);
        if (ids.length) {
            for (let id of ids) {
                const f = fingers[id];
                lib.circle(context, f.x, f.y, 20, "#f00");
            }
        }

        window.requestAnimationFrame(draw);
    }
    draw();
};

