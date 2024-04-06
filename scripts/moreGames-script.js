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
    UIConstants.GAME_ICON_WIDTH = UIConstants.GAME_ICON_WIDTH / 2.4;
    UIConstants.GAME_ICON_HEIGHT = UIConstants.GAME_ICON_HEIGHT / 2.4;
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
            x: UIConstants.ASSET_SCALE / 2.4,
            y: UIConstants.ASSET_SCALE / 2.4
        }, UIConstants.ELEMENT_POP_IN_TIME, Phaser.Easing.Back.Out, true, delay);
    };
  }
