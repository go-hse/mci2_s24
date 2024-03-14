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

    let x = 0, y = 0, sx = 3, sy = 3;
    const q = 20;
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ff5a9e";
        context.fillRect(x - 5, y - 5, q * 2, q * 2);

        context.fillStyle = "#005a9e";
        x += sx; if (x + q > canvas.width || x < 0) sx *= -1;
        y += sy; if (y + q > canvas.height || y < 0) sy *= -1;
        context.fillRect(x, y, q, q + 10);

        lib.line(context, canvas.width / 2, canvas.height / 2, x, y, "red", 1);

        window.requestAnimationFrame(draw);
    }
    draw();
};

