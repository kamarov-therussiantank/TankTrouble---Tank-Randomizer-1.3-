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

// TODO: for now this is just a akeleton of upcoming snippet
var statisticsElement = document.createElement('div');
statisticsElement.id = 'statisticsSnippet';
statisticsElement.className = 'snippet teaser standard';
statisticsElement.style.display = 'block';
statisticsElement.innerHTML = `
    <style>
        #statisticsSnippet .header {
            font-family: TankTrouble;
            margin: 0px 0px 2px 0px;
            padding: 3px 0 5px 0;
        }
        #statisticsSnippet .content * {
            padding: 4px 0px 2px 0px;
        }
        #statisticsSnippet .content #onlinePlayerCount {
            font-size: 40px;
            font-weight: 600;
        }
    </style>
    <div class="content">
        <div class="header">Who has deployed?</div>
        <div id="onlinePlayerCount">...</div>
        <div id="onlineGameCount">${loadingText[Math.floor(Math.random() * loadingText.length)]}</div>
        <div class="managedNavigation" id="switchTypeButton">Global</div>
    </div>`;

// Append statistics snippet
var pushStatisticsSnippet = setInterval(() => {
    var secondaryContent = document.getElementById('secondaryContent');
    if (!!secondaryContent) {
        secondaryContent.appendChild(statisticsElement);
        clearInterval(pushStatisticsSnippet);
    }
}, 500);

// Add script for statistics
var statisticsScript = document.createElement('script');
statisticsScript.innerHTML = `
    TankTrouble.Statistics.type = "global";

    TankTrouble.Statistics._switchType = function(element) {
        this.type = (this.type === "global") ? "server" : "global";
        element.innerText = (this.type === "global") ? "Global" : "Server";
        this._updateStatistics();
    };

    TankTrouble.Statistics._updateStatistics = function(serverId) {
        var self = this;
        switch (this.type) {
            case "global":
                Backend.getInstance().getStatistics(
                    function(result) {
                        if (typeof result === "object") {
                            self._updateNumber(document.getElementById("onlinePlayerCount"), result.onlineStatistics.playerCount);
                            self._updateNumber(document.getElementById("onlineGameCount"), result.onlineStatistics.gameCount, "game");
                            document.getElementById("statisticsSnippet").style.display = "inline-block";
                        }
                    },
                    function(result) {}
                );
                break;
            case "server":
                var server;
                if (typeof serverId !== "undefined") {
                    server = serverId;
                } else {
                    server = ClientManager.multiplayerServerId;
                }
                ClientManager._getSelectedServerStats(server,
                    function(success, serverId, latency, gameCount, playerCount, message) {
                        self._updateNumber(document.getElementById("onlinePlayerCount"), playerCount);
                        self._updateNumber(document.getElementById("onlineGameCount"), gameCount, "game");
                        document.getElementById("statisticsSnippet").style.display = "inline-block";
                    }
                );
                break;
            default:
                Backend.getInstance().getStatistics(
                    function(result) {
                        if (typeof result === "object") {
                            self._updateNumber(document.getElementById("onlinePlayerCount"), result.onlineStatistics.playerCount);
                            self._updateNumber(document.getElementById("onlineGameCount"), result.onlineStatistics.gameCount, "game");
                            document.getElementById("statisticsSnippet").style.display = "inline-block";
                        }
                    },
                    function(result) {}
                );
                break;
        }
    };
`;
document.head.appendChild(statisticsScript);

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
        margin-bottom: 5px;
        text-shadow: -1px -1px 0 #000,  
                      1px -1px 0 #000,
                     -1px  1px 0 #000,
                      1px  1px 0 #000;
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
