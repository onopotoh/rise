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

  function translateText(text, targetLanguage) {
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${text}`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data[0][0][0])
      .catch(error => {
        console.error(error);
        return text; // Return the original text on error
      });
  }

  function translatePage(targetLanguage) {
    const targetElement = document.querySelector('.one-page-cover-info');
    const textNodes = getTextNodes(targetElement);

    Promise.all(textNodes.map(node => {
      const text = node.textContent.trim();
      return translateText(text, targetLanguage)
        .then(translatedText => {
          node.textContent = translatedText;
        });
    }))
    .then(() => {
      console.log('Translation complete.');
    })
    .catch(error => {
      console.error('Translation error:', error);
    });
  }

  function getTextNodes(element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let currentNode;

    while ((currentNode = walker.nextNode())) {
      textNodes.push(currentNode);
    }

    return textNodes;
  }

  // Initialize the translation when the page loads
  window.addEventListener('load', function () {
    translatePage('id'); // Change 'id' to your target language code
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
