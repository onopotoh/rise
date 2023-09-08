function createGoogleTranslateWidget() {
    // Create the translateDiv and add it to the DOM
    const translateDiv = createTranslateDiv();
    const targetDiv = document.querySelector('.one-page-cover-info');
    insertAfter(translateDiv, targetDiv);

    // Create and append the translation script
    createTranslationScript();
}

function createTranslateDiv() {
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    return translateDiv;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createTranslationScript() {
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script1);

    if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = initializeGoogleTranslate;
    }
}

function initializeGoogleTranslate() {
    new google.translate.TranslateElement({
        pageLanguage: 'id',
        includedLanguages: 'en,id,ms'
    }, 'google_translate_element');
}

function checkForTargetElement() {
    const targetElement = document.querySelector('.one-page-cover-info');
    const buttonExists = document.querySelector('#google_translate_element');

    if (targetElement && !buttonExists) {
        createGoogleTranslateWidget();
    }
}

const observer = new MutationObserver(checkForTargetElement);
observer.observe(document.body, { childList: true, subtree: true });

checkForTargetElement();

// Add your styles
const style = document.createElement('style');
style.textContent = `
    /* Your CSS styles here */
`;
document.head.appendChild(style);
