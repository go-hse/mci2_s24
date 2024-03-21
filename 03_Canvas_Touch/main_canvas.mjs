import * as lib from "./js/canvas_funcs.mjs";

window.onload = () => {
    // Aufruf: initialisier Canvas, id des HTM: "canvas"
    const { canvas, context } = lib.initCanvas("canvas");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function draw() {
        window.requestAnimationFrame(draw);
    }
    draw();
};

