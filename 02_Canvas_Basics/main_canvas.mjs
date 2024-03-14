import * as lib from "./js/canvas_funcs.mjs";

window.onload = () => {
    const { canvas, context } = lib.initCanvas("canvas");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#005a9e";
        context.fillRect(100, 100, 20, 20);

        window.requestAnimationFrame(draw);
    }
    draw();
};

