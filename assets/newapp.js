const state = {
    sequence: "kkdd[kk]r[dd]r[kk]r[kk]r[dd]r[kk]",
    spacing: 4,
};

const notes = [];

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
                break;
            case ")":
                state.spacing = state.spacing / 1.5;
                break;
            default:
                notes.push({
                    note: character,
                    duration: state.spacing,
                });
                break;
        }
    });

    console.log(notes);
}

convertSequenceToNotes();

function renderNotes()
{
    const noteGrid = document.querySelector("#sequence-grid");

    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.classList.add(`s${note.duration}`);

        switch (note.note) {
            case "k":
                noteElement.classList.add("katsu");
                break;
            case "d":
                noteElement.classList.add("don");
                break;
            case "r":
                noteElement.classList.add("rest");
                break;
        
        }

        noteElement.style.gridColumn = index + 1;
        noteElement.style.gridRow = 1;
        noteElement.style.gridRowEnd = `span ${note.duration}`;
        noteGrid.appendChild(noteElement);
    });
}

renderNotes();