// TODO: Upgrade Classic UI
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
    .box .tab.right {
        background: #999;
    }
    .box .tab.left {
        background: #999;
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
      padding: 3px 0 5px 0;
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
    #statisticsSnippet .content #onlinePlayerCount {
      font-size: 20px;
      font-weight: 600;
      margin-top: 5px;
      margin-bottom: 5px;
      font-family: 'Commodore';
    }
    #statisticsSnippet .content #onlineGameCount {
      font-size: 13px;
      font-weight: 600;
      margin-top: 5px;
      margin-bottom: 2px;
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
      <div style="color: #a4a4a4;">Players Online:</div>
      <div id="onlinePlayerCount">...</div>
      <div style="color: #a4a4a4;">Games Made:</div>
      <div id="onlineGameCount">Loading...</div>
      <div class="managedNavigation" onclick="TankTrouble.Statistics._switchType(this)"></div>
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
          self._updateNumber($("#visitsCount"), result.data.visits);
          self._updateNumber($("#tankOwnersCount"), result.data.tankOwners);
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
        ClientManager._getSelectedServerStats(server, function(success, serverId, latency, gameCount, playerCount, visits, tankOwners, message) {
          self._updateNumber($("#visitsCount"), visits);
          self._updateNumber($("#tankOwnersCount"), tankOwners);
          self._updateNumber($("#onlinePlayerCount"), playerCount);
          self._updateNumber($("#onlineGameCount"), gameCount, "game");
          $("#statisticsSnippet").css("display", "inline-block");
        });
        break;
      default:
        Backend.getInstance().getStatistics(function(result) {
          if (typeof result == "object") {
            self._updateNumber($("#visitsCount"), result.data.visits);
            self._updateNumber($("#tankOwnersCount"), result.data.tankOwners);
            self._updateNumber($("#onlinePlayerCount"), result.onlineStatistics.playerCount);
            self._updateNumber($("#onlineGameCount"), result.onlineStatistics.gameCount, "game");
            $("#statisticsSnippet").css("display", "inline-block");
          }
        }, function(result) {});
        break;
    }
  };
 }
