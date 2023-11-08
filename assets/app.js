const DEFAULT_SV = 1.4;
const DEFAULT_COLUMN_WIDTH_IN_PIXELS = 16;

const state = {
    sequence: "kkdd[kk]r[dd]r[kk]r[kk]r[dd]r[kk]",
    spacing: 4,
    sv: 1.4,
};

const notes = [];

function getParameters()
{
    const urlParams = new URLSearchParams(window.location.search);
    const sequence = urlParams.get("sequence");
    const sv = urlParams.get("sv");

    if (sequence !== null) {
        state.sequence = sequence;
    }

    if (sv !== null) {
        state.sv = sv;
    }

    if (sv < 0) {
        state.sv = 0;
    }
}

function setParameters()
{
    const sequenceInput = document.querySelector("#sequence");
    sequenceInput.value = state.sequence;

    const svInput = document.querySelector("#sv");
    svInput.value = state.sv;
}

function applySV()
{
    const cssColumnWidth = state.sv * DEFAULT_COLUMN_WIDTH_IN_PIXELS / DEFAULT_SV;
    document.documentElement.style.setProperty('--column-width', `${cssColumnWidth}px`);
}

function applyBackgrounds()
{
    const pageBackgroundColor = document.querySelector("#page-background-color");
    const sequenceBackgroundColor = document.querySelector("#sequence-background-color");

    document.documentElement.style.setProperty('--page-background-color', pageBackgroundColor.value);
    document.documentElement.style.setProperty('--sequence-background-color', sequenceBackgroundColor.value);
}

function convertSequenceToNotes()
{
    let spacing = state.spacing;

    state.sequence.split("").forEach((character) => {
        switch (character) {
            case "[":
                spacing = spacing / 2;
                break;
            case "]":
                spacing = spacing * 2;
                break;
            case "{":
                spacing = spacing * 2;
                break;
            case "}":
                spacing = spacing / 2;
                break;
            case "(":
                spacing = spacing * 1.5;
                break;
            case ")":
                spacing = spacing / 1.5;
                break;
            case "<":
                spacing++;
                break;
            case ">":
                spacing--;
                break;
            default:
                Math.round(spacing, 1);
                if (spacing < 1) spacing = 1;
                if (spacing > 16) spacing = 16;
                notes.push({
                    note: character,
                    duration: spacing,
                });
                break;
        }
    });
}

function renderNotes()
{
    const noteGrid = document.querySelector("#sequence-grid");
    noteGrid.innerHTML = "";

    let zIndex = notes.length + 1;

    notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.classList.add(`s${note.duration}`);
        noteElement.style.zIndex = zIndex;
        zIndex--;

        switch (note.note) {
            case "k":
                noteElement.classList.add("katsu");
                break;
            case "d":
                noteElement.classList.add("don");
                break;
            case "K":
                noteElement.classList.add("katsu","finisher");
                break;
            case "D":
                noteElement.classList.add("don","finisher");
                break;
            case " ":
                noteElement.classList.add("rest");
                break;
            case "r":
                noteElement.classList.add("rest");
                break;
            default:
                return;
        
        }
        noteGrid.appendChild(noteElement);
    });
}

function applyListeners()
{
    const sequenceInput = document.querySelector("#sequence");
    sequenceInput.addEventListener("input", (event) => {
        state.sequence = event.target.value;
        notes.length = 0;
        convertSequenceToNotes();
        renderNotes();
    });

    const svInput = document.querySelector("#sv");
    svInput.addEventListener("input", (event) => {
        state.sv = event.target.value;
        applySV();
    });

    const pageBackgroundColor = document.querySelector("#page-background-color");
    pageBackgroundColor.addEventListener("input", (event) => {
        applyBackgrounds();
    });

    const sequenceBackgroundColor = document.querySelector("#sequence-background-color");
    sequenceBackgroundColor.addEventListener("input", (event) => {
        applyBackgrounds();
    });
}

function main()
{
    getParameters();
    setParameters();
    applySV();
    convertSequenceToNotes();
    renderNotes();
    applyListeners();
}

main();