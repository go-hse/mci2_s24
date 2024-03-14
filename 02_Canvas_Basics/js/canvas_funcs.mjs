export function initCanvas(id) {
    const canvas = document.getElementById(id);
    const context = canvas.getContext('2d');
    return { canvas, context };
}

