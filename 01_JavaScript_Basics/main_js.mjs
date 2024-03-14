import * as lib from "./js/funcs.mjs";
lib.test();

function Haus() {

    // lokale Variable
    let anzahl_tueren = 4;  // privat, nur sichtbar in Funktionen
    let anzahl_fenster = 0; // public; 

    function tuereEinbauen() {
        anzahl_tueren += 1;
    }

    function info() {
        console.log(`das haus hat ${anzahl_tueren} tueren`);
    }

    return { info, tuereEinbauen, anzahl_fenster };
}

let name = "Andreas";

const o = {
    name,
    alter: 15
}

window.onload = () => {
    let h = Haus();
    h.anzahl_fenster = 1;
    h.tuereEinbauen();
    h.info();
    h.tuereEinbauen();
    h.info();
};

