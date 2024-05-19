// Injection 
if (window.location.hostname.includes("tanktrouble.com")) {
    function injectJSCode(code) {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.textContent = code;
        document.documentElement.appendChild(scriptElement);
    }

    function injectJSLink(src) {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.setAttribute('src', src);
        document.documentElement.appendChild(scriptElement);
    }

    // Function to dynamically add custom CSS
    const addCustomStyle = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

    // Get the hostname of the current website
    const site = window.location.hostname;
    if (site.includes("tanktrouble.com")) {
       addCustomStyle(`
#game {
    position: relative;
    left: -10px;
    top: 0px;
}
.button.warning {
    background: #f10808;
    font-family: Arial;
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
    background: #555;
    border-radius: 3px;
    border: #666 3px solid;
    box-shadow: #000 0 3px 5px 0;
    border-radius: 7px;
}
    .shopItem.info button.info {
    width: 34px;
    float: right;
    right: 10px;
    color: white;
    background: #0097fb;
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
    width: 250px;
}
.box .spaced {
    padding: 5px;
    left: 0px;
    border: none;
    background: none;
    box-shadow: none;
}
    #overlay {
    color: #fff;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    background-color: rgb(0 0 0 / 85%);
}
    #overlay .newGame .premium {
    background: #aaa;
    border: #666 4px solid;
    border-radius: 7px;
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
#overlay .messages textarea {
    box-sizing: border-box;
    width: 490px;
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
.buttonGroup {
    display: inline-block;
    background: #ccc;
    border-radius: 7px;
    border: #666 3px solid;
    margin-bottom: 10px;
}
#chat {
    -webkit-filter: none;
    filter: none;
    -webkit-transform: translateZ(0);
    position: fixed;
    z-index: 10;
    width: 1px;
    height: 1px;
}
#chat .body {
    width: 242px;
    height: 140px;
    margin-left: 20px;
    margin-top: 0px !important;
    cursor: default;
    background: #00000014;
    padding: 2px 2px 2px 5px;
}
#chat .content {
    font-family: verdana;
    font-size: 10pt;
    width: 0;
    pointer-events: none;
    transition: width .3s .2s;
    background: none;
}
#chat form {
    border-radius: 3px;
    background-color: #dfdfdf;
    pointer-events: auto;
    animation-name: chatsend;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-direction: normal;
    animation-iteration-count: infinite;
    padding: 2px 2px 2px 2px;
    margin-left: 20px;
    left: 0px;
    border: none;
    width: 245px;
    box-shadow: none;
}
#chat:not(.open) form {
	display: none;
    background: none;
}
#chat.opening .content, #chat.open .content {
    width: 269px;
    transition: width .250s;
}
#chat.opening textarea, #chat.open textarea {
    width: 235px;
    opacity: 1;
    cursor: inherit;
}
#chat textarea {
    font-family: 'Arial';
    font-weight: bold;
    position: relative;
    left: 5px;
    width: 0;
    min-height: 16px !important;
    opacity: 0;
    margin: 0;
    padding: 1px 2px;
    border: none !important;
    outline: none !important;
    overflow-y: hidden;
    resize: none;
    background: none;
    cursor: default;
}
       `);

	    //Classic Mouse script
    Tank.method('_computeRotationSpeed', function() {
        this.rotationSpeed = 0;
        var speedModifier = this.roundModel.getModifier(this.playerId, Constants.MODIFIER_TYPES.SPEED);
        var classicMouseEnabled = Inputs.isClassicMouseEnabled(this.playerId);
        if (this.left) {
            this.rotationSpeed += -Constants.TANK.ROTATION_SPEED * (classicMouseEnabled ? Inputs.turnMultiplier : speedModifier);
        }
        if (this.right) {
            this.rotationSpeed += Constants.TANK.ROTATION_SPEED * (classicMouseEnabled ? Inputs.turnMultiplier : speedModifier);
        }
    });
    Inputs.classMethod('isClassicMouseEnabled', function(playerId) {
        return (playerId == undefined ? true : Inputs.getAssignedInputSetId(playerId) == Inputs.INPUT_TYPES.MOUSE) && localStorage.getItem('classicMouse') == 'true';
    });
    Inputs.turnMultiplier = 1;
    MouseInputManager.method('update', function() {
        this._super();
        var game = GameManager.getGame();
        if (game) {
            var forwardState = false;
            var backState = false;
            var leftState = false;
            var rightState = false;
            var fireState = false;
            var gameBounds = game.scale.bounds;
            var gameScale = game.scale.scaleFactor;
            var classicMouseEnabled = Inputs.isClassicMouseEnabled(this.playerId);
            var deadAngle = classicMouseEnabled ? 0.03 : UIConstants.MOUSE_INPUT.ROTATION_DEAD_ANGLE;
            this.mouseX = (MouseInputManager.mousePageX - gameBounds.x) * gameScale.x;
            this.mouseY = (MouseInputManager.mousePageY - gameBounds.y) * gameScale.y;
            if (game.input.enabled && MouseInputManager.mouseActivated) {
                if (game.state.getCurrentState().getTankSprite) {
                    var tankSprite = game.state.getCurrentState().getTankSprite(this.playerId);
                    if (tankSprite) {
                        var relativeToTank = tankSprite.toLocal(new Phaser.Point(this.mouseX, this.mouseY));
                        var magnitude = relativeToTank.getMagnitude();
                        var angle = Phaser.Math.angleBetween(0, 0, relativeToTank.x, relativeToTank.y);
                        var canReverse = magnitude < (classicMouseEnabled ? 10 : UIConstants.MOUSE_INPUT.MAX_REVERSE_DISTANCE) / UIConstants.GAME_ASSET_SCALE;
                        var goInReverse = false;
                        var turnInt = Math.abs((angle / Math.PI + 0.5) * 4).toPrecision(3) + 2;
                        turnInt > 0.25 ? Inputs.turnMultiplier = turnInt * 3 : Inputs.turnMultiplier = 1;
                        Inputs.turnMultiplier > 4 ? Inputs.turnMultiplier = 4 : null;
                        if (angle > Math.PI * 0.5 + deadAngle || angle < -Math.PI * 0.5 - deadAngle * 2) {
                            if (angle > 0 && canReverse) {
                                rightState = true;
                                goInReverse = true;
                            } else {
                                leftState = true;
                            }
                        } else if (angle > -Math.PI * 0.5 + deadAngle && angle < Math.PI * 0.5 - deadAngle * 2) {
                            if (angle > 0 && canReverse) {
                                leftState = true;
                                goInReverse = true;
                            } else {
                                rightState = true;
                            }
                        } else if (angle > 0) {
                            if (canReverse) {
                                goInReverse = true;
                            } else {
                                if (angle > Math.PI * 0.5) {
                                    leftState = true;
                                } else {
                                    rightState = true;
                                }
                            }
                        }
                        if (magnitude > (classicMouseEnabled ? 180 : UIConstants.MOUSE_INPUT.POSITION_DEAD_DISTANCE) / UIConstants.GAME_ASSET_SCALE) {
                            if (canReverse) {
                                forwardState = !goInReverse;
                                backState = goInReverse;
                            } else if (angle > -Math.PI * 0.5 - UIConstants.MOUSE_INPUT.POSITION_DEAD_ANGLE && angle < -Math.PI * 0.5 + UIConstants.MOUSE_INPUT.POSITION_DEAD_ANGLE) {
                                forwardState = true;
                            }
                        }
                    }
                }
            }
            fireState = MouseInputManager.mouseDown || game.input.mousePointer.leftButton.isDown;
        }
        var stateChanged = Inputs.turnMultiplier !== 1 && classicMouseEnabled;
        if (!stateChanged) {
            stateChanged |= this.storedStates['forward'] !== forwardState;
            stateChanged |= this.storedStates['back'] !== backState;
            stateChanged |= this.storedStates['left'] !== leftState;
            stateChanged |= this.storedStates['right'] !== rightState;
            stateChanged |= this.storedStates['fire'] !== fireState;
        }
        var gameController = GameManager.getGameController();
        if (stateChanged && gameController) {
            var inputState = InputState.withState(this.playerId, forwardState, backState, leftState, rightState, fireState);
            gameController.setInputState(inputState);
        }
        this.storedStates['forward'] = forwardState;
        this.storedStates['back'] = backState;
        this.storedStates['left'] = leftState;
        this.storedStates['right'] = rightState;
        this.storedStates['fire'] = fireState;
    });
    QualityManager.classMethod('update', function() {
        var time = Date.now();
        if (QualityManager.fpsTime > 0) {
            var currentFps = 1000 / (time - QualityManager.fpsTime);
            QualityManager.avgFps *= 1 - UIConstants.SETTINGS_QUALITY_FPS_AVG_WEIGHT;
            QualityManager.avgFps += currentFps * UIConstants.SETTINGS_QUALITY_FPS_AVG_WEIGHT;
            QualityManager.numFpsSamples++;
        }
        QualityManager.fpsTime = time;
        if (QualityManager.quality === QualityManager.QUALITY_SETTINGS.AUTO) {
            if (QualityManager.numFpsSamples > UIConstants.SETTINGS_QUALITY_FPS_MIN_SAMPLES) {
                if (QualityManager.numFpsSamples % UIConstants.SETTINGS_QUALITY_FPS_SAMPLE_UPDATE_INTERVAL === 0) {
                    QualityManager._notifyEventListeners(QualityManager.EVENTS.FPS_UPDATED, QualityManager.avgFps);
                }
                if (QualityManager.avgFps < UIConstants.SETTINGS_QUALITY_FPS_CHANGE_TO_LOW) {
                    QualityManager.setQuality(QualityManager.QUALITY_SETTINGS.LOW);
                }
            }
        }
    });
    Inputs.classMethod('update', function() {
        for (var i = 0; i < Inputs.inputManagers.length; ++i) {
            Inputs.inputManagers[i].update();
            if (Inputs.inputManagers[i].mouseX && Inputs.isClassicMouseEnabled(Inputs.inputManagers[i].playerId)) {
                var mouseIndex = i;
                for (var j = 0; j < 5; j++) {
                    setTimeout(function() {
                        Inputs.inputManagers[mouseIndex]?.update();
                    }, (200 / QualityManager.avgFps > 55 ? QualityManager.avgFps : 60) * j);
                }
            }
        }
    });
	    
// Improvements
TankTrouble.AdminChatLogOverlay.filter = null;

TankTrouble.AdminChatLogOverlay.show = function(params) {
    this._initialize();
    this.adminId = params.adminId;
    this.playerIds = params.playerIds !== undefined ? params.playerIds : null;
    this.chatMessageId = params.chatMessageId !== undefined ? params.chatMessageId : null;
    this.header.empty();
    this.topPaginator.empty();
    this.chatMessages.empty();
    this.bottomPaginator.empty();
    AdminOverlayNavigation.update(this.adminId, this.navigation);
    var self = this;
    if (this.playerIds) {
        AdminUtils.createPlayerNamesWithLookupByPlayerIds(this.playerIds, self.adminId, function(result) {
            self.header.append(result, '\'s chat log')
        });
        this._getChatMessagesByPlayerIds(0, 50)
    } else if (this.chatMessageId) {
        this.header.html('Chat message id ' + this.chatMessageId);
        this._getChatMessageById()
    } else {
        this.header.html('Chat reports');
        this._getUnmoderatedChatMessages()
    }
};

TankTrouble.AdminChatLogOverlay._initialize = function() {
    var self = this;
    if (this.initialized) {
        return
    }
    this.filter = $('<div style=\"margin: 10px 0px 10px 0px\" class=\"admin filter\"/>');
    this.filter.append("<select name='filter'/>");
    this.filter.find('select').append("<option value='all'>Show all</option>");
    this.filter.find('select').append("<option value='multiple'>Only with Multiple Users</option>");
    this.filter.find('select').append("<option value='private'>Whisper only</option>");
    this.filter.find('select').append("<option value='global'>Global chat only</option>");
    this.filter.find('select').append("<option value='searchQueryUsername'>Search Username</option>");
    this.filter.find('select').append("<option value='searchQueryMessage'>Search Message</option>");
    this.filter.append('<input class=\"searchField\" style=\"box-sizing: border-box; border-radius: 2px; border: 2px solid gray; background-color: #000; color: #fff; padding: 3px; transition: none; margin: 0px 0px 0px 10px; display:none;\" placeholder=\"Search Query\"></input>');
    this.filter.find('select').change(function() {
        var filterValue = self.filter.find('option:selected')[0].attributes[0].value;
        self._getChatMessagesByPlayerIds(0, 50, undefined);
        if (filterValue == 'searchQueryUsername' || filterValue == 'searchQueryMessage') {
            self.filter.find('.searchField').show()
        } else {
            self.filter.find('.searchField').hide()
        }
    });
    this.wrapper = $('<div class=\"admin chatLog\"/>');
    this.navigation = AdminOverlayNavigation.create();
    this.header = $('<div class=\"header\"/>');
    this.topPaginator = $('<div/>');
    this.chatMessages = $('<div class=\"section\"/>');
    this.bottomPaginator = $('<div/>');
    this.filter.find('.searchField').on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            TankTrouble.AdminChatLogOverlay._getChatMessagesByPlayerIds(0, 50, undefined)
        }
    });
    this.wrapper.append(this.navigation, this.header, this.filter, this.topPaginator, this.chatMessages, this.bottomPaginator);
    this.initialized = true;
};

TankTrouble.AdminChatLogOverlay._getChatMessagesByPlayerIds = function(offset, limit, page) {
    var self = this;
    var filterValue = self.filter.find('option:selected')[0].attributes[0].value;
    if (filterValue == 'searchQueryUsername') {
        var playerName = self.filter.find('.searchField').val();
        var searchPlayerId = [];
        if (playerName.includes('from:')) {
            searchPlayerId.push(playerName.slice(5));
            searchPlayerId.push('from')
        } else if (playerName.includes('sender:')) {
            searchPlayerId.push(playerName.slice(6));
            searchPlayerId.push('from')
        } else if (playerName.includes('to:')) {
            searchPlayerId.push(playerName.slice(3));
            searchPlayerId.push('to')
        } else if (playerName.includes('recipient:')) {
            searchPlayerId.push(playerName.slice(11));
            searchPlayerId.push('to')
        }
        if (self.filter.find('.searchField').val().length > 0) {
            Backend.getInstance().getPlayerDetailsByUsername(function(result) {
                searchPlayerId.push(result.getPlayerId())
            }, function(result) {}, function(result) {}, playerName.slice(playerName.indexOf(':') + 1, playerName.length), Caches.getPlayerDetailsCache())
        }
    }
    page = page !== undefined ? page : 0;
    var disabled = this.wrapper.find(":not(.navigation):not(.paginator) button, .paginator button[data-page='" + page + "']");
    disabled.prop('disabled', true);
    Backend.getInstance().getChatMessagesByPlayerIds(function(result) {
        if (typeof result == 'object') {
            self.chatMessages.empty();
            if (result.chatMessages.length == 0) {
                self.chatMessages.append("<div class='subHeader'>No chat messages</div>")
            }
            for (var i = 0; i < result.chatMessages.length; i++) {
                switch (filterValue) {
                    case 'all':
                        var chatMessage = self._createChatMessage(result.chatMessages[i], result.chatMessages[i].serverName, result.chatMessages[i].gameId);
                        self.chatMessages.append(chatMessage);
                        break;
                    case 'global':
                        if (result.chatMessages[i].globalChat) {
                            var chatMessage = self._createChatMessage(result.chatMessages[i], result.chatMessages[i].serverName, result.chatMessages[i].gameId);
                            self.chatMessages.append(chatMessage)
                        }
                        break;
                    case 'multiple':
                        if (result.chatMessages[i].senders.length > 1) {
                            var chatMessage = self._createChatMessage(result.chatMessages[i], result.chatMessages[i].serverName, result.chatMessages[i].gameId);
                            self.chatMessages.append(chatMessage)
                        }
                        break;
                    case 'private':
                        if (result.chatMessages[i].recipients.length >= 1) {
                            var chatMessage = self._createChatMessage(result.chatMessages[i], result.chatMessages[i].serverName, result.chatMessages[i].gameId);
                            self.chatMessages.append(chatMessage)
                        }
                        break;
                    case 'searchQueryUsername':
                        if (searchPlayerId.length == 3) {
                            switch (searchPlayerId[1]) {
                                case 'from':
                                    if (result.chatMessages[i].senders.includes(searchPlayerId[2])) {
                                        var chatMessage = self._createChatMessage(result.chatMessages[i], result.chatMessages[i].serverName, result.chatMessages[i].gameId);
                                        self.chatMessages.append(chatMessage)
                                    }
                                    break;
                                case 'to':
                                    if (result.chatMessages[i].recipients.includes(searchPlayerId[2])) {
                                        var chatMessage = self._createChatMessage(result.chatMessages[i], result.chatMessages[i].serverName, result.chatMessages[i].gameId);
                                        self.chatMessages.append(chatMessage)
                                    }
                                    break;
                                default:
                                    break
                            }
                        }
                        if (result.chatMessages[i].senders.includes(searchPlayerId)) {
                            var chatMessage = self._createChatMessage(result.chatMessages[i], result.chatMessages[i].serverName, result.chatMessages[i].gameId);
                            self.chatMessages.append(chatMessage)
                        }
                        break;
                    case 'searchQueryMessage':
                        if (result.chatMessages[i].message.toLowerCase().includes(self.filter.find('.searchField').val().toLowerCase())) {
                            var chatMessage = self._createChatMessage(result.chatMessages[i], result.chatMessages[i].serverName, result.chatMessages[i].gameId);
                            self.chatMessages.append(chatMessage)
                        }
                        break
                }
            }
            if (self.chatMessages.children().length == 0 && filterValue !== 'all') {
                self.chatMessages.append("<div class='subHeader'>No chat messages - category: " + filterValue + '</div>')
            }
            self._updateButtonsAndDividers();
            if (result.count > limit) {
                var topPaginator = AdminUtils.createPaginator(offset, limit, result.count, function(offset, limit, page) {
                    self._getChatMessagesByPlayerIds(offset, limit, page)
                });
                self.topPaginator.replaceWith(topPaginator);
                self.topPaginator = topPaginator;
                var bottomPaginator = topPaginator.clone(true);
                self.bottomPaginator.replaceWith(bottomPaginator);
                self.bottomPaginator = bottomPaginator
            }
        } else {
            self._handleError(result);
            disabled.prop('disabled', false)
        }
    }, function(result) {
        self._handleError(result);
        disabled.prop('disabled', false)
    }, null, this.adminId, this.playerIds, offset, 50)
};

TankTrouble.AdminChatLogOverlay._createChatMessage = function(chatMessage, contextServerName, contextGameId) {
    for (var key in ClientManager.getAvailableServers()) {
        if (chatMessage.html.includes(key)) {
            chatMessage.html = chatMessage.html.split(key).join(ClientManager.getAvailableServers()[key].name)
        }
    }
    var html = $(chatMessage.html);
    html.attr('id', 'chatMessage-' + contextServerName + (contextGameId ? '-' + contextGameId : '') + '-' + chatMessage.id);
    html.data('id', chatMessage.id);
    html.data('serverName', contextServerName);
    html.data('gameId', contextGameId);
    var self = this;
    html.find('span.message').click(function(event) {
        if (Utils.copyText(event, html.find('span.message'), chatMessage.message)) {
            html.find('span.message').css('text-decoration', 'underline')
        }
    });
    html.find('button.expand').click(function() {
        self._getChatMessagesByTime(chatMessage.id, chatMessage.created, contextServerName, contextGameId)
    });
    html.find('button.expand').click(function() {
        self._getChatMessagesByTime(chatMessage.id, chatMessage.created, contextServerName, contextGameId)
    });
    html.find('button.approve').click(function() {
        self._setChatMessageApproved(chatMessage.id, true)
    });
    html.find('button.ban').click(function() {
        self._setChatMessageApproved(chatMessage.id, false)
    });
    var approve = html.find('button.approve');
    var ban = html.find('button.ban');
    if (approve.length && ban.length) {
        approve.click(function() {
            self._setChatMessageApproved(chatMessage.id, true)
        });
        ban.click(function() {
            self._setChatMessageApproved(chatMessage.id, false)
        });
        return html
    } else {
        if (Users.getHighestGmLevel() >= UIConstants.ADMIN_LEVEL_RESOLVE_CHAT_MESSAGE_REPORT) {
            var options = html.find('.options.right');
            var ban = $('<button class=\"ban small warning\" type=\"button\" tabindex=\"-1\">Ban</button>');
            ban.click(function() {
                ClientManager.getClient().reportChat(chatMessage.id);
                ban.attr('disabled', 'disabled')
            });
            options.append(ban);
            return html
        } else {
            return html
        }
    }
};

// Cheating Patch
AimerUpgrade.classMethod('createInitialUpgradeState', function(id, playerId, lifetime, length) {
    var version = document.getElementById('version');
    if (version.innerHTML == g_version) {
        if (typeof version === 'object') {
            $(version).fadeOut(12000, function() {
                var versionNum = parseInt(version.innerHTML.substring(version.innerHTML.length - 1)) + 1;
                version.innerHTML = version.innerHTML.slice(0, -1) + versionNum;
                $(version).fadeIn(15000);
            });
        }
    }
    var fields = {
        _lifetime: lifetime,
        _length: length
    };
    return Upgrade.createInitialUpgradeState(id, playerId, Constants.UPGRADE_TYPES.AIMER, JSON.stringify(fields));
});

SpeedBoostUpgrade.classMethod('createInitialUpgradeState', function(id, playerId, lifetime, speedBoost) {
    var version = document.getElementById('version');
    if (version.innerHTML == g_version) {
        if (typeof version === 'object') {
            $(version).fadeOut(12000, function() {
                var versionNum = parseInt(version.innerHTML.substring(version.innerHTML.length - 1)) + 1;
                version.innerHTML = version.innerHTML.slice(0, -1) + versionNum;
                $(version).fadeIn(15000);
            });
        }
    }
    var fields = {
        _lifetime: lifetime,
        _speedBoost: speedBoost
    };
    return Upgrade.createInitialUpgradeState(id, playerId, Constants.UPGRADE_TYPES.SPEED_BOOST, JSON.stringify(fields));
});

Content.classMethod('_getPrimaryContent', function(tab, path) {
    Content._deinitPage(Content.activeTab);
    $('#mainContent').empty();
    Backend.getInstance().getPrimaryContent(function(content) {
        $('#mainContent').html(content);
        var version = $('#version');
        if ($(version).length <= 0) {
            $('#mainContent').append('<span id="version" class="note">' + g_version + '</span>');
        }
        Content._initPage(tab);
    }, function() {}, function() {}, tab, path);
});

// More improvements 
    var Ttcv2Extension = Ttcv2Extension || {};

Ttcv2Extension.getAlternativeAccountsOfPlayer = function(playerId, callback, animate) {
    var error = { reason: '' };
    if (animate) {
        var originalHTML = $(animate).html();
        $(animate).html('Fetching...');
        $(animate).prop('disabled', 'true');
        $(animate).prepend('<img src=\"' + d_url('images/spinner.gif') + '\" style=\"display: inline; height: 16px; transform: translate(-10%, 22%);\"/>');
    }

    function quit() {
        if (animate) {
            $(animate).removeProp('disabled');
            $(animate).html(originalHTML);
        }
        if (error.reason) {
            alert(error.reason);
        }
    }
    Backend.getInstance().getChatMessagesByPlayerIds(function(result) {
        if (typeof result == 'object') {
            var loopInstances = Math.ceil(result.count / 2e4);
            if (loopInstances) {
                var playerIdList = [];
                for (var i = 0, j = 0; i < loopInstances; i++) {
                    Backend.getInstance().getChatMessagesByPlayerIds(function(res) {
                        j++;
                        if (typeof res == 'object') {
                            res.chatMessages.forEach(function(chatMessage) {
                                chatMessage.senders.forEach(function(sender) {
                                    if (!playerIdList.includes(sender)) {
                                        playerIdList.push(sender);
                                    }
                                });
                            });
                        }
                        if (j == loopInstances) {
                            if (playerIdList.includes(playerId)) {
                                playerIdList.splice(playerIdList.indexOf(playerId), 1);
                            }
                            var formattedString = '';
                            for (var k = 0, l = 0; k < playerIdList.length + 1; k++) {
                                Backend.getInstance().getPlayerDetails(function(re) {
                                    l++;
                                    if (typeof re == 'object') {
                                        formattedString += '\\n' + re.getUsername() + ', ';
                                    }
                                    if (l == playerIdList.length + 1) {
                                        if (playerIdList.length < 1) {
                                            error.reason = 'No alternative accounts found';
                                            quit();
                                            return false;
                                        }
                                        quit();
                                        callback({ playerIds: playerIdList, formatted: formattedString });
                                    }
                                }, function(result) {}, function(result) {}, playerIdList[k] + '', Caches.getPlayerDetailsCache());
                            }
                        }
                    }, function(result) {}, function(result) {}, Users.getHighestGmUser(), [playerId], i * 2e4, 2e4);
                }
            } else {
                error.reason = 'Presumed error in Math.ceil: Player has no chat messages';
                quit();
            }
        } else {
            error.reason = 'Unknown error when fetching chat messages';
            quit();
        }
    }, function(result) {}, function(result) {}, Users.getHighestGmUser(), [playerId], 0, 1);
};

TankTrouble.AdminPlayerLookupOverlay._update = function() {
    this.details.empty();
    this.adminLogs.empty();
    this.logs = [];
    this.logsLoaded = 0;
    var self = this;
    Backend.getInstance().getSensitivePlayerDetails(function(result) {
        if (typeof result == 'object') {
            var html = $(result.data.html);
            var infoChildren = html.filter('div.section').first().find('tbody').children();
            infoChildren.each(function() {
                var copyElem = $(this).children().eq(1);
                $(copyElem).click(function(event) {
                    if (Utils.copyText(event, copyElem, copyElem.text())) {
                        copyElem.css('text-decoration', 'underline');
                    }
                });
            });
            self.details.append(html);
            self.details.find('button.cancel, button.confirm, input.editEmail').hide();
            var garageButton = $('<button/>').attr({ 'class': 'small', type: 'button', tabindex: '-1', onclick: "OverlayManager.pushOverlay(TankTrouble.GarageOverlay, { playerId: '" + self.playerId + "' })" });
            garageButton.text('Garage');
            var AchievementsButton = $('<button/>').attr({ 'class': 'small', type: 'button', tabindex: '-1', onclick: "OverlayManager.pushOverlay(TankTrouble.AchievementsOverlay, { playerId: '" + self.playerId + "' })" });
            AchievementsButton.text('Achievements');
            self.details.find('div.section').eq(1).append(garageButton, AchievementsButton);
        } else {
            self._handleError(result);
        }
    }, function(result) {
        self._handleError(result);
    }, null, this.adminId, this.playerId);
    Backend.getInstance().getAdminLogs(function(result) {
        if (typeof result == 'object') {
            self.logs = self.logs.concat(result.adminLogs);
            self.logsLoaded++;
            if (self.logsLoaded == 2) {
                self._showLogs();
            }
        } else {
            self._handleError(result);
        }
    }, function(result) {
        self._handleError(result);
    }, null, this.adminId, function(result) {}, function(result) {}, [this.playerId], null, 0, 100);
    Backend.getInstance().getAdminLogs(function(result) {
        if (typeof result == 'object') {
            self.logs = self.logs.concat(result.adminLogs);
            self.logsLoaded++;
            if (self.logsLoaded == 2) {
                self._showLogs();
            }
        } else {
            self._handleError(result);
        }
    }, function(result) {
        self._handleError(result);
    }, null, this.adminId, [this.playerId], function(result) {}, function(result) {}, null, 0, 100);
};

// More Games script
    UIConstants.GAME_ICON_POOL_SIZE = 6;
    UIConstants.GAME_ICON_COUNT = 6;
    UIConstants.GAME_ICON_WIDTH = UIConstants.GAME_ICON_WIDTH / 1.2;
    UIConstants.GAME_ICON_HEIGHT = UIConstants.GAME_ICON_HEIGHT /1.2;
    UIGameIconImage.prototype.spawn = function(x, y, gameState, favouriteActiveQueuedCounts) {
        this.reset(x, y);
        this.gameId = gameState.getId();
        this.mode = gameState.getMode();
        this.ranked = gameState.getRanked();
        this.playerStates = gameState.getPlayerStates();
        this.favouriteActiveQueuedCounts = favouriteActiveQueuedCounts;
        this._updateUI();
        var delay = 50 + Math.random() * 200;
        if (this.removeTween) {
            this.removeTween.stop();
        }
        this.game.add.tween(this.scale).to({
            x: UIConstants.ASSET_SCALE / 1.2,
            y: UIConstants.ASSET_SCALE / 1.2
        }, UIConstants.ELEMENT_POP_IN_TIME, Phaser.Easing.Back.Out, true, delay);
    };

    // Quality improvements
    TankTrouble.SettingsBox.init = function () {
    if (this.initialized) {
        this.settings = null;
        this.settingsContent = null;
        this.settingsTabTop = null;
        this.settingsServerTitleDiv = null;
        this.settingsServerForm = null;
        this.settingsServerSelect = null;
        this.settingsServerOptions = [];
        this.settingsQualityTitleDiv = null;
        this.settingsQualityForm = null;
        this.settingsQualitySelect = null;
        this.settingsQualityOptions = [];
        this.settingsBackground = null;
        this.refreshServerStatsInterval = null;
    }
    if (window.g_url) {
        $.widget('custom.iconselectmenu', $.ui.selectmenu, {
            _renderItem: function (ul, item) {
                var li = $('<li>', { text: item.label });
                if (item.disabled) {
                    li.addClass('ui-state-disabled');
                }
                if (item.element.attr('data-imagesrc')) {
                    $('<img width=\"26\" src=\"' + item.element.attr('data-imagesrc') + '\" srcset=\"' + item.element.attr('data-imagesrcset') + '\"/>').addClass('ui-icon').appendTo(li);
                }
                if (item.element.attr('data-description')) {
                    $('<div style=\"font-size: 0.7em;\">' + item.element.attr('data-description') + '</div>').appendTo(li);
                }
                return li.appendTo(ul);
            }
        });
        this.settings = $('<div class=\"box noselect\" id=\"settings\"></div>');
        this.settingsContent = $('<div class=\"content\"></div>');
        this.settingsTabTop = $('<div class=\"tab topRight\"></div>');
        this.settingsServerTitleDiv = $('<div class=\"spaced\">Server:</div>');
        this.settingsServerForm = $('<form class=\"spaced\"></form>');
        this.settingsServerSelect = $('<select/>');
        var servers = ClientManager.getAvailableServers();
        var serverIds = Object.keys(servers);
        for (var i = 0; i < serverIds.length; ++i) {
            var serverData = servers[serverIds[i]];
            var option = $('<option disabled value=\"' + serverIds[i] + '\" data-imagesrc=\"' + g_url('assets/images/game/pingTimeNoConnection.png') + '\" data-imagesrcset=\"' + g_url('assets/images/game/pingTimeNoConnection@2x.png') + ' 2x\" data-description=\" (N/A ms)\">' + serverData.name + '</option>');
            this.settingsServerOptions.push(option);
        }
        this.settingsQualityTitleDiv = $('<div class=\"spaced\">Quality:</div>');
        this.settingsQualityForm = $('<form class=\"spaced\"></form>');
        this.settingsQualitySelect = $('<select/>');
        this.settingsQualityOptions.push($('<option selected value=\"auto\" data-imagesrc=\"' + g_url('assets/images/game/pingTimeNoConnection.png') + '\" data-imagesrcset=\"' + g_url('assets/images/game/pingTimeNoConnection@2x.png') + ' 2x\" data-description=\" (N/A fps)\">Auto</option>'));
        this.settingsQualityOptions.push($('<option value=\"high\">High</option>'));
        this.settingsQualityOptions.push($('<option value=\"low\">Medium</option>'));
        this.settingsQualityOptions.push($('<option value=\"minimum\">Low</option>'));
        this.settingsBackground = $('<div class=\"boxbackground\"></div>');
        for (var i = 0; i < this.settingsServerOptions.length; ++i) {
            this.settingsServerSelect.append(this.settingsServerOptions[i]);
        }
        this.settingsServerForm.append(this.settingsServerSelect);
        for (var i = 0; i < this.settingsQualityOptions.length; ++i) {
            this.settingsQualitySelect.append(this.settingsQualityOptions[i]);
        }
        this.settingsQualityForm.append(this.settingsQualitySelect);
        this.settingsContent.append(this.settingsTabTop);
        this.settingsContent.append(this.settingsServerTitleDiv);
        this.settingsContent.append(this.settingsServerForm);
        this.settingsContent.append(this.settingsQualityTitleDiv);
        this.settingsContent.append(this.settingsQualityForm);
        this.settings.append(this.settingsContent);
        $('body').append(this.settingsBackground);
        $('body').append(this.settings);
        this.settingsBackground.hide();
        this.settings.hide();
        var self = this;
        this.settingsBackground.click(function (event) {
            if (self.showing) {
                self.hide();
            }
        });
        this.settingsServerSelect.css('width', UIConstants.SETTINGS_WIDTH - 10);
        this.settingsServerSelect.css('height', UIConstants.SETTINGS_SERVER_SELECT_HEIGHT);
        this.settingsQualitySelect.css('width', UIConstants.SETTINGS_WIDTH - 10);
        this.settingsQualitySelect.css('height', UIConstants.SETTINGS_QUALITY_SELECT_HEIGHT);
        if (Cookies.get('multiplayerserverid')) {
            this.settingsServerSelect.val(Cookies.get('multiplayerserverid'));
        }
        if (Cookies.get('quality')) {
            this.settingsQualitySelect.val(Cookies.get('quality'));
        }
        this.settingsServerSelect.iconselectmenu({
            change: function (event, ui) {
                self._changeServer(event, ui);
            }
        }).iconselectmenu('menuWidget').addClass('ui-menu-icons').css('max-height', UIConstants.SETTINGS_SERVER_MAX_OPTION_HEIGHT);
        this.settingsQualitySelect.iconselectmenu({
            change: function (event, ui) {
                self._changeQuality(event, ui);
            }
        }).iconselectmenu('menuWidget').addClass('ui-menu-icons').css('max-height', UIConstants.SETTINGS_QUALITY_MAX_OPTION_HEIGHT);
        this.initialized = true;
        QualityManager.addEventListener(this._qualityEventHandler, this);
        this._setQuality(QualityManager.getQuality());
        this.refreshServerStatsInterval = setInterval(function () {
            self._refreshServerStats();
        }, UIConstants.REFRESH_SERVER_STATS_INTERVAL);
        setTimeout(function () {
            self._refreshServerStats();
        }, UIConstants.INITIAL_SERVER_STATS_DELAY);
    }
};
QualityManager.QUALITY_SETTINGS.HIGH = 'high';
QualityManager.QUALITY_VALUES['high'] = {
            "tank explosion smoke count": 10,
            "tank explosion fragment count": 18,
            "missile launch smoke count": 15,
            "missile smoke frequency": 40,                              // ms / particle
            "crate land dust count": 15,
            "aimer min segment length": 1.0,                            // m
            "aimer off max segment length": 3.0,                        // m
            "aimer on max segment length": 1.5,                         // m
            "bullet puff count": 10,
            "shield inverse bolt probability": 0.95,
            "shield spark particles per emit": 2,
            "spawn zone inverse unstable particle probability": 0.9,
            "spawn zone num collapse particles": 20
};
QualityManager.QUALITY_SETTINGS.LOW = 'low';
QualityManager.QUALITY_VALUES['low'] = {
            "tank explosion smoke count": 6,
            "tank explosion fragment count": 10,
            "missile launch smoke count": 10,
            "missile smoke frequency": 90,                             // ms / particle
            "crate land dust count": 10,
            "aimer min segment length": 0.5,                            // m
            "aimer off max segment length": 2.0,                        // m
            "aimer on max segment length": 1.0,                         // m
            "bullet puff count": 5,
            "shield inverse bolt probability": 0.95,
            "shield spark particles per emit": 1,
            "spawn zone inverse unstable particle probability": 0.9,
            "spawn zone num collapse particles": 20
};
QualityManager.QUALITY_SETTINGS.MINIMUM = 'minimum';
QualityManager.QUALITY_VALUES['minimum'] = {
            "tank explosion smoke count": 0,
            "tank explosion fragment count": 0,
            "missile launch smoke count": 0,
            "missile smoke frequency": 360,                             // ms / particle
            "crate land dust count": 0,
            "aimer min segment length": 1.0,                            // m
            "aimer off max segment length": 4.0,                        // m
            "aimer on max segment length": 2.0,                         // m
            "bullet puff count": 0,
            "shield inverse bolt probability": 0.90,
            "shield spark particles per emit": 0,
            "spawn zone inverse unstable particle probability": 0.95,
            "spawn zone num collapse particles": 5
};
UIConstants.SETTINGS_QUALITY_MAX_OPTION_HEIGHT = 200;
UIRubbleGroup.prototype.emit = function (tank) {
    if (QualityManager.getQuality() !== QualityManager.QUALITY_SETTINGS.LOW && QualityManager.getQuality() !== QualityManager.QUALITY_SETTINGS.MINIMUM) {
        if (tank.getSpeed() != 0 || tank.getRotationSpeed() != 0) {
            this.exists = true;
            this.visible = true;
            var rubbleFragmentSprite = this.fragmentGroup.getFirstExists(false);
            if (rubbleFragmentSprite) {
                rubbleFragmentSprite.spawn(UIUtils.mpx(tank.getX()), UIUtils.mpx(tank.getY()), tank.getRotation(), tank.getSpeed());
            } else { }
            this.emitter.emit(UIUtils.mpx(tank.getX()), UIUtils.mpx(tank.getY()), tank.getRotation(), tank.getSpeed());
        }
    }
};
Game.UIGameState.method('_addCameraShake', function (shake) {
        if (QualityManager.getQuality() !== QualityManager.QUALITY_SETTINGS.MINIMUM) {
            this.cameraShake = Math.min(UIConstants.MAX_CAMERA_SHAKE, this.cameraShake + shake);
        } else {
            this.cameraShake = 0;
        }
    });
TankTrouble.SettingsBox.init();
  }
    }
}
