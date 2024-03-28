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

export function u_path() {
    let upath = new Path2D();
    upath.moveTo(-2, -2);
    upath.lineTo(-2, 2);
    upath.lineTo(-1, 2);
    upath.lineTo(-1, -1);
    upath.lineTo(1, -1);
    upath.lineTo(1, 2);
    upath.lineTo(2, 2);
    upath.lineTo(2, -2);
    upath.closePath();
    return upath;
}

export function fillPath(ctx, path, Matrix, fillStyle = "#fff", strokeStyle = "#000", lineWidth = 0.1) {
    ctx.save();  // Speichern des Zustands mit der aktuellen Matrix auf Stack
    ctx.setTransform(Matrix); // Setzen der Matrix
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fill(path);
    ctx.stroke(path);
    ctx.restore(); // Holen der gespeicherten Matrix vom Stack
}


export function setTransform(ctx, x, y, alpha = 0, sc = 1) {
    ctx.resetTransform(); // Zurücksetzen auf Identität
    ctx.translate(x, y); // Translation
    ctx.rotate(alpha); // Rotation
    ctx.scale(sc, sc); // Skalierung
}

export function getTransform(ctx, x, y, alpha = 0, sc = 1) {
    ctx.save();  // Speichern des Zustands mit der aktuellen Matrix auf Stack
    setTransform(ctx, x, y, alpha, sc);
    let L = ctx.getTransform(); // Berechnete Matrix speichern
    ctx.restore(); // Holen der gespeicherten Matrix vom Stack
    return L; // Rückgabe
}
