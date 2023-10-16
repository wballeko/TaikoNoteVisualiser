const rawArguments = window.location.search.replace('?','').split('&');

// Arguments to object
arguments = {};

if (rawArguments.toString() !== ''){
    for (let i = 0; i < rawArguments.length; i++) {
        let argument = rawArguments[i].split('=');
        // Decode URI component to allow for multiple spaces
        argument[1] = decodeURIComponent(argument[1]);
        arguments[argument[0]] = argument[1];
    }
} else {
    arguments['sequence'] = 'ddk';
    arguments['spacing'] = 4;
}

// Fill input with arguments
document.querySelector('#sequence').value = arguments['sequence'];
document.querySelector('#spacing').value = arguments['spacing'];

function appendCharacterToVisualizer(character) {
    const visualiser = document.querySelector('#visualiser');
    const characterElement = document.createElement('div');
    characterElement.classList.add(character);
    visualiser.appendChild(characterElement);
}

// Foreach character in sequence, add to the page
for (let i = 0; i < arguments['sequence'].length; i++) {
    let character = arguments['sequence'][i];
    switch(character) {
        case 'd':
            appendCharacterToVisualizer('don');
            break;
        case 'k':
            appendCharacterToVisualizer('katsu');
            break;
        case 'D':
            appendCharacterToVisualizer('don-finisher');
            break;
        case 'K':
            appendCharacterToVisualizer('katsu-finisher');
            break;
        case '+':
            appendCharacterToVisualizer('rest');
            break;
        default:
            break;
    }
}

// Change stylesheet based on spacing
function changeStylesheetToSpacing(spacing) {
    const stylesheet = document.querySelector('#stylesheet');
    stylesheet.href = `assets/style-${spacing}.css`;
}

changeStylesheetToSpacing(arguments['spacing']);