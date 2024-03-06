// Get the hostname of the current website
const site = window.location.hostname;

// Function to dynamically add custom CSS
const addCustomStyle = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

// Function to create a custom HTML element
function createCustomElement(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
  document.body.append(custom_element);
}

// Create a link element for linking the style.css file
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = chrome.runtime.getURL('style.css');
document.head.appendChild(linkElement);

// JavaScript codes for TankTrouble
if (site.includes("tanktrouble.com")) {
  addCustomStyle(`
.snippet {
    background: linear-gradient(to bottom, #e6e6e6, #e6e6e6);
    border: #cfcfcf 4px solid;
}

.forum .bubble {
    background-color: #f2f2f2;
    border: #333 2px solid;
    font-family: 'TankTroubleClassic';
}

.body {
    font-family: 'TankTroubleClassic';
    font-size: 13px;
}
 `);
}
