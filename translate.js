function createBingTranslateWidget() {
    const translateDiv = document.createElement('div');
    translateDiv.id = 'bing_translate_element';

    const targetDiv = document.querySelector('.one-page-cover-info');

    targetDiv.parentNode.insertBefore(translateDiv, targetDiv.nextSibling);

    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://www.microsofttranslator.com/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=False&ui=true&settings=manual&from=auto&to=en,id,ms';
    document.body.appendChild(script1);
}

function checkForTargetElement() {
    const targetElement = document.querySelector('.one-page-cover-info');
    const buttonExists = document.querySelector('#bing_translate_element');

    if (targetElement && !buttonExists) {
        createBingTranslateWidget();
    }
}

const observer = new MutationObserver(() => {
    checkForTargetElement();
});

observer.observe(document.body, { childList: true, subtree: true });

checkForTargetElement();

const style = document.createElement('style');
style.textContent = `
    /* Add your custom styles for the Bing Translate widget here */
    /* Example: iframe styles, button styles, etc. */
    #bing_translate_element iframe {
        display: none !important;
    }
    /* Add more styles as needed */
`;
document.head.appendChild(style);
