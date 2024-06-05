// Function to create a custom HTML element
function createCustomElement(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
  document.getElementById('tertiaryContent').appendChild(custom_element);
}

// Load external CSS file dynamically
function loadCSS(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// Get the hostname of the current website
const site = window.location.hostname;

// JavaScript codes for TankTrouble
if (site.includes("tanktrouble.com")) {
  // Load external CSS file
  loadCSS('ttcv2/css/classicStyle.css');
  
  // Create custom HTML element
  createCustomElement('div', 'id', 'helpSnippet', `
    <div class="content">
      <div class="header">Need Help?</div>
      <div style="color: #fff;"><a href="https://tinyurl.com/ttrulesdoc" target="_blank">Check the FAQ</a></div>
    </div>
  `);
}
