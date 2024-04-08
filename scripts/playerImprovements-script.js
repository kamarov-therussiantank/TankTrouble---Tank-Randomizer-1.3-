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

// Player Info improvements 
    TankTrouble.TankInfoBox.infoControl = null;

TankTrouble.TankInfoBox._initialize = function () {
    this.info = $('<div class=\"box noselect\" id=\"tankinfo\"/>');
    this.infoIcon = $('<canvas class=\"icon\"/>');
    this.iconCanvas = this.infoIcon[0];
    this.infoIconPlaceholder = $('<img class=\"icon\" src=\"' + g_url('assets/images/tankIcon/placeholder-320.png') + '\" srcset=\"' + g_url('assets/images/tankIcon/placeholder-320@2x.png') + ' 2x\"/>');
    this.infoContent = $('<div class=\"content\"/>');
    this.infoTabLeft = $('<div class=\"tab left\"/>');
    this.infoTabRight = $('<div class=\"tab right\"/>');
    this.infoTabBottom = $('<div class=\"tab bottom\"/>');
    this.infoName = $('<div class=\"username\"/>');
    this.infoRank = $('<div class=\"rank\"/>');
    this.infoRankTitle = $('<div class=\"title\"/>');
    this.infoRankIcon = $('<img class=\"rankIcon\" src=\"' + g_url('/assets/images/ranks/0.png') + '\" srcset=\"' + g_url('/assets/images/ranks/0@2x.png') + ' 2x\"/>');
    this.infoRankGuestIcon = $('<img class=\"rankIcon\" src=\"' + g_url('/assets/images/ranks/guest.png') + '\" srcset=\"' + g_url('/assets/images/ranks/guest@2x.png') + ' 2x\"/>');
    this.infoRankProgress = $('<div class=\"progress\"/>');
    this.infoRankProgressBorder = $('<div class=\"border\"/>');
    this.infoRankProgressBar = $('<div class=\"bar\"/>');
    this.infoXP = $('<div class=\"xp\"/>');
    this.infoXPTitle = $('<div class=\"title\"/>');
    this.infoXPProgress = $('<div class=\"progress\"/>');
    this.infoXPProgressBorder = $('<div class=\"border\"/>');
    this.infoXPProgressBar = $('<div class=\"bar\"/>');
    this.infoTable = $('<table/>');
    this.infoKillsAndVictoriesTableRow = $('<tr/>');
    this.infoDeathsTableRow = $('<tr/>');
    this.infoKillsTableCell = $('<td/>');
    this.infoKillsIcon = $('<img class=\"statsIcon\" src=\"' + g_url('assets/images/tankInfo/kills.png') + '\" srcset=\"' + g_url('assets/images/tankInfo/kills@2x.png') + ' 2x\"/>');
    this.infoKills = $('<div/>');
    this.infoVictoriesTableCell = $('<td/>');
    this.infoVictoriesIcon = $('<img class=\"statsIcon\" src=\"' + g_url('assets/images/tankInfo/victories.png') + '\" srcset=\"' + g_url('assets/images/tankInfo/victories@2x.png') + ' 2x\"/>');
    this.infoVictories = $('<div/>');
    this.infoDeathsIcon = $('<img class=\"statsIcon\" src=\"' + d_url('https://i.imgur.com/PMAUKdq.png') + '\" srcset=\"' + d_url('https://i.imgur.com/vEjIwA4.png') + ' 2x\"/>');
    this.infoDeaths = $('<div/>');
    this.infoGoldAndDiamondTableRow = $('<tr/>');
    this.infoGoldTableCell = $('<td/>');
    this.infoGoldIcon = $('<img class=\"statsIcon\" src=\"' + g_url('assets/images/tankInfo/gold.png') + '\" srcset=\"' + g_url('assets/images/tankInfo/gold@2x.png') + ' 2x\"/>');
    this.infoGold = $('<div/>');
    this.infoDiamondTableCell = $('<td/>');
    this.infoDiamondIcon = $('<img class=\"statsIcon\" src=\"' + g_url('assets/images/tankInfo/diamond.png') + '\" srcset=\"' + g_url('assets/images/tankInfo/diamond@2x.png') + ' 2x\"/>');
    this.infoDiamondGlow = $('<img class=\"glow\" src=\"' + g_url('assets/images/tankInfo/diamondGlow.png') + '\" srcset=\"' + g_url('assets/images/tankInfo/diamondGlow@2x.png') + ' 2x\"/>');
    this.infoDiamondFirstRay = $('<img class=\"ray first\" src=\"' + g_url('assets/images/tankInfo/diamondRays.png') + '\" srcset=\"' + g_url('assets/images/tankInfo/diamondRays@2x.png') + ' 2x\"/>');
    this.infoDiamondSecondRay = $('<img class=\"ray second\" src=\"' + g_url('assets/images/tankInfo/diamondRays.png') + '\" srcset=\"' + g_url('assets/images/tankInfo/diamondRays@2x.png') + ' 2x\"/>');
    this.infoDiamond = $('<div/>');
    this.infoActionsCentered = $('<div class=\"actions centered\"/>');
    this.infoAdminLookup = $('<div class=\"button\" title=\"\"/>');
    this.infoFavouriteStarOn = $('<div class=\"button\" title=\"\"/>');
    this.infoFavouriteStarOff = $('<div class=\"button\" title=\"\"/>');
    this.infoGameJoin = $('<div class=\"button\" title=\"\"/>');
    this.infoGameJoinQueue = $('<div class=\"button\" title=\"\"/>');
    this.infoChat = $('<div class=\"button\" title=\"\"/>');
    this.infoActions = $('<div class=\"actions\"/>');
    this.infoSignUp = Utils.createFixedWidthButton('Sign up now', 'medium', 198);
    this.infoShop = $('<div class=\"button shop\" title=\"\"/>');
    this.infoGarage = $('<div class=\"button\" title=\"\"/>');
    this.infoAchievements = $('<div class=\"button\" title=\"\"/>');
    this.infoControl = $('<div class=\"button\" title=\"\"/>');
    this.infoAchievementsUnseenMarkerIcon = $('<img class=\"buttonMarker\" src=\"' + g_url('assets/images/tankInfo/unseenMarker.png') + '\" srcset=\"' + g_url('assets/images/tankInfo/unseenMarker@2x.png') + ' 2x\"/>');
    this.infoMazeCreator = $('<div class=\"button\" title=\"\"/>');
    this.infoAccount = $('<div class=\"button\" title=\"\"/>');
    this.infoAdmin = $('<div class=\"button\" title=\"\"/>');
    this.infoLogOut = $('<div class=\"button\" title=\"\"/>');
    this.infoBackground = $('<div class=\"boxbackground\"/>');

    this.infoContent.append(this.infoTabLeft);
    this.infoContent.append(this.infoTabRight);
    this.infoContent.append(this.infoTabBottom);
    this.infoRankProgress.append(this.infoRankProgressBorder);
    this.infoRankProgress.append(this.infoRankProgressBar);
    this.infoRank.append(this.infoRankProgress);
    this.infoRank.append(this.infoRankGuestIcon);
    this.infoRank.append(this.infoRankIcon);
    this.infoRank.append(this.infoRankTitle);
    this.infoXPProgress.append(this.infoXPProgressBorder);
    this.infoXPProgress.append(this.infoXPProgressBar);
    this.infoXP.append(this.infoXPProgress);
    this.infoXP.append(this.infoXPTitle);
    this.infoKillsTableCell.append(this.infoKillsIcon);
    this.infoKillsTableCell.append(this.infoKills);
    this.infoVictoriesTableCell.append(this.infoVictoriesIcon);
    this.infoVictoriesTableCell.append(this.infoVictories);
    this.infoKillsAndVictoriesTableRow.append(this.infoKillsTableCell);
    this.infoKillsAndVictoriesTableRow.append(this.infoVictoriesTableCell);
    this.infoGoldTableCell.append(this.infoGoldIcon);
    this.infoGoldTableCell.append(this.infoGold);
    this.infoDiamondTableCell.append(this.infoDiamondGlow);
    this.infoDiamondTableCell.append(this.infoDiamondFirstRay);
    this.infoDiamondTableCell.append(this.infoDiamondSecondRay);
    this.infoDiamondTableCell.append(this.infoDiamondIcon);
    this.infoDiamondTableCell.append(this.infoDiamond);
    this.infoGoldAndDiamondTableRow.append(this.infoGoldTableCell);
    this.infoGoldAndDiamondTableRow.append(this.infoDiamondTableCell);
    this.infoTable.append(this.infoKillsAndVictoriesTableRow);
    this.infoTable.append(this.infoDeathsTableRow);
    this.infoTable.append(this.infoGoldAndDiamondTableRow);

    Utils.addImageWithClasses(this.infoAdminLookup, 'standard', 'assets/images/tankInfo/admin.png');
    Utils.addImageWithClasses(this.infoAdminLookup, 'active', 'assets/images/tankInfo/adminActive.png');
    Utils.addImageWithClasses(this.infoAdminLookup, 'disabled', 'assets/images/tankInfo/adminDisabled.png');
    Utils.addImageWithClasses(this.infoFavouriteStarOn, 'standard', 'assets/images/tankInfo/favouriteOn.png');
    Utils.addImageWithClasses(this.infoFavouriteStarOn, 'active', 'assets/images/tankInfo/favouriteOnActive.png');
    Utils.addImageWithClasses(this.infoFavouriteStarOn, 'disabled', 'assets/images/tankInfo/favouriteDisabled.png');
    Utils.addImageWithClasses(this.infoFavouriteStarOff, 'standard', 'assets/images/tankInfo/favouriteOff.png');
    Utils.addImageWithClasses(this.infoFavouriteStarOff, 'active', 'assets/images/tankInfo/favouriteOffActive.png');
    Utils.addImageWithClasses(this.infoFavouriteStarOff, 'disabled', 'assets/images/tankInfo/favouriteDisabled.png');
    Utils.addImageWithClasses(this.infoGameJoin, 'standard', 'assets/images/tankInfo/join.png');
    Utils.addImageWithClasses(this.infoGameJoin, 'active', 'assets/images/tankInfo/joinActive.png');
    Utils.addImageWithClasses(this.infoGameJoin, 'disabled', 'assets/images/tankInfo/joinDisabled.png');
    Utils.addImageWithClasses(this.infoGameJoinQueue, 'standard', 'assets/images/tankInfo/joinQueue.png');
    Utils.addImageWithClasses(this.infoGameJoinQueue, 'active', 'assets/images/tankInfo/joinQueueActive.png');
    Utils.addImageWithClasses(this.infoGameJoinQueue, 'disabled', 'assets/images/tankInfo/joinDisabled.png');
    Utils.addImageWithClasses(this.infoChat, 'standard', 'assets/images/tankInfo/chat.png');
    Utils.addImageWithClasses(this.infoChat, 'active', 'assets/images/tankInfo/chatActive.png');
    Utils.addImageWithClasses(this.infoChat, 'disabled', 'assets/images/tankInfo/chatDisabled.png');
    Utils.addImageWithClasses(this.infoShop, 'standard', 'assets/images/tankInfo/shop.png');
    Utils.addImageWithClasses(this.infoShop, 'standard flicker', 'assets/images/tankInfo/shopFlicker.png');
    Utils.addImageWithClasses(this.infoShop, 'active', 'assets/images/tankInfo/shopActive.png');
    Utils.addImageWithClasses(this.infoShop, 'disabled', 'assets/images/tankInfo/shop.png');
    Utils.addImageWithClasses(this.infoGarage, 'standard', 'assets/images/tankInfo/garage.png');
    Utils.addImageWithClasses(this.infoGarage, 'active', 'assets/images/tankInfo/garageActive.png');
    Utils.addImageWithClasses(this.infoAchievements, 'standard', 'assets/images/tankInfo/achievements.png');
    Utils.addImageWithClasses(this.infoAchievements, 'active', 'assets/images/tankInfo/achievementsActive.png');
    Utils.addImageWithClasses(this.infoAchievements, 'disabled', 'assets/images/tankInfo/achievements.png');
    Utils.addImageWithClasses(this.infoMazeCreator, 'standard', 'assets/images/tankInfo/mazeCreator.png');
    Utils.addImageWithClasses(this.infoMazeCreator, 'active', 'assets/images/tankInfo/mazeCreatorActive.png');
    Utils.addImageWithClasses(this.infoMazeCreator, 'disabled', 'assets/images/tankInfo/mazeCreator.png');
    Utils.addImageWithClasses(this.infoAccount, 'standard', 'assets/images/tankInfo/account.png');
    Utils.addImageWithClasses(this.infoAccount, 'active', 'assets/images/tankInfo/accountActive.png');
    Utils.addImageWithClasses(this.infoAdmin, 'standard', 'assets/images/tankInfo/admin.png');
    Utils.addImageWithClasses(this.infoAdmin, 'active', 'assets/images/tankInfo/adminActive.png');
    Utils.addImageWithClasses(this.infoLogOut, 'standard', 'assets/images/tankInfo/logOut.png');
    Utils.addImageWithClasses(this.infoLogOut, 'active', 'assets/images/tankInfo/logOutActive.png');
    Utils.addImageWithClasses(this.infoLogOut, 'disabled', 'assets/images/tankInfo/logOutDisabled.png');

    this.infoAchievements.append(this.infoAchievementsUnseenMarkerIcon);
    this.infoActionsCentered.append(this.infoAdminLookup);
    this.infoActionsCentered.append(this.infoGameJoin);
    this.infoActionsCentered.append(this.infoGameJoinQueue);
    this.infoActionsCentered.append(this.infoChat);
    this.infoActions.append(this.infoSignUp);
    this.infoActions.append(this.infoShop);
    this.infoActions.append(this.infoGarage);
    this.infoActions.append(this.infoAchievements);
    this.infoActions.append(this.infoControl);
    this.infoActions.append(this.infoAccount);
    this.infoActions.append(this.infoAdmin);
    this.infoActions.append(this.infoLogOut);
    this.infoContent.append(this.infoName);
    this.infoContent.append(this.infoRank);
    this.infoContent.append(this.infoXP);
    this.infoContent.append(this.infoTable);
    this.infoContent.append(this.infoActionsCentered);
    this.infoContent.append(this.infoActions);
    this.info.append(this.infoContent);
    this.info.append(this.infoIcon);
    this.info.append(this.infoIconPlaceholder);
    $('body').append(this.infoBackground);
    $('body').append(this.info);
    this.infoBackground.hide();
    this.info.hide();
    this.infoIcon.hide();
    this.infoRank.tooltipster({
        position: 'right',
        offsetX: 5
    });
    this.infoXP.tooltipster({
        position: 'right',
        offsetX: 5
    });
    this.infoKillsTableCell.tooltipster({
        position: 'left',
        offsetX: 5
    });
    this.infoVictoriesTableCell.tooltipster({
        position: 'right',
        offsetX: 5
    });
    this.infoGoldTableCell.tooltipster({
        position: 'left',
        offsetX: 5
    });
    this.infoDiamondTableCell.tooltipster({
        position: 'right',
        offsetX: 5
    });
    this.infoAdminLookup.tooltipster({
        position: 'left',
        offsetX: 5
    });
    this.infoFavouriteStarOn.tooltipster({
        position: 'left',
        offsetX: 5
    });
    this.infoFavouriteStarOff.tooltipster({
        position: 'left',
        offsetX: 5
    });
    this.infoGameJoin.tooltipster({
        position: 'top',
        offsetY: 5
    });
    this.infoGameJoinQueue.tooltipster({
        position: 'top',
        offsetY: 5
    });
    this.infoChat.tooltipster({
        position: 'right',
        offsetX: 5
    });
    this.infoSignUp.tooltipster({
        position: 'top',
        offsetY: 5
    });
    this.infoShop.tooltipster({
        position: 'left',
        offsetX: 5
    });
    this.infoGarage.tooltipster({
        position: 'top',
        offsetY: 5
    });
    this.infoAchievements.tooltipster({
        position: 'top',
        offsetY: 5
    });
    this.infoControl.tooltipster({
        position: 'right',
        offsetY: 5
    });
    this.infoMazeCreator.tooltipster({
        position: 'right',
        offsetX: 5
    });
    this.infoAccount.tooltipster({
        position: 'top',
        offsetY: 5
    });
    this.infoAdmin.tooltipster({
        position: 'top',
        offsetX: 5
    });
    this.infoLogOut.tooltipster({
        position: 'right',
        theme: 'tooltipster-error',
        offsetX: 5
    });

    var self = this;
    this.infoBackground.click(function (event) {
        if (self.showing) {
            self.hide()
        }
    });
    this.infoAdminLookup.on('mouseup', function (event) {
        if (self.showing) {
            if (!$(this).hasClass('disabled')) {
                self._lookup()
            }
        }
    });
    this.infoFavouriteStarOn.on('mouseup', function (event) {
        if (self.showing) {
            if (!$(this).hasClass('disabled')) {
                self._setFavourited(false)
            }
        }
    });
    this.infoFavouriteStarOff.on('mouseup', function (event) {
        if (self.showing) {
            if (!$(this).hasClass('disabled')) {
                self._setFavourited(true)
            }
        }
    });
    this.infoGameJoin.on('mouseup', function (event) {
        if (self.showing) {
            if (!$(this).hasClass('disabled')) {
                self.hide();
                console.log('TODO: JOIN GAME')
            }
        }
    });
    this.infoGameJoinQueue.on('mouseup', function (event) {
        if (self.showing) {
            if (!$(this).hasClass('disabled')) {
                self.hide();
                console.log('TODO: JOIN GAME QUEUE')
            }
        }
    });
    this.infoChat.on('mouseup', function (event) {
        if (self.showing) {
            if (!$(this).hasClass('disabled')) {
                self.hide();
                TankTrouble.ChatBox.addRecipient(self.playerId);
                TankTrouble.ChatBox.open()
            }
        }
    });
    this.infoSignUp.click(function (event) {
        if (self.showing) {
            self.hide();
            OverlayManager.pushOverlay(TankTrouble.SignUpOverlay, {
                guestPlayerIdToSignUp: self.playerId
            })
        }
    });
    this.infoShop.on('mouseup', function (event) {
        if (self.showing) {
            self.hide();
            OverlayManager.pushOverlay(TankTrouble.VirtualShopOverlay, {
                playerId: self.playerId
            })
        }
    });
    this.infoGarage.on('mouseup', function (event) {
        if (self.showing) {
            self.hide();
            OverlayManager.pushOverlay(TankTrouble.GarageOverlay, {
                playerId: self.playerId
            })
        }
    });
    this.infoAchievements.on('mouseup', function (event) {
        if (self.showing) {
            self.hide();
            OverlayManager.pushOverlay(TankTrouble.AchievementsOverlay, {
                playerId: self.playerId
            })
        }
    });
    this.infoControl.on('mouseup', function (event) {
        if (self.showing) {
            self.hide();
            if (Inputs.getUnavailableInputSetIds().length < Inputs.getAllInputSetIds().length) {
                OverlayManager.pushOverlay(TankTrouble.ControlsOverlay, {
                    playerId: self.playerId
                })
            } else {
                TankTrouble.ErrorBox.show('Failed to reassign input: All sets are occupied')
            }
        }
    });
    this.infoMazeCreator.on('mouseup', function (event) {
        if (self.showing) {
            self.hide();
            console.log('TODO: OPEN MAZE CREATOR')
        }
    });
    this.infoAccount.on('mouseup', function (event) {
        if (self.showing) {
            self.hide();
            OverlayManager.pushOverlay(TankTrouble.AccountOverlay, {
                playerId: self.playerId
            })
        }
    });
    this.infoAdmin.on('mouseup', function (event) {
        if (self.showing) {
            self.hide();
            console.log('TODO: ADMIN')
        }
    });
    this.infoLogOut.on('mouseup', function (event) {
        if (self.showing) {
            self.hide();
            console.log('TODO: LOG OUT')
        }
    });

    this.iconCanvas.width = UIConstants.TANK_ICON_WIDTH_LARGE;
    this.iconCanvas.height = UIConstants.TANK_ICON_HEIGHT_LARGE;
    this.infoContent.css('width', UIConstants.TANK_INFO_WIDTH - 1);
    this.infoName.svg({
        settings: {
            width: UIConstants.TANK_INFO_WIDTH - 1,
            height: 30
        }
    });
    this.infoNameSvg = this.infoName.svg('get');
    this.infoRankTitle.svg({
        settings: {
            width: UIConstants.TANK_INFO_WIDTH - 1,
            height: 30
        }
    });
    this.infoRankTitleSvg = this.infoRankTitle.svg('get');
    this.infoXPTitle.svg({
        settings: {
            width: UIConstants.TANK_INFO_WIDTH - 1,
            height: 30
        }
    });
    this.infoXPTitleSvg = this.infoXPTitle.svg('get');
    this.infoActions.svg({
        settings: {
            width: UIConstants.TANK_INFO_WIDTH - 1,
            height: 80
        }
    });
    this.infoActionsSvg = this.infoActions.svg('get');
    this.infoActionsCentered.svg({
        settings: {
            width: UIConstants.TANK_INFO_WIDTH - 1,
            height: 80
        }
    });
    this.infoActionsCenteredSvg = this.infoActionsCentered.svg('get');
    this.infoTable.svg({
        settings: {
            width: UIConstants.TANK_INFO_WIDTH - 1,
            height: 70
        }
    });
    this.infoTableSvg = this.infoTable.svg('get');
    this.infoContentHeight = this.infoContent.height();
    this.infoNameSvg.rect(0, 0, UIConstants.TANK_INFO_WIDTH - 1, 30, {
        fill: '#FFFFFF'
    });
    this.infoRankTitleSvg.rect(0, 0, UIConstants.TANK_INFO_WIDTH - 1, 30, {
        fill: '#FFFFFF'
    });
    this.infoXPTitleSvg.rect(0, 0, UIConstants.TANK_INFO_WIDTH - 1, 30, {
        fill: '#FFFFFF'
    });
    this.infoActionsSvg.rect(0, 0, UIConstants.TANK_INFO_WIDTH - 1, 80, {
        fill: '#FFFFFF'
    });
    this.infoActionsCenteredSvg.rect(0, 0, UIConstants.TANK_INFO_WIDTH - 1, 80, {
        fill: '#FFFFFF'
    });
    this.infoTableSvg.rect(0, 0, UIConstants.TANK_INFO_WIDTH - 1, 70, {
        fill: '#FFFFFF'
    });
    this.infoTableSvg.rect(0, 0, UIConstants.TANK_INFO_WIDTH - 1, 70, {
        fill: '#FFFFFF'
    });
    this.info.hide()
};
  }
