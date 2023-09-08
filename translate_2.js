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
    // Access the iframe containing the course content
    const iframe = document.querySelector('.one-page-cover-info');
    if (!iframe) {
      return;
    }

    // Get the document inside the iframe
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // Select the target element within the iframe
    const targetElement = iframeDocument.querySelector('.one-page-cover-info');
    if (!targetElement) {
      return;
    }

    // Translate the content within the target element
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
  });
