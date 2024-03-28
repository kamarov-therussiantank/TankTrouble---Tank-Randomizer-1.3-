//TODO: Add Statistics Snippet
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

// Classic Mouse Script
const customScript = document.createElement('script');
customScript.innerHTML = `
   Tank.method('_computeRotationSpeed',function(){this.rotationSpeed=0;var speedModifier=this.roundModel.getModifier(this.playerId,Constants.MODIFIER_TYPES.SPEED);var classicMouseEnabled=Inputs.isClassicMouseEnabled(this.playerId);if(this.left){this.rotationSpeed+=-Constants.TANK.ROTATION_SPEED*(classicMouseEnabled?Inputs.turnMultiplier:speedModifier)}if(this.right){this.rotationSpeed+=Constants.TANK.ROTATION_SPEED*(classicMouseEnabled?Inputs.turnMultiplier:speedModifier)}});
   Inputs.classMethod('isClassicMouseEnabled',function(playerId){return(playerId==undefined?true:Inputs.getAssignedInputSetId(playerId)==Inputs.INPUT_TYPES.MOUSE)&&localStorage.getItem('classicMouse')=='true'});
   Inputs.turnMultiplier=1;
   MouseInputManager.method('update',function(){this._super();var game=GameManager.getGame();if(game){var forwardState=false;var backState=false;var leftState=false;var rightState=false;var fireState=false;var gameBounds=game.scale.bounds;var gameScale=game.scale.scaleFactor;var classicMouseEnabled=Inputs.isClassicMouseEnabled(this.playerId);var deadAngle=classicMouseEnabled?.03:UIConstants.MOUSE_INPUT.ROTATION_DEAD_ANGLE;this.mouseX=(MouseInputManager.mousePageX-gameBounds.x)*gameScale.x;this.mouseY=(MouseInputManager.mousePageY-gameBounds.y)*gameScale.y;if(game.input.enabled&&MouseInputManager.mouseActivated){if(game.state.getCurrentState().getTankSprite){var tankSprite=game.state.getCurrentState().getTankSprite(this.playerId);if(tankSprite){var relativeToTank=tankSprite.toLocal(new Phaser.Point(this.mouseX,this.mouseY));var magnitude=relativeToTank.getMagnitude();var angle=Phaser.Math.angleBetween(0,0,relativeToTank.x,relativeToTank.y);var canReverse=magnitude<(classicMouseEnabled?10:UIConstants.MOUSE_INPUT.MAX_REVERSE_DISTANCE)/UIConstants.GAME_ASSET_SCALE;var goInReverse=false;var turnInt=Math.abs((angle/Math.PI+.5)*4).toPrecision(3)+2;turnInt>.25?Inputs.turnMultiplier=turnInt*3:Inputs.turnMultiplier=1;Inputs.turnMultiplier>4?Inputs.turnMultiplier=4:null;if(angle>Math.PI*.5+deadAngle||angle<-Math.PI*.5-deadAngle*2){if(angle>0&&canReverse){rightState=true;goInReverse=true}else{leftState=true}}else if(angle>-Math.PI*.5+deadAngle&&angle<Math.PI*.5-deadAngle*2){if(angle>0&&canReverse){leftState=true;goInReverse=true}else{rightState=true}}else if(angle>0){if(canReverse){goInReverse=true}else{if(angle>Math.PI*.5){leftState=true}else{rightState=true}}}if(magnitude>(classicMouseEnabled?180:UIConstants.MOUSE_INPUT.POSITION_DEAD_DISTANCE)/UIConstants.GAME_ASSET_SCALE){if(canReverse){forwardState=!goInReverse;backState=goInReverse}else if(angle>-Math.PI*.5-UIConstants.MOUSE_INPUT.POSITION_DEAD_ANGLE&&angle<-Math.PI*.5+UIConstants.MOUSE_INPUT.POSITION_DEAD_ANGLE){forwardState=true}}}}fireState=MouseInputManager.mouseDown||game.input.mousePointer.leftButton.isDown}var stateChanged=Inputs.turnMultiplier!==1&&classicMouseEnabled;if(!stateChanged){stateChanged|=this.storedStates['forward']!==forwardState;stateChanged|=this.storedStates['back']!==backState;stateChanged|=this.storedStates['left']!==leftState;stateChanged|=this.storedStates['right']!==rightState;stateChanged|=this.storedStates['fire']!==fireState}var gameController=GameManager.getGameController();if(stateChanged&&gameController){var inputState=InputState.withState(this.playerId,forwardState,backState,leftState,rightState,fireState);gameController.setInputState(inputState)}this.storedStates['forward']=forwardState;this.storedStates['back']=backState;this.storedStates['left']=leftState;this.storedStates['right']=rightState;this.storedStates['fire']=fireState}});
   QualityManager.classMethod('update',function(){var time=Date.now();if(QualityManager.fpsTime>0){var currentFps=1e3/(time-QualityManager.fpsTime);QualityManager.avgFps*=1-UIConstants.SETTINGS_QUALITY_FPS_AVG_WEIGHT;QualityManager.avgFps+=currentFps*UIConstants.SETTINGS_QUALITY_FPS_AVG_WEIGHT;QualityManager.numFpsSamples++}QualityManager.fpsTime=time;if(QualityManager.quality===QualityManager.QUALITY_SETTINGS.AUTO){if(QualityManager.numFpsSamples>UIConstants.SETTINGS_QUALITY_FPS_MIN_SAMPLES){if(QualityManager.numFpsSamples%UIConstants.SETTINGS_QUALITY_FPS_SAMPLE_UPDATE_INTERVAL===0){QualityManager._notifyEventListeners(QualityManager.EVENTS.FPS_UPDATED,QualityManager.avgFps)}if(QualityManager.avgFps<UIConstants.SETTINGS_QUALITY_FPS_CHANGE_TO_LOW){QualityManager.setQuality(QualityManager.QUALITY_SETTINGS.LOW)}}}});
   Inputs.classMethod('update',function(){for(var i=0;i<Inputs.inputManagers.length;++i){Inputs.inputManagers[i].update();if(Inputs.inputManagers[i].mouseX&&Inputs.isClassicMouseEnabled(Inputs.inputManagers[i].playerId)){var mouseIndex=i;for(var j=0;j<5;j++){setTimeout(function(){Inputs.inputManagers[mouseIndex]?.update()},(200/QualityManager.avgFps>55?QualityManager.avgFps:60)*j)}}}});
`;
document.body.appendChild(customScript);
 }
