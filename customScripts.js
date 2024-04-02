// TODO: Admin Improvements and Admin Statistics
// TODO: TankInfo Improvements and AccountInfo Improvements

if (window.location.hostname.includes("tanktrouble.com")) {
    // Injection
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
    // Up to 6 Games script
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
