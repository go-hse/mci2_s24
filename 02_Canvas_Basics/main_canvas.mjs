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

    let x = 0, y = 0, sx = 3, sy = 3, alpha = 0;
    const qw = 2, qh = 4;
    const radius = canvas.height / 4;

    const minute = Math.PI / 30;
    function draw() {
        context.resetTransform();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ff5a9e";

        context.translate(canvas.width / 2, canvas.height / 2);

        for (let m = 0; m < 60; ++m) {
            if (m % 5 === 0) {
                lib.line(context, radius - 25, 0, radius, 0, "#000");
            } else {
                lib.line(context, radius - 10, 0, radius, 0, "#000");
            }
            context.rotate(minute);
        }

        window.requestAnimationFrame(draw);
    }
    draw();
};

