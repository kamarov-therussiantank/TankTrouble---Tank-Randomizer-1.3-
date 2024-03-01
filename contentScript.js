const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.type = 'text/css';
linkElement.href = chrome.runtime.getURL('style.css');

document.head.appendChild(linkElement);
