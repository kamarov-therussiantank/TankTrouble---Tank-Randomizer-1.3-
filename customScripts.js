// Function to inject custom scripts
function injectCustomScripts(scripts) {
    scripts.forEach(src => {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.setAttribute('src', chrome.runtime.getURL(src));
        document.documentElement.appendChild(scriptElement);
    });
}

// List of custom scripts
const customScripts = [
    'scripts/classicMouse-script.js',
    'scripts/moreGames-script.js',
];

// Inject custom scripts if the hostname matches
if (window.location.hostname.includes("tanktrouble.com")) {
    injectCustomScripts(customScripts);
}
