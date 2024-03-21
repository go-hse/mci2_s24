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

    const radius = canvas.height / 4;
    const tick_length = 35;
    const short_tick_lenght = 15;

    const minute = Math.PI / 30;
    function draw() {
        const now = new Date();
        const hour = now.getHours();
        const hr = hour >= 12 ? hour - 12 : hour;
        const mi = now.getMinutes();
        const sc = now.getSeconds();
        const ms = now.getMilliseconds();

        context.resetTransform();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.translate(canvas.width / 2, canvas.height / 2);

        {   // Ticks: auessere Markierungen auf dem Ziffernblatt 
            context.save();
            for (let m = 0; m < 60; ++m) {
                if (m % 5 === 0) {
                    lib.line(context, radius - tick_length, 0, radius, 0, "#000");
                } else {
                    lib.line(context, radius - short_tick_lenght, 0, radius, 0, "#000");
                }
                context.rotate(minute);
            }
            context.restore();
        }

        {   // Stundenzeiger
            context.save();
            // 12 Stunden in Bogenmass: 2*PI;
            // 1 Stunde = 2*PI / 12 = PI / 6
            const ah = hr * Math.PI / 6;

            // 12 Stunden = 12 * 60 Minuten
            // 1 Minute = 2*PI / 12 * 60 = PI / 360
            const am = mi * Math.PI / 360;

            context.rotate(ah + am);
            lib.line(context, 0, 0, 0, -radius / 2, "#000", 4);

            context.restore();
        }


        {   // Minutenzeiger
            context.save();
            // 60 Minuten in Bogenmass: 2*PI;
            // 1 Minute = 2*PI / 60 = PI / 30
            const am = mi * Math.PI / 30;

            // 3600 Sekunden in Bogenmass: 2*PI;
            // 1 Sekunde = 2*PI / 3600 = PI / 1800
            const as = sc * Math.PI / 1800;

            context.rotate(am + as);
            lib.line(context, 0, 0, 0, -radius + tick_length, "#000", 2);
            context.restore();
        }


        {   // Sekundenzeiger
            context.save();
            // 60 Sekunden in Bogenmass: 2*PI;
            // 1 Sekunde = 2*PI / 60 = PI / 30
            const as = sc * Math.PI / 30;

            // 60*1000 MilliSekunden in Bogenmass: 2*PI;
            // 1 Sekunde = 2*PI / 60000 = PI / 30000
            const am = ms * Math.PI / 30000;

            context.rotate(as + am);
            lib.line(context, 0, 0, 0, -radius + tick_length, "#f00", 1);
            context.restore();
        }


        window.requestAnimationFrame(draw);
    }
    draw();
};

