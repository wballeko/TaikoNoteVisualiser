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
    // get the parameters from the url
    const urlParams = new URLSearchParams(window.location.search);
    const sequence = urlParams.get("sequence");
    const sv = urlParams.get("sv");

    // if the parameters are not null then set the state
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
    // set the parameters in the input boxes
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

function convertSequenceToNotes()
{
    // for each character in the sequence add a note to the notes object
    // if a character is a [ then the next notes are half the length until a ] is found
    // if a character is a { then the next notes are double the length until a } is found
    // if a character is a ( then the next notes are 1.5 times the length until a ) is found

    state.sequence.split("").forEach((character, index) => {
        switch (character) {
            case "[":
                state.spacing = state.spacing / 2;
                break;
            case "]":
                state.spacing = state.spacing * 2;
                break;
            case "{":
                state.spacing = state.spacing * 2;
                break;
            case "}":
                state.spacing = state.spacing / 2;
                break;
            case "(":
                state.spacing = state.spacing * 1.5;
                Math.round(state.spacing, 1);
                break;
            case ")":
                state.spacing = state.spacing / 1.5;
                Math.round(state.spacing, 1);
                break;
            case "<":
                state.spacing++;
                break;
            case ">":
                state.spacing--;
                break;
            default:
                notes.push({
                    note: character,
                    duration: state.spacing,
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

    notes.forEach((note, index) => {
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