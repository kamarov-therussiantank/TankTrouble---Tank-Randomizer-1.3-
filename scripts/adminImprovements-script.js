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
        $(animate).prepend('<img src=\"' + d_url('ttaddons/favicon/spinner.gif') + '\" style=\"display: inline; height: 16px; transform: translate(-10%, 22%);\"/>');
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
            var AltAccountsButton = $('<button/>').attr({ 'class': 'small', type: 'button', tabindex: '-1', onclick: "TankTroubleAddons.getAlternativeAccountsOfPlayer('" + self.playerId + "', function(result){TankTrouble.InfoBox.show({message:result.formatted,title:'Alternative accounts',style:'#info div.spaced{user-select:all}#info{z-index:9999}',submit:'Done',submitFunction:function(){}});}, this)" });
            AltAccountsButton.text('Alt accounts');
            self.details.find('div.section').eq(1).append(garageButton, AchievementsButton, AltAccountsButton);
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

    /**
 * Prepend admin details to username
 * @param usernameParts Transformable array for the username
 * @param playerDetails Player details
 * @returns Mutated username parts
 */
const maskUsernameByAdminState = (usernameParts, playerDetails) => {
    const adminState = getAdminState(playerDetails);

    if (adminState === 1) {
        const accessoryImg = document.createElement('img');
        const isHighResolution = window.devicePixelRatio > 1;
        
        // Set the image source based on resolution
        accessoryImg.src = isHighResolution ? 'scripts/accessory/badge1-140.png' : 'scripts/accessory/badge1-140@2x.png';
        accessoryImg.src = isHighResolution ? 'scripts/accessory/badge1-200.png' : 'scripts/accessory/badge1-200@2x.png';
        accessoryImg.src = isHighResolution ? 'scripts/accessory/badge1-320.png' : 'scripts/accessory/badge1-320@2x.png';
    
        // Prepend the usernameParts
        usernameParts.unshift(accessoryImg);
        
        // Prepend the admin level to usernameParts
        usernameParts.unshift(`(GM${ playerDetails.getGmLevel() }) `);
    } else if (adminState === -1) {
        usernameParts.unshift('(Retd.) ');
    }

    return usernameParts;
};
    
}
