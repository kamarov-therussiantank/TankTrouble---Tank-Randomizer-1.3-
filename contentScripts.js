//TODO: Add Record Snippet
//TODO: Upgrade Classic UI
//TODO: Add more matte versions of paints and add matte versions of spray cans
//TODO: Add Classic Mouse
//TODO: GM badges, Kickstarter badges
//TODO: Classic Lobby Settings (local only), Leaderboard, Maze Creator (local only)

// Function to dynamically add custom CSS
const addCustomStyle = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

// Function to create a custom HTML element
function createCustomElement(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
  document.getElementById('secondaryContent').appendChild(custom_element);
}

// Get the hostname of the current website
const site = window.location.hostname;

// Create a link element for linking the style.css file
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = chrome.runtime.getURL('style.css');
document.head.appendChild(linkElement);

// JavaScript codes for TankTrouble
if (site.includes("tanktrouble.com")) {
   addCustomStyle(`
    .snippet {
        background: linear-gradient(to bottom, #fff, #fff);
        border: #333 2px solid;
        border-radius: 2px;
        box-shadow: 0 3px 4px 0 rgba(0,0,0, .5)
    }
    .snippet .header {
        background: #dadada;
        color: #fff;
        border-radius: 3px;
        border: #bababa 2px solid;
        margin-bottom: 5px;
        text-shadow: -1px -1px 0 #000,  
                      1px -1px 0 #000,
                     -1px  1px 0 #000,
                      1px  1px 0 #000;
    }
    .shopItem svg text {
       text-shadow: none;
       stroke: none;
    }
    #teaser-25 .mode {
        color: red;
    }
    .forum .bubble {
        background-color: #f2f2f2;
        border: #333 2px solid;
        border-radius: 2px;
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
        border-radius: 2px;
        border: #999 5px solid;
        padding: 5px;
    }
    #overlay {
        color: #fff;
        text-shadow: -1px -1px 0 #000,  
                      1px -1px 0 #000,
                     -1px  1px 0 #000,
                      1px  1px 0 #000;
    }
    #overlay .newGame .premium {
        background: #aaa;
        border: #000 8px solid;
        border-radius: 0px;
        box-shadow: 0 5px 7px 0 rgba(0,0,0, .5)
    }
    #overlay .messages .message {
        background: linear-gradient(to bottom, #3ee64c, #2a9133);
        color: #fff;
        border: darkgreen 4px solid;
        border-radius: 2px;
        text-shadow: none;
    }
    #overlay .messages .message.important {
        background: linear-gradient(to bottom, #e01f1f, #961717);
        color: #fff;
        border: maroon 4px solid;
        border-radius: 2px;
        text-shadow: none;
     }
     #overlay .admin .attention {
        text-shadow: none;
     }
    .box .tab.topRight {
        background: #999;
    }
   `);
   
   // Create a custom HTML element
   createCustomElement('div', 'class', 'snippet', '<div class="header" style="margin-left: 4px; margin-right: 4px; margin-top: 2px;">Statistics</div><div class="content" id="websiteStatisticsSnippet">Tank Owners:</div>');
}
