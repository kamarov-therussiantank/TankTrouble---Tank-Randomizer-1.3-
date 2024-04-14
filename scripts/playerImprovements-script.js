// Ensure jQuery is loaded first

// Function to inject JavaScript code
function injectJSCode(code) {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.textContent = code;
    document.documentElement.appendChild(scriptElement);
}

// Function to inject JavaScript link
function injectJSLink(src) {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', src);
    document.documentElement.appendChild(scriptElement);
}

// Function to create a custom HTML element
function createCustomElement(tag, attr_tag, attr_name, value) {
    const custom_element = document.createElement(tag);
    custom_element.setAttribute(attr_tag, attr_name);
    custom_element.innerHTML = value;
    const existingElement = document.getElementById(attr_name);
    if (!existingElement) {
        document.getElementById('tertiaryContent').appendChild(custom_element);
    }
}

// DOMContentLoaded event listener to ensure script execution after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Injection
    if (window.location.hostname.includes("tanktrouble.com")) {
        // Inject custom CSS
        const customCSS = `
            #helpSnippet {
                background: #000;
                border: #000 2px solid;
                border-radius: 2px;
                box-shadow: 0 3px 4px 0 rgba(0,0,0, .5);
                margin-bottom: 10px;
                text-align: center;
            }
        `;
        addCustomStyle(customCSS);

        // Create custom HTML element
        createCustomElement('div', 'id', 'helpSnippet', `
            <div class="content">
                <div style="color: #fff; font-size: 13px; font-weight: bold;">Need Help?</div>
                <div style="color: #fff; font-size: 10px; font-weight: bold;">Check the FAQ</div>
            </div>
        `);

        // Handle click event on #helpSnippet
        $("#helpSnippet").mousedown(function(event) {
            window.open("https://docs.google.com/document/d/1Kge1AgRErxT8uXU_YNpv1-_bkouogm-aSKfoHRiFnEY/edit", "_blank");
            event.stopPropagation();
        });
    }
});

    
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

     // Create a custom HTML element
   createCustomElement('div', 'id', 'helpSnippet', `
   <style>
    #helpSnippet {
      background: #000;
      border: #000 2px solid;
      border-radius: 2px;
      box-shadow: 0 3px 4px 0 rgba(0,0,0, .5);
      margin-bottom: 10px;
      text-align: center;
    }
     </style>
    <div class="content">
      <div style="color: #fff; font-size: 13px; font-weight: bold;">Need Help?</div>
      <div style="color: #fff; font-size: 10px; font-weight: bold;">Check the FAQ</div>
      </div>
  `);

   $("#helpSnippet").mousedown(function(event) {
      window.open("https://docs.google.com/document/d/1Kge1AgRErxT8uXU_YNpv1-_bkouogm-aSKfoHRiFnEY/edit", "_blank");
      event.stopPropagation();
 });     
}
