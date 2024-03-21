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

    const btn = lib.createButton(context, 50, 50, {}, () => {
        console.log("touched");
    });

    const fingers = {};
    function setFingers(evt, isStart = false) {
        evt.preventDefault();
        for (let t of evt.changedTouches) {
            btn.isInside(t);
            fingers[t.identifier] = { x: t.pageX, y: t.pageY };
        }
    }

    function rmFingers(evt) {
        evt.preventDefault();
        for (let t of evt.changedTouches) {
            btn.reset(t);
            delete fingers[t.identifier];
        }
    }


    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        btn.draw();
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

