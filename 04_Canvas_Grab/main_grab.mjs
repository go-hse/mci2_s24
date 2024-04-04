import * as lib from "./js/canvas_funcs.mjs";
import { createButton, createInteractivePath, createInteractivePath2Finger } from "./js/interactive_objects.mjs";

window.onload = () => {
    // Aufruf: initialisier Canvas, id des HTM: "canvas"
    const { canvas, context } = lib.initCanvas("canvas");

    const my_u = lib.u_path();

    canvas.addEventListener("touchstart", (evt) => {
        setFingers(evt, true);
    });

    canvas.addEventListener("touchmove", (evt) => {
        setFingers(evt, false);
    });

    canvas.addEventListener("touchend", (evt) => {
        rmFingers(evt);
    });

    let strokeStyle = "#000";
    const interactiveObjects = [];

    interactiveObjects.push(createButton(context, 50, 50, { color: "#f00" }, () => {
        strokeStyle = "#f00";
    }));
    interactiveObjects.push(createButton(context, 150, 50, { color: "#0f0" }, () => {
        strokeStyle = "#0f0";
    }));
    interactiveObjects.push(createButton(context, 250, 50, { color: "#00f" }, () => {
        strokeStyle = "#00f";
    }));

    interactiveObjects.push(createInteractivePath2Finger(context, my_u, 250, 250, 30, Math.PI / 5, { color: "#00f" }, () => {
        strokeStyle = "#00f";
    }));


    const fingers = {}, points = [];
    function setFingers(evt, isStart = false) {
        evt.preventDefault();
        for (let t of evt.changedTouches) {
            if (isStart)
                for (let io of interactiveObjects)
                    io.isInside(t);
            else
                for (let io of interactiveObjects)
                    io.move(t);
            fingers[t.identifier] = { x: t.pageX, y: t.pageY };
            points.push({ x: t.pageX, y: t.pageY, strokeStyle, isStart })
        }
    }

    function rmFingers(evt) {
        evt.preventDefault();
        for (let t of evt.changedTouches) {
            for (let io of interactiveObjects)
                io.reset(t);
            delete fingers[t.identifier];
        }
    }

    function draw() {
        context.resetTransform();
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let io of interactiveObjects)
            io.draw();

        // context.lineWidth = 5;
        // context.beginPath();
        // for (let p of points) {
        //     if (p.isStart) {
        //         context.stroke();
        //         context.strokeStyle = p.strokeStyle;
        //         context.beginPath();
        //         context.moveTo(p.x, p.y);
        //     } else {
        //         context.lineTo(p.x, p.y);
        //     }
        // }
        // context.stroke();

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

