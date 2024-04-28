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
    
    // More Games script
    UIConstants.GAME_ICON_POOL_SIZE = 6;
    UIConstants.GAME_ICON_COUNT = 6;
    UIConstants.GAME_ICON_WIDTH = UIConstants.GAME_ICON_WIDTH / 1.7;
    UIConstants.GAME_ICON_HEIGHT = UIConstants.GAME_ICON_HEIGHT /1.7;
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
            x: UIConstants.ASSET_SCALE / 1.7,
            y: UIConstants.ASSET_SCALE / 1.7
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
        this.settingsQualityOptions.push($('<option value=\"medium\">Medium</option>'));
        this.settingsQualityOptions.push($('<option value=\"low\">Low</option>'));
        this.settingsQualityOptions.push($('<option value=\"minimum\">Minimum</option>'));
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
    'tank explosion smoke count': 9,
    'tank explosion fragment count': 24,
    'missile launch smoke count': 15,
    'missile smoke frequency': 20,
    'crate land dust count': 15,
    'aimer min segment length': 1,
    'aimer off max segment length': 2,
    'aimer on max segment length': 1,
    'bullet puff count': 5,
    'shield inverse bolt probability': 0.90,
    'shield spark particles per emit': 2,
    'spawn zone inverse unstable particle probability': 0.7,
    'spawn zone num collapse particles': 20
};
QualityManager.QUALITY_SETTINGS.MEDIUM = 'medium';
QualityManager.QUALITY_VALUES['medium'] = {
    "tank explosion smoke count": 6,
            "tank explosion fragment count": 12,
            "missile launch smoke count": 10,
            "missile smoke frequency": 40,                             // ms / particle
            "crate land dust count": 10,
            "aimer min segment length": 1,                            // m
            "aimer off max segment length": 3,                        // m
            "aimer on max segment length": 1,                         // m
            "bullet puff count": 3,
            "shield inverse bolt probability": 0.95,
            "shield spark particles per emit": 1,
            "spawn zone inverse unstable particle probability": 0.9,
            "spawn zone num collapse particles": 20
};
QualityManager.QUALITY_SETTINGS.LOW = 'low';
QualityManager.QUALITY_VALUES['low'] = {
            "tank explosion smoke count": 3,
            "tank explosion fragment count": 6,
            "missile launch smoke count": 10,
            "missile smoke frequency": 120,                             // ms / particle
            "crate land dust count": 10,
            "aimer min segment length": 0.5,                            // m
            "aimer off max segment length": 2.0,                        // m
            "aimer on max segment length": 1.0,                         // m
            "bullet puff count": 4,
            "shield inverse bolt probability": 0.99,
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
            "shield inverse bolt probability": 0.99,
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
