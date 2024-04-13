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
    
//Improvements 
TankTrouble.AccountOverlay._initialize = function() {
    this.accountWrapper = $('<div class=\"account centre\"/>');
    this.accountIcon = $('<canvas class=\"icon\" style=\"width: 320px; height: 192px;\"></canvas>');
    this.iconCanvas = this.accountIcon[0];
    this.accountIconPlaceholder = $('<img class=\"icon\" src=\"' + g_url('assets/images/tankIcon/placeholder-320.png') + '\" srcset=\"' + g_url('assets/images/tankIcon/placeholder-320@2x.png') + ' 2x\"/>');
    this.accountHeadline = $('<div class=\"headline\">Account info</div>');
    this.creationDate = $('<tr></tr>');
    this.loginDate = $('<tr></tr>');
    this.suicides = $('<tr></tr>');
    this.accountPlayerId = $('<tr></tr>');
    this.accountForm = $('<form></form>');
    this.accountUsernameInput = $('<input class=\"username\" placeholder=\"Username\" type=\"text\" name=\"username\" autocomplete=\"username\" maxlength=\"32\"/>');
    this.accountUsernameChangeMessage = $('<div class=\"messageSpacingBottom\"><span class=\"price\">250<img class=\"currencyIcon\" src=\"' + g_url('assets/images/virtualShop/diamond.png') + '\" srcset=\"' + g_url('assets/images/virtualShop/diamond@2x.png') + ' 2x\"/></span><span class=\"big\"> to change username</span></div>');
    this.accountNewPasswordInput = $('<input placeholder=\"New password\" name=\"password\" type=\"password\" autocomplete=\"new-password\" maxlength=\"32\"/>');
    this.accountConfirmNewPasswordInput = $('<input placeholder=\"Confirm new password\" name=\"confirmpassword\" type=\"password\" autocomplete=\"new-password\" maxlength=\"32\"/>');
    this.accountEmailInput = $('<input placeholder=\"Email\" name=\"email\" type=\"text\" autocomplete=\"email\" maxlength=\"128\"/>');
    this.accountVerificationEmailMessage = $('<div class=\"messageSpacingBottom\"></div>');
    this.accountResendVerificationEmail = $('<button class=\"small\" type=\"button\" tabindex=\"-1\" title=\"Resend verification email\">Verify</button>');
    this.accountPasswordInput = $('<input placeholder=\"Current password\" name=\"password\" type=\"password\" maxlength=\"32\"/>');
    this.accountSubmitInput = $('<button class=\"medium\" type=\"submit\" tabindex=\"-1\">Update account</button>');
    this.accountDeleteAccount = $('<button class=\"small warning\" type=\"button\" tabindex=\"-1\" title=\"Delete account\">Delete</button>');

    this.accountUsernameInput.alphanum({
        allow: '-_',
        allowSpace: false,
        allowOtherCharSets: false,
        maxLength: 32
    });
    this.accountEmailInput.alphanum({
        allow: '_+-&*%@.',
        allowSpace: false,
        allowOtherCharSets: false,
        maxLength: 128
    });

    this.accountForm.append(this.accountHeadline);
    Utils.addOverlayFormRow(this.accountForm, [this.loginDate, this.creationDate, this.suicides, this.accountPlayerId]);
    Utils.addOverlayFormRow(this.accountForm, this.accountUsernameInput);
    this.accountForm.append(this.accountUsernameChangeMessage);
    Utils.addOverlayFormRow(this.accountForm, this.accountNewPasswordInput);
    Utils.addOverlayFormRow(this.accountForm, this.accountConfirmNewPasswordInput);
    Utils.addSuffix(Utils.addOverlayFormRow(this.accountForm, this.accountEmailInput), this.accountResendVerificationEmail, true);
    this.accountForm.append(this.accountVerificationEmailMessage);
    Utils.addOverlayFormRow(this.accountForm, this.accountPasswordInput);
    Utils.addSuffix(Utils.addOverlayFormRow(this.accountForm, this.accountSubmitInput), this.accountDeleteAccount, true);

    this.accountWrapper.append(this.accountIcon);
    this.accountWrapper.append(this.accountIconPlaceholder);
    this.accountWrapper.append(this.accountForm);

    this.accountUsernameInput.tooltipster({
        position: 'right',
        theme: 'tooltipster-error',
        offsetX: 5
    });
    this.accountNewPasswordInput.tooltipster({
        position: 'right',
        theme: 'tooltipster-error',
        offsetX: 5
    });
    this.accountConfirmNewPasswordInput.tooltipster({
        position: 'right',
        theme: 'tooltipster-error',
        offsetX: 5
    });
    this.accountEmailInput.tooltipster({
        position: 'right',
        theme: 'tooltipster-error',
        offsetX: 5
    });
    this.accountResendVerificationEmail.tooltipster({
        position: 'right',
        offsetX: 5
    });
    this.accountPasswordInput.tooltipster({
        position: 'right',
        theme: 'tooltipster-error',
        offsetX: 5
    });
    this.accountDeleteAccount.tooltipster({
        position: 'right',
        theme: 'tooltipster-error',
        offsetX: 5
    });

    var self = this;
    this.accountForm.submit(function(event) {
        self._sendAccountUpdate();
        return false;
    });

    this.accountUsernameInput.blur(function(event) {
        self._checkUsername();
    });
    this.accountUsernameInput.keydown(function(event) {
        return self._checkKeyDown(event, self.accountNewPasswordInput);
    });
    this.accountNewPasswordInput.blur(function(event) {
        self._checkPasswords();
    });
    this.accountNewPasswordInput.keydown(function(event) {
        return self._checkKeyDown(event, self.accountConfirmNewPasswordInput);
    });
    this.accountConfirmNewPasswordInput.blur(function(event) {
        self._checkPasswords();
    });
    this.accountConfirmNewPasswordInput.keydown(function(event) {
        return self._checkKeyDown(event, self.accountEmailInput);
    });
    this.accountEmailInput.blur(function(event) {
        self._checkEmail();
    });
    this.accountEmailInput.keydown(function(event) {
        return self._checkKeyDown(event, self.accountPasswordInput);
    });
    this.accountResendVerificationEmail.click(function(event) {
        TankTrouble.Ajax.resendVerificationEmail(function(response) {
            if (response.result.result) {
                self.accountResendVerificationEmail.hide();
                self._updateVerificationEmailMessage('We have sent you an email with verification instructions');
            } else {
                self._updateVerificationEmailMessage(response.result.message);
            }
        }, function(response) {}, function(response) {}, self.playerId);
    });
    this.accountPasswordInput.blur(function(event) {
        self.accountPasswordInput.removeClass('inputRejected');
        self._updateTooltip(self.accountPasswordInput, '');
    });
    this.accountPasswordInput.keydown(function(event) {
        return self._checkKeyDown(event, null);
    });
    this.accountDeleteAccount.click(function(event) {
        OverlayManager.pushOverlay(TankTrouble.DeleteAccountOverlay, {
            playerId: self.playerId
        });
    });
    this.accountUsernameInput.focus(function(event) {
        $(this).select();
        $(this).tooltipster('show');
    });
    this.accountNewPasswordInput.focus(function(event) {
        $(this).select();
        $(this).tooltipster('show');
    });
    this.accountConfirmNewPasswordInput.focus(function(event) {
        $(this).select();
        $(this).tooltipster('show');
    });
    this.accountEmailInput.focus(function(event) {
        $(this).select();
        $(this).tooltipster('show');
    });
    this.accountPasswordInput.focus(function(event) {
        $(this).select();
        $(this).tooltipster('show');
    });

    this.iconCanvas.width = UIConstants.TANK_ICON_WIDTH_LARGE;
    this.iconCanvas.height = UIConstants.TANK_ICON_HEIGHT_LARGE;

    this.initialized = true;
};

TankTrouble.AccountOverlay.show = function(params) {
    if (!this.initialized) {
        this._initialize();
    }
    this.playerId = params.playerId;
    this.playerDetails = null;
    this.email = null;
    this.showing = true;

    this.accountUsernameInput.val('');
    this.accountNewPasswordInput.val('');
    this.accountConfirmNewPasswordInput.val('');
    this.accountEmailInput.val('');
    this.accountPasswordInput.val('');
    this.accountWrapper.find('button').prop('disabled', false);
    this.accountUsernameChangeMessage.css({
        height: 0,
        opacity: 0
    });
    this.accountVerificationEmailMessage.html('<br>');
    this.accountResendVerificationEmail.hide();
    this.accountIconPlaceholder.show();
    this.accountIcon.hide();

    var self = this;
    Backend.getInstance().getPlayerDetails(function(result) {
        if (self.showing) {
            if (typeof result == 'object') {
                self.playerDetails = result;
                self.accountUsernameInput.val(result.getUsername());
                self.accountUsernameInput.addClass('inputAccepted');
                self.accountNewPasswordInput.focus();
                self.creationDate.append($('<td>Creation Date:</td>'));
                self.creationDate.append($('<td>' + new Date(self.playerDetails.getCreated() * 1e3).toLocaleString() + '</td>'));
                self.loginDate.append($('<td>Last Login:</td>'));
                self.loginDate.append($('<td>' + new Date(self.playerDetails.getLastLogin() * 1e3).toLocaleString() + '</td>'));
                self.suicides.append($('<td>Suicides:</td>'));
                self.suicides.append($('<td>' + self.playerDetails.getSuicides() + '</td>'));
                self.accountPlayerId.append($('<td>PlayerID:</td>'));
                self.accountPlayerId.append($('<td>' + self.playerDetails.getPlayerId() + '</td>'));

                var infoChildren = $(self.accountWrapper).find('tr');
                infoChildren.each(function() {
                    var copyElem = $(this).children().eq(1);
                    $(copyElem).click(function(event) {
                        if (Utils.copyText(event, copyElem, copyElem.text())) {
                            copyElem.css('text-decoration', 'underline');
                        }
                    });
                });

                if (self.email !== null) {
                    if (self.playerDetails.getVerified()) {
                        self.accountVerificationEmailMessage.text('Verified');
                    } else {
                        self.accountVerificationEmailMessage.text('Your email is not verified. Verify it to use the chat and forum');
                        self.accountResendVerificationEmail.show();
                    }
                } else {
                    self.accountVerificationEmailMessage.text('Your email is not set');
                }

                UITankIcon.loadPlayerTankIcon(self.iconCanvas, UIConstants.TANK_ICON_SIZES.LARGE, self.playerId, function(self) {
                    self.accountIconPlaceholder.hide();
                    self.iconCanvas.getContext('2d').clearRect(0, 0, self.iconCanvas.width, self.iconCanvas.height);
                    self.accountIcon.show();
                }, self);
            } else {
                TankTrouble.ErrorBox.show('Could not retrieve your information.<br/>Please try again.');
                OverlayManager.popOverlay(false, true);
            }
        }
    }, function(result) {
        self.accountUsernameInput.focus();
    }, function(result) {}, self.playerId, Caches.getPlayerDetailsCache());

    Backend.getInstance().getEmail(function(result) {
        if (self.showing) {
            if (typeof result == 'string') {
                self.email = result;
                if (self.playerDetails.getVerified()) {
                    self.accountVerificationEmailMessage.text('Verified');
                } else {
                    self.accountVerificationEmailMessage.text('Your email is not verified. Verify it to use the chat and forum');
                    self.accountResendVerificationEmail.show();
                }
                self.accountEmailInput.val(result);
                self.accountEmailInput.addClass('inputAccepted');
            } else if (result === null) {
                self.accountVerificationEmailMessage.text('Your email is not set');
            } else {
                TankTrouble.ErrorBox.show('Could not retrieve your information.<br/>Please try again.');
                OverlayManager.popOverlay(false, true);
            }
        }
    }, function(result) {}, function(result) {}, self.playerId, Caches.getEmailCache());
};

TankTrouble.AccountOverlay.hide = function() {
    if (!this.initialized) {
        this._initialize();
    }
    this.showing = false;
    this.accountUsernameInput.blur();
    this.accountNewPasswordInput.blur();
    this.accountConfirmNewPasswordInput.blur();
    this.accountEmailInput.blur();
    this.accountPasswordInput.blur();
    this.accountUsernameInput.removeClass('inputAccepted inputRejected');
    this.accountNewPasswordInput.removeClass('inputAccepted inputRejected');
    this.accountConfirmNewPasswordInput.removeClass('inputAccepted inputRejected');
    this.accountEmailInput.removeClass('inputAccepted inputRejected');
    this.accountPasswordInput.removeClass('inputAccepted inputRejected');
    Utils.updateTooltip(this.accountUsernameInput, '');
    Utils.updateTooltip(this.accountNewPasswordInput, '');
    Utils.updateTooltip(this.accountConfirmNewPasswordInput, '');
    Utils.updateTooltip(this.accountEmailInput, '');
    Utils.updateTooltip(this.accountPasswordInput, '');
    this.creationDate.empty();
    this.loginDate.empty();
    this.suicides.empty();
    this.accountPlayerId.empty();
};

// Improved tank icon render
{
    var Ttcv2Extension = Ttcv2Extension || {};

    // Function to check if high-resolution tanks are enabled
    Ttcv2Extension.isHighresTanksEnabled = function () {
        return true; // Always enabled
    };

    // Method to load player tank icon
    UITankIcon.classMethod('loadPlayerTankIcon', function (canvas, size, playerId, onReady, context) {
        Backend.getInstance().getPlayerDetails(function (result) {
            if (typeof result === 'object') {
                var adminStatus = Ttcv2Extension.getAdminStatus(result);
                var turretColour = result.getTurretColour();
                var treadColour = result.getTreadColour();
                var baseColour = result.getBaseColour();
                var turretAccessory = result.getTurretAccessory();
                var barrelAccessory = result.getBarrelAccessory();
                var frontAccessory = result.getFrontAccessory();
                var backAccessory = result.getBackAccessory();
                var badge = adminStatus === 'false' || Ttcv2Extension.isHighresTanksEnabled() ? '0' : adminStatus === 'active' ? '1' : '2';

                if (!turretColour || !treadColour || !baseColour || !turretAccessory || !barrelAccessory || !frontAccessory || !backAccessory || !badge) {
                    return;
                }

                if (onReady && context) {
                    UITankIcon.loadTankIcon(canvas, size, turretColour, treadColour, baseColour, turretAccessory, barrelAccessory, frontAccessory, backAccessory, null, null, badge, onReady, context);
                } else {
                    UITankIcon.loadTankIcon(canvas, size, turretColour, treadColour, baseColour, turretAccessory, barrelAccessory, frontAccessory, backAccessory, null, null, badge, function (self) {}, self);
                }
            } else {
                if (onReady && context) {
                    UITankIcon.loadTankIcon(canvas, size, UIConstants.TANK_UNAVAILABLE_COLOUR, UIConstants.TANK_UNAVAILABLE_COLOUR, UIConstants.TANK_UNAVAILABLE_COLOUR, null, null, null, null, null, null, null, onReady, context);
                } else {
                    UITankIcon.loadTankIcon(canvas, size, UIConstants.TANK_UNAVAILABLE_COLOUR, UIConstants.TANK_UNAVAILABLE_COLOUR, UIConstants.TANK_UNAVAILABLE_COLOUR, null, null, null, null, null, null, null, function (self) {}, self);
                }
            }
        }, function () {}, function () {}, playerId, Caches.getPlayerDetailsCache());
    });

    // Method to load tank icon
    UITankIcon.classMethod('loadTankIcon', function (canvas, size, turretColour, treadColour, baseColour, turretAccessory, barrelAccessory, frontAccessory, backAccessory, treadAccessory, backgroundAccessory, badge, onReady, context) {
        // Function logic to load tank icon
        var loader = UITankIconLoader.create(canvas, size);
        loader.queueColour(UIConstants.TANK_ICON_TINT_PARTS.TURRET, turretColour);
        loader.queueColour(UIConstants.TANK_ICON_TINT_PARTS.TREAD, treadColour);
        loader.queueColour(UIConstants.TANK_ICON_TINT_PARTS.BASE, baseColour);
        loader.queueAccessory(UIConstants.TANK_ICON_ACCESSORY_PARTS.TURRET, turretAccessory);
        loader.queueAccessory(UIConstants.TANK_ICON_ACCESSORY_PARTS.BARREL, barrelAccessory);
        loader.queueAccessory(UIConstants.TANK_ICON_ACCESSORY_PARTS.FRONT, frontAccessory);
        loader.queueAccessory(UIConstants.TANK_ICON_ACCESSORY_PARTS.BACK, backAccessory);
        loader.queueAccessory(UIConstants.TANK_ICON_ACCESSORY_PARTS.TREAD, treadAccessory);
        loader.queueAccessory(UIConstants.TANK_ICON_ACCESSORY_PARTS.BACKGROUND, backgroundAccessory);
        loader.queueAccessory(UIConstants.TANK_ICON_ACCESSORY_PARTS.BADGE, badge);
        loader.onReady(onReady, context);
        loader.start();
    });

    // Method to queue tank addons
    UITankIconLoader.method('queueAddons', function (part, accessory) {
        if (accessory !== null && accessory !== undefined && accessory !== '0') {
            this._queueImage('accessories/', part, accessory, this.accessories, part, true);
        }
    });

    // Method to draw tank icon
    UITankIcon.classMethod('drawTankIcon', function (canvas, turretColour, treadColour, baseColour, turret, barrel, leftTread, rightTread, base, turretShade, barrelShade, leftTreadShade, rightTreadShade, baseShade, turretAccessory, barrelAccessory, frontAccessory, backAccessory, treadAccessory, backgroundAccessory, badge) {
        // Function logic for drawing tank icon
        var context = canvas.getContext('2d');
        if (canvas.width !== this.compositedBuffer.width || canvas.height !== this.compositedBuffer.height) {
            this.compositedBuffer.width = canvas.width;
            this.compositedBuffer.height = canvas.height;
        }
        var compositedContext = this.compositedBuffer.getContext('2d');
        compositedContext.clearRect(0, 0, canvas.width, canvas.height);

        if (canvas.width !== this.tintedBuffer.width || canvas.height !== this.tintedBuffer.height) {
            this.tintedBuffer.width = canvas.width;
            this.tintedBuffer.height = canvas.height;
        }
        var tintedContext = this.tintedBuffer.getContext('2d');
        tintedContext.clearRect(0, 0, canvas.width, canvas.height);

        // Draw back accessory if it's an image
        if (backAccessory instanceof HTMLImageElement) {
            compositedContext.drawImage(backAccessory, 0, 0, canvas.width, canvas.height);
        }

        // Logic for tinting tread color
        tintedContext.globalCompositeOperation = 'copy';
        if (treadColour instanceof HTMLImageElement) {
            tintedContext.drawImage(treadColour, 0, 0, canvas.width, canvas.height);
        } else {
            tintedContext.fillStyle = treadColour;
            tintedContext.fillRect(0, 0, canvas.width, canvas.height);
        }
        tintedContext.globalCompositeOperation = 'destination-atop';
        tintedContext.drawImage(leftTread, 0, 0, canvas.width, canvas.height);
        compositedContext.drawImage(this.tintedBuffer, 0, 0);
        compositedContext.drawImage(leftTreadShade, 0, 0, canvas.width, canvas.height);

        // Logic for tinting turret color
        tintedContext.globalCompositeOperation = 'copy';
        if (turretColour instanceof HTMLImageElement) {
            tintedContext.drawImage(turretColour, 0, 0, canvas.width, canvas.height);
        } else {
            tintedContext.fillStyle = turretColour;
            tintedContext.fillRect(0, 0, canvas.width, canvas.height);
        }
        tintedContext.globalCompositeOperation = 'destination-atop';
        tintedContext.drawImage(turret, 0, 0, canvas.width, canvas.height);
        compositedContext.drawImage(this.tintedBuffer, 0, 0);
        compositedContext.drawImage(turretShade, 0, 0, canvas.width, canvas.height);

        // Logic for tinting base color
        tintedContext.globalCompositeOperation = 'copy';
        if (baseColour instanceof HTMLImageElement) {
            tintedContext.drawImage(baseColour, 0, 0, canvas.width, canvas.height);
        } else {
            tintedContext.fillStyle = baseColour;
            tintedContext.fillRect(0, 0, canvas.width, canvas.height);
        }
        tintedContext.globalCompositeOperation = 'destination-atop';
        tintedContext.drawImage(base, 0, 0, canvas.width, canvas.height);
        compositedContext.drawImage(this.tintedBuffer, 0, 0);
        compositedContext.drawImage(baseShade, 0, 0, canvas.width, canvas.height);

        // Logic for other accessories
        if (treadAccessory instanceof HTMLImageElement) {
            compositedContext.drawImage(treadAccessory, 0, 0, canvas.width, canvas.height);
        }
        if (turretAccessory instanceof HTMLImageElement) {
            compositedContext.drawImage(turretAccessory, 0, 0, canvas.width, canvas.height);
        }
        if (frontAccessory instanceof HTMLImageElement) {
            compositedContext.drawImage(frontAccessory, 0, 0, canvas.width, canvas.height);
        }
        if (barrelAccessory instanceof HTMLImageElement) {
            compositedContext.drawImage(barrelAccessory, 0, 0, canvas.width, canvas.height);
        }
        if (badge instanceof HTMLImageElement) {
            compositedContext.drawImage(badge, 0, 0, canvas.width, canvas.height);
        }

        if (canvas.width !== this.outlineBuffer.width || canvas.height !== this.outlineBuffer.height) {
            this.outlineBuffer.width = canvas.width;
            this.outlineBuffer.height = canvas.height;
        }
        var outlineContext = this.outlineBuffer.getContext('2d');
        outlineContext.globalCompositeOperation = 'copy';
        outlineContext.fillStyle = 'rgba(0,0,0, 0.8)';
        outlineContext.fillRect(0, 0, canvas.width, canvas.height);
        outlineContext.globalCompositeOperation = 'destination-atop';
        outlineContext.drawImage(this.compositedBuffer, 0, 0);

        if (!Ttcv2Extension.isHighresTanksEnabled()) {
            var width = UIConstants.TANK_ICON_OUTLINE_WIDTH;
            var diagWidth = Math.sqrt(width * width / 2);
            context.drawImage(this.outlineBuffer, -width, 0);
            context.drawImage(this.outlineBuffer, -diagWidth, -diagWidth);
            context.drawImage(this.outlineBuffer, -diagWidth, diagWidth);
            context.drawImage(this.outlineBuffer, 0, width);
            context.drawImage(this.outlineBuffer, 0, -width);
            context.drawImage(this.outlineBuffer, diagWidth, -diagWidth);
            context.drawImage(this.outlineBuffer, diagWidth, diagWidth);
            context.drawImage(this.outlineBuffer, width, 0);
        }
        context.drawImage(this.compositedBuffer, 0, 0);
    });

    // Method to queue image
    UITankIconLoader.method('_queueImage', function (basePath, part, image, output, customKey) {
        // Function logic to queue image
        if (image !== null && image !== undefined && image !== '0') {
            var key = part;
            if (customKey !== undefined) {
                key = customKey;
            }
            var cachedImage = UITankIconLoader.imageCache[part + image + '-' + this.size];
            if (cachedImage === undefined) {
                var highresEnabled = Ttcv2Extension.isHighresTanksEnabled();
                var imageName = basePath + part + image + '-' + (highresEnabled ? UIConstants.TANK_ICON_RESOLUTIONS['large'] : UIConstants.TANK_ICON_RESOLUTIONS[this.size]);
                if (imageName.includes('assets')) {
                    var imgName = imageName.substring(14);
                } else {
                    var imgName = imageName;
                }
                var src = d_url('images/' + imgName + '.png');
                if (highresEnabled) {
                    src = d_url('images/' + imgName + '@2x.png');
                }
                var srcset = d_url('images/' + imgName + '@2x.png') + ' 2x';
                var imageElement = $('<img src=\"' + src + '\" srcset=\"' + srcset + '\" crossorigin=\"anonymous\"/>');
                var self = this;
                imageElement.load(function (result) {
                    output[key] = imageElement[0];
                    ++self.numImagesLoaded;
                    self._checkIfDone();
                });
                imageElement.error(function (result) {
                    var failsafeImageElement = $('<img src=\"' + g_url('assets/images/' + imgName + '.png') + '\" srcset=\"' + g_url('assets/images/' + imgName + '@2x.png') + ' 2x\" crossorigin=\"anonymous\"/>');
                    failsafeImageElement.load(function () {
                        output[key] = failsafeImageElement[0];
                        ++self.numImagesLoaded;
                        self._checkIfDone();
                    });
                    failsafeImageElement.error(function () {
                        ++self.numImagesLoaded;
                        self._checkIfDone();
                    });
                });
            } else {
                output[key] = cachedImage;
                ++this.numImagesLoaded;
            }
            ++this.numImages;
        }
    });
}

