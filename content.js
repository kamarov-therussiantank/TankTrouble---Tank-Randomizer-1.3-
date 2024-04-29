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
#game {
    position: relative;
    left: -10px;
    top: 0px;
}
form {
    background: #ddd;
    border-radius: 7px;
    border: #757575 3px solid;
    width: 500px;
    position: relative;
    left: 580px;
}
#overlay .achievements form {
    background: none;
    border: none;
}
#overlay .garage form {
    background: none;
    border: none;
}
#overlay .virtualShop form {
    padding-top: 20px;
    background: none;
    border: none;
}
#overlay .shop form {
    padding-top: 20px;
    background: none;
    border: none;
}
    .premium #header {
        background-image: url(../assets/images/header/background.png);
        background-size: 120px 120px;
}
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
    background: #d5d5d5;
    border-radius: 5px;
    border: #999 3px solid;
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
   #overlay .newGame .premium::before {
    content: "";
    width: 160px;
    height: 180px;
    position: absolute;
    top: -115px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url(https://cdn.tanktrouble.com/RELEASE-2023-09-06-01/assets/images/tankInfo/accountActive@2x.png);
    background-size: 160px 180px;
}
    #overlay .messages .message {
        background: #1ad72a;
        color: #fff;
        border-radius: 2px;
        text-shadow: none;
    }
    #overlay .messages .message.important {
        background: #e01f1f;
        color: #fff;
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
   #tankinfo .username {
    position: relative;
    z-index: 1;
    height: 28px;
    background: #979797;
    border: 3px #0000002e solid;
    border-radius: 4px;
}
   #tankinfo .icon {
    position: absolute;
    width: 320px;
    height: 192px;
    left: calc(50% + 5px);
    top: -162px;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
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
    border: 2px solid #fff;
    transition: background .3s;
    border-radius: 5px;
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
    border-color: #fff !important;
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
