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
    background: linear-gradient(to bottom, #f0f0f0, #f0f0f0);
    border: #cfcfcf 3px solid;
    box-shadow: 0 3px 4px 0 rgba(0,0,0, .5)
}

.forum .bubble {
    background-color: #f2f2f2;
    border: #333 2px solid;
    font-family: 'TankTroubleClassic';
    box-shadow: 0 3px 4px 0 rgba(0,0,0, .5)
}

.body {
    font-family: 'TankTroubleClassic';
    font-size: 14px;
}

.forum .tank {
    font-family: 'TankTrouble';
    font-size: 12px;
}

.p {
    font-family: 'TankTrouble';
 }
 `);
}
