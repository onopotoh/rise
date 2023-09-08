function createGoogleTranslateWidget() {
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';

    const targetDiv = document.querySelector('.one-page-cover-info');

    targetDiv.parentNode.insertBefore(translateDiv, targetDiv.nextSibling);

    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script1);

    if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,id,ms', // Include English, Indonesian, and Malay
                layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
            }, 'google_translate_element');
        }
    }
}

function checkForTargetElement() {
    const targetElement = document.querySelector('.one-page-cover-info');
    const buttonExists = document.querySelector('#google_translate_element');

    if (targetElement && !buttonExists) {
        createGoogleTranslateWidget();
    }
}

const observer = new MutationObserver(() => {
    checkForTargetElement();
});

observer.observe(document.body, { childList: true, subtree: true });

checkForTargetElement();

const style = document.createElement('style');
style.textContent = `
    iframe[id=":1.container"] { display: none !important; }
    body { top: 0 !important; }
    .goog-logo-link { display: none !important; }
    .goog-te-gadget { color: transparent !important; }
    .VIpgJd-ZVi9od-l4eHX-hSRGPd { display: none }
    .goog-te-combo { display: none !important; }
    .skiptranslate.goog-te-gadget { padding-left: 60px; padding-bottom: 20px; }
    #goog-gt-tt #goog-gt-vt { display: none !important; }
    .VIpgJd-ZVi9od-aZ2wEe-wOHMyf.VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc { display: none !important; }
`;
document.head.appendChild(style);
