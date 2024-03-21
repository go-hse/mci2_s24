export function initCanvas(id) {
    // HTML-Element canvas;
    const canvas = document.getElementById(id);

    // Context
    const context = canvas.getContext('2d');


    return { canvas, context };
}

export function line(ctx, x1, y1, x2, y2, strokeStyle = "#fff", lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
