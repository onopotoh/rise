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
                includedLanguages: 'en,id,ms'
            }, 'google_translate_element');
        }
    }
}

// Check if the user has visited the site before
const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');

function checkForTargetElement() {
    const targetElement = document.querySelector('.one-page-cover-info');
    const buttonExists = document.querySelector('#google_translate_element');

    // Check if the user has not visited before
    if (targetElement && !buttonExists && !hasVisitedBefore) {
        createGoogleTranslateWidget();
        
        // Set a flag to indicate that the user has visited before
        localStorage.setItem('hasVisitedBefore', 'true');
    }
}

const observer = new MutationObserver(() => {
    checkForTargetElement();
});

observer.observe(document.body, { childList: true, subtree: true });

checkForTargetElement();

// Add your CSS styles for the pop-up here
const style = document.createElement('style');
style.textContent = '/* Styles for the language selection pop-up */
            #google_translate_element {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #fff;
                border: 1px solid #ccc;
                box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
                border-radius: 3px;
                padding: 20px;
                z-index: 1000;
            }

            /* Style the Google Translate button inside the pop-up */
            .goog-te-gadget {
                color: transparent !important;
            }

            /* Hide Google Translate logo */
            .goog-logo-link {
                display: none !important;
            }

            /* Style the language select combo box */
            .goog-te-combo {
                background-color: #f8f8f8;
                color: #333;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 8px;
                font-size: 14px;
                width: 100%;
            }

            /* Style the "Translate" button */
            .goog-te-button {
                background-color: #0074d9;
                color: #fff;
                border: none;
                border-radius: 3px;
                padding: 8px 16px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 10px;
            }

            /* Add hover effect to the "Translate" button */
            .goog-te-button:hover {
                background-color: #0056b3;
            }

            /* Hide Google Translate tooltip and other elements */
            #goog-gt-tt,
            .VIpgJd-ZVi9od-aZ2wEe-wOHMyf.VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc {
                display: none !important;
            }
        `;
document.head.appendChild(style);
