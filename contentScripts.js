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
    @font-face {
        font-family: 'TankTrouble';
        src: url('fonts/Classic_TankTrouble_font.ttf')
    }
    .snippet {
        background: linear-gradient(to bottom, #fff, #fff);
        border: #333 2px solid;
        box-shadow: 0 3px 4px 0 rgba(0,0,0, .5)
    }
    .snippet .header {
        background: #dadada;
        color: #fff;
        border-radius: 3px;
        border: #bababa 2px solid;
    }
    #teaser-25 .mode {
        color: red;
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
        font-size: 14px;
    }
    .box .content {
        background: #c7c7c7;
        border-radius: 0px;
        border: #999 3px solid;
        padding: 5px;
    }
    #overlay .newGame .premium {
        background: #c7c7c7;
        border: #999 4px solid;
        border-radius: 0px;
        box-shadow: 0 3px 4px 0 rgba(0,0,0, .5)
    }
    .box .tab.topRight {
        background: #999;
    }
     `);
}
