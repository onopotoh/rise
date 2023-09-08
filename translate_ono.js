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
                pageLanguage: 'id',
                layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL // Set layout to HORIZONTAL
                includedLanguages: 'en,id', // Limit translation to English and Indonesian
                defaultLanguage: 'id', // Set the default language
            }, 'google_translate_element');

            const translateDiv = document.querySelector('#google_translate_element');

            translateDiv.querySelectorAll('.goog-te-menu-item').forEach((item) => {
                if (item.textContent !== 'Indonesia' && item.textContent !== 'English') {
                    item.remove();
                }
            });
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
    style.textContent = 'iframe[id=":1.container"] { display: none !important; } body {top:0!important }; .goog-logo-link{display:none !important;}.goog-te-gadget{ color:transparent!important;} .VIpgJd-ZVi9od-l4eHX-hSRGPd{display: none} .goog-te-combo { background-color:#fff; color:#000000; border: 1px solid transparent; box-shadow: 0 4px 4px rgba(0,0,0,.1); border-radius:3px; padding:6px 8px; transition: transform .3s;} .skiptranslate.goog-te-gadget{ padding-left: 60px; padding-bottom: 20px;} #goog-gt-tt #goog-gt-vt{ display: none !important; } .VIpgJd-ZVi9od-aZ2wEe-wOHMyf.VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc { display: none !important; }';
    document.head.appendChild(style);