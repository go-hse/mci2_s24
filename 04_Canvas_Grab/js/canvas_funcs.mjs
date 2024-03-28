export function initCanvas(id) {
    // HTML-Element canvas;
    const canvas = document.getElementById(id);

    // Context
    const context = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return { canvas, context };
}

export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

export function createButton(context, x, y, options, callback) {

    const radius = 30;
    let inside = false, identifier;


    // wird im Draw aufgerufen
    function draw() {
        if (inside)
            circle(context, x, y, radius, "#aaa");
        else
            circle(context, x, y, radius, options.color);
    }

    // wird im Touch-Event aufgerufen
    function isInside(evt) {
        const d = distance(x, y, evt.pageX, evt.pageY);
        inside = d <= radius;
        if (inside) {
            identifier = evt.identifier;
            callback();
        }
        return inside;
    }

    function reset(evt) {
        if (evt.identifier === identifier) {
            inside = false;
            identifier = undefined;
        }
    }


    return { draw, isInside, reset };
}

export function line(ctx, x1, y1, x2, y2, strokeStyle = "#fff", lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


const startAngle = 0;
const endAngle = Math.PI * 2;

export function circle(ctx, x, y, radius, fillStyle = "#fff", strokeStyle = "#000", lineWidth = 1) {
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, true);
    ctx.fill();
    ctx.stroke();
}

