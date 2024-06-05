const addCustomStyle = css => document.head.appendChild(document.createElement("style")).innerHTML = css;
// Function to create a custom HTML element
function createCustomElement(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
  document.getElementById('tertiaryContent').appendChild(custom_element);
}
// Get the hostname of the current website
const site = window.location.hostname;
// JavaScript codes for TankTrouble
if (site.includes("tanktrouble.com")) {
   createCustomElement('div', 'id', 'helpSnippet', `
   <style>
    #helpSnippet {
      background: linear-gradient(to bottom, #000, #000);
      border: #000 3px solid;
      border-radius: 5px;
      box-shadow: none;
      margin-bottom: 10px;
      text-align: center;
    }
    #helpSnippet .header {
      font-family:'TankTrouble';
      font-size: 14px;
      background: #000;
      border: 2px #000 solid;
      color: #fff;
      border-radius: 3px;
      margin-bottom: 5px;
      padding: 5px 0 3px 0;
    }
    #helpSnippet .content {
    margin: 3px 1px 3px 1px;
    font-family: 'ClassicTankTrouble';
    font-size: 1.05em;
    }
    #helpSnippet .content * {
      margin: 3px 1px 3px 1px;
    }
  </style>
    <div class="content">
      <div class="header">Need Help?</div>
      <div style="color: #fff;"><a href="https://tinyurl.com/ttrulesdoc" target="_blank">Check the FAQ</a></div>
    </div>
  `);
