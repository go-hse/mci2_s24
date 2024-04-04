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


    return { draw, isInside, reset, move: () => { } };
}

export function createInteractivePath(context, path, x, y, sc, alpha, options, callback) {
    let inside = false, identifier, Pre;

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
            Pre = (new DOMMatrix([1, 0, 0, 1, -evt.pageX, -evt.pageY])).multiplySelf(M);
        }
        return inside;
    }

    function move(evt) {
        if (evt.identifier === identifier) {
            M = (new DOMMatrix([1, 0, 0, 1, evt.pageX, evt.pageY])).multiplySelf(Pre);
        }
    }

    function reset(evt) {
        if (evt.identifier === identifier) {
            inside = false;
            identifier = undefined;
        }
    }


    return { draw, isInside, reset, move };
}


export function createInteractivePath2Finger(context, path, x, y, sc, alpha, options, callback) {
    let inside = false, identifierOne, identifierTwo, Pre;

    let M = lib.getTransform(context, x, y, alpha, sc); // lokale Koord.Sys. der interakt. Obj.
    let x1, y1, x2, y2;


    // wird im Draw aufgerufen
    function draw() {
        if (inside)
            lib.fillPath(context, path, M, "#f00");
        else
            lib.fillPath(context, path, M, "#f0f");
    }

    // wird im Touch-Event aufgerufen
    function isInside(evt) {
        if (identifierOne === undefined) {
            const I = (new DOMMatrix(M)).invertSelf(); // M: LKS - L
            const Ti = I.transformPoint(new DOMPoint(evt.pageX, evt.pageY));
            inside = context.isPointInPath(path, Ti.x, Ti.y);
            if (inside) {
                identifierOne = evt.identifier;
                x1 = evt.pageX; y1 = evt.pageY;
                Pre = (new DOMMatrix([1, 0, 0, 1, -evt.pageX, -evt.pageY])).multiplySelf(M);
            }
            return inside;
        } else {
            if (identifierTwo === undefined) {
                identifierTwo = evt.identifier;
                x2 = evt.pageX; y2 = evt.pageY;
                const alpha = Math.atan2(y2 - y1, x2 - x1);
                Pre = lib.getTransform(context, x1, y1, alpha).invertSelf().multiplySelf(M);
            }
        }
    }

    function move(evt) {
        if (evt.identifier === identifierOne) {
            x1 = evt.pageX; y1 = evt.pageY;
        }
        if (evt.identifier === identifierTwo) {
            x2 = evt.pageX; y2 = evt.pageY;
        }
        if (identifierOne !== undefined && identifierTwo !== undefined) {
            const alpha = Math.atan2(y2 - y1, x2 - x1);
            M = lib.getTransform(context, x1, y1, alpha).multiplySelf(Pre);
        } else if (identifierOne !== undefined) {
            M = lib.getTransform(context, x1, y1).multiplySelf(Pre);
        }
    }

    function reset(evt) {
        if (evt.identifier === identifierOne) {
            inside = false;
            identifierOne = undefined;
        }
        if (evt.identifier === identifierTwo) {
            identifierTwo = undefined;
            Pre = lib.getTransform(context, x1, y1).invertSelf().multiplySelf(M);
        }
    }


    return { draw, isInside, reset, move };
}
