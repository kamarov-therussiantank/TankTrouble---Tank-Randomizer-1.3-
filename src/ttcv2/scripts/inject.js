(() => {
	if (!window.location.hostname.endsWith('tanktrouble.com')) return;

	// Function to dynamically add custom CSS
	const addStyle = css => document.head.appendChild(document.createElement('style')).innerHTML = css;

	// Add Classic UI to it
	addStyle(`
@font-face {
	font-family: 'ClassicTankTrouble';
	src:  url('ttcv2/fonts/Classic_TankTrouble_font.ttf') format('truetype');
}

#game {
	position: relative;
	left: -10px;
	top: 0px;
}
.premium #header {
		background-image: url(../assets/images/header/background.png);
		background-size: 120px 120px;
}
.snippet {
	background: #fff;
	border: #ccc 3px solid;
	border-radius: 5px;
	box-shadow: none;
}
.snippet .header {
	color: #fff;
	border-radius: 0px;
	padding: 0 !important;
}
#scrapyardSnippet {
	width: 135px;
	padding: 3px;
	border: #000 3px solid;
}
#scrapyardSnippet .header {
	background: none;
	border: none;
}
#wallOfFameSnippet {
	background: #000;
	cursor: pointer;
	box-sizing: border-box;
	padding: 4px;
	border: none;
	width: 135px;
}
#appStoreSnippet {
	cursor: pointer;
	border: none;
	background: none;
	width: 135px;
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
div#shopItem-120 {
	background: #ebc934;
	border: 3px #d3a310 solid;
}
div#shopItem-122 {
	background: #1ab14d;
	border: 3px #2a873b solid;
}
.shopItem.info button.info {
	width: 34px;
	float: right;
	right: 10px;
	color: white;
	background: #0097fb;
	}
	#teaser-25 .mode {
		color: white;
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
.forum .tank div {
	width: 150px;
	height: 20px;
	left: -5px;
	top: -19px;
	position: relative;
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
    color: #555;
    text-shadow: none;
    background-color: rgb(255 255 255 / 99%)
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
#overlay .newGame .premium {
	display: inline-block;
	border: 3px solid gray;
	border-radius: 8px;
	position: relative;
	padding: 40px 40px 30px;
	margin: 80px 20px 20px;
	box-shadow: 0px 10px 20px #000;
}
button.warning {
	background: linear-gradient(to bottom, red, maroon);
	border: none;
	color: #fff;
}
.buttonGroup div.selected button {
    text-shadow: 0 0 4px #ccc, 0 0 4px #fff700, 0 0 5px #ffda00, 0 0 10px #ffe237;
}
.buttonGroup div.selected button:disabled {
    text-shadow: 0 0 4px #ccc, 0 0 4px #fff700, 0 0 5px #ffda00, 0 0 10px #ffe237;
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
	border: 2px solid #bf0000;
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
	border-color: #00df4e !important;
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
#chat {
	-webkit-filter: none;
	filter: none;
	-webkit-transform: translateZ(0);
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
	font-family: 'ClassicTankTrouble';
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

// Halloween theme loader
PremiumManager.classMethod('_updatePremium', function(hasPremium) {
    const today = new Date();
    const isHalloween = today.getMonth() === 9;

    $('body').removeClass();

    if (hasPremium) {
        $('body').addClass('premium');
    }

    if (isHalloween) {
        $('body').addClass('halloween');
    }
});

PremiumManager._updatePremium(PremiumManager.hasPremium);

// Apply more halloween content
function applySeasonalStyles() {
	var currentMonth = new Date().getMonth();
	var header = document.getElementById('header');
	var gameTabDeselected = document.querySelector('#gameTab .deselected');
	var gameTabSelected = document.querySelector('#gameTab .selected');

	if (currentMonth === 9) { 
		var style = document.createElement('style');
		style.textContent = `
			#gameTab .deselected, #gameTab .selected {
				width:0;
				height:0;
				padding:60px 0 0 320px;
				background-image: -webkit-image-set(url(https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/header/tab1-2Selected.png) 1x, url(https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/header/tab1-2Selected@2x.png) 2x);
				background-image: image-set(url(https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/header/tab1-2Selected.png) 1x, url(https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/header/tab1-2Selected@2x.png) 2x);
			}

			#gameTab .deselected {
				background-image: -webkit-image-set(url(https://raw.githubusercontent.com/turtlesteak/TankTroubleAddonsFinale/main/images/1x/tab3.png) 1x, url(https://raw.githubusercontent.com/turtlesteak/TankTroubleAddonsFinale/main/images/2x/tab3@2x.png) 2x);
				background-image: image-set(url(https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/header/tab1-2.png) 1x, url(https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/header/tab1-2@2x.png) 2x);
			}
		`;
		document.head.appendChild(style);
	}
}

// Call the function when the page loads
window.addEventListener('load', applySeasonalStyles);

})();
