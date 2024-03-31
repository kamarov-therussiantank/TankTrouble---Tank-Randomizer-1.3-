const site = window.location.hostname

function injectJSCode(code) {
  const scriptElement = document.createElement('script');
  scriptElement.setAttribute('type', 'customScript');
  scriptElement.textContent = code;
  document.documentElement.appendChild(scriptElement);
}

function injectJSLink(src) {
  const scriptElement = document.createElement('script');
  scriptElement.setAttribute('type', 'customScript');
  scriptElement.setAttribute('src', src);
  document.documentElement.appendChild(scriptElement);
}

if (site.includes('www.tanktrouble.com')); {
