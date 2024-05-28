// TODO: Classic Lobby Settings (local only), Leaderboard, FAQ, LAB?!

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
   createCustomElement('div', 'id', 'statisticsSnippet', `
   <style>
    #statisticsSnippet {
      background: linear-gradient(to bottom, #fff, #fff);
      border: #000 2px solid;
      border-radius: 5px;
      box-shadow: none;
      margin-bottom: 10px;
      text-align: center;
    }
    #statisticsSnippet .header {
      font-family:'TankTrouble';
      font-size: 14px;
      background: #ccc;
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
    margin: 3px 0 3px 0;
    font-family: 'ClassicTankTrouble';
    font-size: 1.05em;
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
