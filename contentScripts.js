
// TODO: Add more matte versions of paints and add matte versions of spray cans
// TODO: Classic Lobby Settings (local only), Leaderboard

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

// JavaScript codes for TankTrouble
if (site.includes("tanktrouble.com")) {
   addCustomStyle(`
    .snippet {
        background: #fff;
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
    #scrapyardSnippet .content {
        margin-left: 4px;
        margin-right: 4px;
    }
    #scrapyardSnippet {
        width: 133px;
        padding: 3px;
    }
    .shopItem svg text {
       text-shadow: none;
       stroke: none;
    }
    .shopItem {
       background: #aaa;
       border-radius: 3px;
       border: #666 3px solid;
       box-shadow: #000 0 3px 5px 0;
    }
    .shopItem.info button.info {
    width: 34px;
    float: right;
    right: 10px;
    color: white;
    background: #3159bf;
    }
    #teaser-25 .mode {
        color: red;
    }
    .forum .bubble {
        background-color: #f2f2f2;
        border: #333 2px solid;
        border-radius: 2px;
        box-shadow: 0 3px 4px 0 rgba(0,0,0, .5)
    }
    .body {
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
    border: #666 4px solid;
    border-radius: 0px;
    box-shadow: 0 5px 7px 0 rgba(0,0,0, .5);
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
    .box .tab.right {
        background: #999;
    }
    .box .tab.left {
        background: #999;
    }
     .achievement.unlockedAndSeen {
        background: linear-gradient(to bottom, #ccc, #666);
        box-shadow: #000 0px 3px 3px 0px;
        text-shadow: none;
        color: #000;
    }
    .achievement {
        background: #666;
        text-shadow: none;
        color: #fff;
    }
    .achievement .progress {
        background: linear-gradient(to bottom, #e5c766, #a68826);
    }
    .note {
        color: #000;
    }
    #overlay input[type="checkbox"]+label::before {
    content: '';
    background: red;
    border: 3px solid black;
    transition: background .3s;
    border-radius: 2px;
    font-size: 35px;
    line-height: 24px;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 5px;
}
#overlay input[type="checkbox"]:checked+label::before {
    border-color: #000000 !important;
    background: limegreen;
}
#content {
    max-width: 1884px !important;
    width: calc(100%) !important;
}
.horizontalAdSlot,
.verticalAdSlot,
#leftBanner,
#rightBanner,
#topBanner {
    display: none !important;
}
#chat {
	/* Disable drop shadow filter */
	filter: none;

	/* Transform chat location to bottom left */
	inset: calc(100% - 30px) auto auto 34px !important;
}

/* Reverse chat messages flow */
#chat,
#chat .content,
#chat .body {
	display: flex;
	flex-direction: column-reverse;
}

#chat .body {
	align-items: end;
	background: #00000014;
	border-image: linear-gradient(90deg, rgb(0 0 0 / 20%), #0000) 4 7 3 / 0 0 1pt 0 / 0;
	border-radius: 3px;
	direction: rtl;
	margin-bottom: 4px;
	margin-top: 0 !important;
	mask-image: linear-gradient(to top, rgb(0 0 0) 70%, rgb(0 0 0 / 11%));
	overflow: hidden;
	padding-right: 10px;
	pointer-events: visible;

	/* Scrollbar */
	scrollbar-gutter: stable;
	top: 0 !important;
}

#chat .content {
	position: relative;
	width: fit-content !important;
}

#chat .status.button {
	cursor: initial;
	transform: translate(7px, -18px);
	z-index: 1;
}

#chat form {
	background: #ececec;
	border-image: linear-gradient(90deg, rgb(0 0 0 / 20%), #0000) 4 7 3 / 0 0 1pt 0 / 1pt;
	margin-left: 20px;
	width: 200px;
}

/* Disable chat message sending animation */
#chat form[style*="repeating-linear-gradient"] {
	background: #d0d0d0 !important;
}

#chat:not(.open) form {
	display: none;
}

#chat textarea {
	font-family: Arial, verdana;
	left: 5px;
	transition: width 0s !important;
	width: calc(100% - 12px);
}

#chat .body .chatMessage svg {
	border-left: 2px dotted rgb(170 170 170);
	padding: 2px 4px 1px;
}

#chat .body.dragging {
	border: none !important;
	margin-left: 20px !important;
}

/* Rotate and align the handle to top-right */
.handle.ui-resizable-ne[src*="resizeHandleBottomRight.png"] {
	height: 12px !important;
	position: absolute;
	right: 0;
	top: 0;
	transform: rotate(-90deg);
	width: 12px;
}

body:has(#chat .body.ui-resizable-resizing) .ui-resizable-handle.handle.ui-resizable-ne {
	display: none !important;
}

#chat .body:hover {
	overflow-y: scroll;
}

#chat .body .chatMessage {
	margin-left: ${(/Chrome.*Safari/u).test(navigator.userAgent) ? '3px' : '5px'};
	direction: ltr;
}

#chat .body::-webkit-scrollbar {
	width: 3px;
}

#chat .body::-webkit-scrollbar-track {
	background: transparent;
}

#chat .body::-webkit-scrollbar-thumb {
	background: rgb(170 170 170);
}

#chat form .autocomplete-dropdown {
	background-color: #00ff02;
	border-radius: 3px;
	bottom: 0;
	filter: drop-shadow(0 0 3px rgb(0 0 0 / 70%));
	font-family: Arial, verdana;
	margin-bottom: 25px;
	max-height: 120px;
	max-width: 200px;
	min-width: 120px;
	overflow-y: scroll;
	padding: 4px 2px;
	position: absolute;
	scrollbar-color: #00a902 transparent;
	scrollbar-gutter: stable;
	scrollbar-width: thin;
	white-space: nowrap;
	z-index: 999;
}

#chat form .autocomplete-dropdown div {
	border-bottom: 1pt dotted #00a902;
	cursor: pointer;
	display: none;
	margin-bottom: 2px;
	overflow: hidden;
	padding: 0 8px 2px 4px;
	text-overflow: ellipsis;
}

#chat form .autocomplete-dropdown .match {
	display: block;
}

#chat form .autocomplete-dropdown .match:not(:has(~ .match)) {
	border-bottom: none;
	padding: 0 8px 0 4px;
}

#chat form .autocomplete-dropdown .highlight {
	font-weight: bold;
}

#chat form .autocomplete-dropdown:hover .highlight {
	font-weight: normal;
}

#chat form .autocomplete-dropdown div:hover {
	font-weight: bold !important;
}

#chat form .autocomplete-dropdown:has(div:not(.highlight):hover) > .highlight {
	font-weight: normal;
}

#chat form .autocomplete-caret-mirror {
	background: transparent;
	color: transparent;
	font-family: Arial, verdana;
	font-size: inherit;
	font-weight: bold;
	height: 0;
	margin: 0 0 0 5px;
	opacity: 0;
	padding: 1px 2px;
	pointer-events: none;
	z-index: -2147483647;
}
`);
   `);
   
   // Create a custom HTML element
   createCustomElement('div', 'id', 'statisticsSnippet', `
   <style>
    #statisticsSnippet {
      background: linear-gradient(to bottom, #fff, #fff);
      border: #333 2px solid;
      border-radius: 2px;
      box-shadow: 0 3px 4px 0 rgba(0,0,0, .5);
      margin-bottom: 10px;
      text-align: center;
    }
    #statisticsSnippet .header {
      font-family:'TankTrouble';
      background: #dadada;
      color: #fff;
      border-radius: 3px;
      border: #bababa 2px solid;
      margin-bottom: 5px;
      padding: 5px 0 3px 0;
      text-shadow: -1px -1px 0 #000,  
                    1px -1px 0 #000,
                   -1px  1px 0 #000,
                    1px  1px 0 #000;
    }
    #statisticsSnippet .content {
      margin: 3px 2px 3px 2px;
    }
    #statisticsSnippet .content * {
      margin: 3px 2px 3px 2px;
    }
    #statisticsSnippet .content #visits {
      font-size: 13px;
      font-weight: 600;
      margin-top: 5px;
      margin-bottom: 5px;
      font-family: 'Commodore';
    }
    #statisticsSnippet .content #onlinePlayerCount {
      font-size: 15px;
      font-weight: 600;
      margin-top: 5px;
      margin-bottom: 5px;
      font-family: 'Commodore';
    }
    #statisticsSnippet .content #tankOwnersCount {
      font-size: 13px;
      font-weight: 600;
      margin-top: 5px;
      margin-bottom: 5px;
      font-family: 'Commodore';
    }
    #statisticsSnippet .content #onlineGameCount {
      font-size: 7px;
      font-weight: 600;
      margin-top: 5px;
      margin-bottom: 10px;
      font-family: 'Commodore';
    }
    #statisticsSnippet .managedNavigation {
      cursor: pointer;
    }
    #statisticsSnippet .managedNavigation:hover {
      background-color: #fff;
      border-color: #fff
    }
  </style>
    <div class="content">
      <div class="header">Statistics</div>
      <div style="color: #a4a4a4;">Visits</div>
      <div id="visits">...</div>
      <div style="color: #a4a4a4;">Tank Owners</div>
      <div id="tankOwnersCount">...</div>
      <div style="color: #a4a4a4;">Players Online</div>
      <div id="onlinePlayerCount">...</div>
      <div style="color: #a4a4a4;">Games Made</div>
      <div id="onlineGameCount">Loading...</div>
      </div>
  `);

//Script for Statistics Snippet
TankTrouble.Statistics.type = "global";
  ClientManager.classMethod("_attemptToConnectToServer", function(serverId) {
    ClientManager.log.debug("Attempt to connect to server initiated: " + serverId);
    ClientManager._getSelectedServerStats(serverId, function(success, serverId, latency, gameCount, playerCount, visits, tankOwners, message) {
      if (ClientManager.client.getState() === TTClient.STATES.UNCONNECTED) {
        if (success) {
          TankTrouble.Statistics._updateStatistics(serverId);
          TankTrouble.SettingsBox.enableServer(serverId, latency);
          TankTrouble.SettingsBox.setServer(serverId);
          ClientManager.log.debug("Attempt to connect to server resulted in new connect: " + serverId);
          Cookies.set("multiplayerserverid", serverId, {
            expires: 365
          });
          ClientManager.multiplayerServerId = serverId;
          ClientManager.client.connect(ClientManager.availableServers[serverId].url);
        } else {
          TankTrouble.SettingsBox.disableServer(serverId);
          Cookies.remove("multiplayerserverid");
          ClientManager.multiplayerServerId = null;
          ClientManager._findAndConnectToBestAvailableServer();
        }
      } else {
        ClientManager.log.debug("Client connected to other server while attempting to connect to this server: " + serverId);
      }
    });
  });
    TankTrouble.Statistics._updateStatistics = function(serverId) {
  var self = this;
  switch (this.type) {
    case "global":
      Backend.getInstance().getStatistics(function(result) {
        console.log("Server response:", result); // Log the server response for debugging
        if (typeof result == "object") {
          $("#visits").text(result.visits);
          $("#tankOwnersCount").text(result.tankOwners); 
          self._updateNumber($("#onlinePlayerCount"), result.onlineStatistics.playerCount);
          self._updateNumber($("#onlineGameCount"), result.onlineStatistics.gameCount, "game");
          $("#statisticsSnippet").css("display", "inline-block");
        }
      }, function(error) {
        console.error("Error fetching statistics:", error); // Log any errors that occur during fetching statistics
      });
      break;
      case "server":
        var server;
        if (typeof serverId !== "undefined") {
          server = serverId;
        } else {
          server = ClientManager.multiplayerServerId;
        }
        ClientManager._getSelectedServerStats(server, function(success, serverId, latency, gameCount, playerCount, message) {
          self._updateNumber($("#onlinePlayerCount"), playerCount);
          self._updateNumber($("#onlineGameCount"), gameCount, "game");
          $("#statisticsSnippet").css("display", "inline-block");
        });
        break;
      default:
        Backend.getInstance().getStatistics(function(result) {
          if (typeof result == "object") {
            self._updateNumber($("#onlinePlayerCount"), result.onlineStatistics.playerCount);
            self._updateNumber($("#onlineGameCount"), result.onlineStatistics.gameCount, "game");
            $("#statisticsSnippet").css("display", "inline-block");
          }
        }, function(result) {});
        break;
    }
  };
 }
