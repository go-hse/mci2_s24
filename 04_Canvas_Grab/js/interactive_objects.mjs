import * as lib from "./canvas_funcs.mjs";

export function createButton(context, x, y, options, callback) {
    const radius = 30;
    let inside = false, identifier;

    // wird im Draw aufgerufen
    function draw() {
        if (inside)
            lib.circle(context, x, y, radius, "#aaa");
        else
            lib.circle(context, x, y, radius, options.color);
    }

    // wird im Touch-Event aufgerufen
    function isInside(evt) {
        const d = lib.distance(x, y, evt.pageX, evt.pageY);
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

export function createInteractivePath(context, path, x, y, sc, alpha, options, callback) {
    let inside = false, identifier;

    let M = lib.getTransform(context, x, y, alpha, sc); // lokale Koord.Sys. der interakt. Obj.

    // wird im Draw aufgerufen
    function draw() {
        if (inside)
            lib.fillPath(context, path, M, "#f00");
        else
            lib.fillPath(context, path, M, "#f0f");
    }

    // wird im Touch-Event aufgerufen
    function isInside(evt) {
        const I = (new DOMMatrix(M)).invertSelf();
        const Ti = I.transformPoint(new DOMPoint(evt.pageX, evt.pageY));
        inside = context.isPointInPath(path, Ti.x, Ti.y);
        if (inside) {
            identifier = evt.identifier;
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
