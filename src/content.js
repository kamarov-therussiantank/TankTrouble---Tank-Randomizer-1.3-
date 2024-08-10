// TODO: Classic Lobby Settings (local only), Leaderboard, LAB?!

(() => {
	if (!window.location.hostname.endsWith('tanktrouble.com')) return;

	// Function to create and append custom elements
	function insertElement(tagName, attributes, innerHTML, appendToId) {
		const element = document.createElement(tagName);

		for (const [attribute, value] of Object.entries(attributes)) {
			element.setAttribute(attribute, value)
		}
		element.innerHTML = innerHTML;

		document.getElementById(appendToId).appendChild(element);
	}

	insertElement('div', {
		id: 'statisticsSnippet'
	}, `
		<style>
			#statisticsSnippet {
				background: linear-gradient(to bottom, #fff, #fff);
				border: #ccc 3px solid;
				border-radius: 5px;
				box-shadow: none;
				margin-bottom: 10px;
				text-align: center;
			}
			#statisticsSnippet .header {
				font-family:'TankTrouble';
				font-size: 14px;
				background: #ccc;
				color: #fff;
				border-radius: 3px;
				border: #ccc 2px solid;
				margin-bottom: 5px;
				padding: 5px 0 3px 0;
			}
			#statisticsSnippet .content {
				margin: 3px 1px 3px 1px;
				font-family: 'ClassicTankTrouble';
				font-size: 1.05em;
			}
			#statisticsSnippet .content * {
				margin: 3px 1px 3px 1px;
			}
			#statisticsSnippet .content #visits {
				font-size: 13px;
				font-weight: 600;
				margin-top: 5px;
				margin-bottom: 5px;
				font-family: 'Commodore';
			}
			#statisticsSnippet .content #onlinePlayerCount {
				font-size: 15px;
				font-weight: 600;
				margin-top: 5px;
				margin-bottom: 5px;
				font-family: 'Commodore';
			}
			#statisticsSnippet .content #tankOwnersCount {
				font-size: 13px;
				font-weight: 600;
				margin-top: 5px;
				margin-bottom: 5px;
				font-family: 'Commodore';
			}
			#statisticsSnippet .content #onlineGameCount {
				font-size: 7px;
				font-weight: 600;
				margin-top: 5px;
				margin-bottom: 10px;
				font-family: 'Commodore';
			}
			#statisticsSnippet .managedNavigation {
				cursor: pointer;
			}
			#statisticsSnippet .managedNavigation:hover {
				background-color: #fff;
				border-color: #fff;
			}
		</style>
		<div class="content">
			<div class="header">Statistics</div>
			<div style="color: #a4a4a4;">Visits</div>
			<div id="visits">...</div>
			<div style="color: #a4a4a4;">Tank Owners</div>
			<div id="tankOwnersCount">...</div>
			<div style="color: #a4a4a4;">Players Online</div>
			<div id="onlinePlayerCount">...</div>
			<div style="color: #a4a4a4;">Games Made</div>
			<div id="onlineGameCount">Loading...</div>
		</div>`, 'secondaryContent');

	// Script for Statistics Snippet
	TankTrouble.Statistics.type = 'global';
	ClientManager.classMethod('_attemptToConnectToServer', function(serverId) {
		ClientManager.log.debug('Attempt to connect to server initiated: ' + serverId);
		ClientManager._getSelectedServerStats(serverId, function(success, serverId, latency, gameCount, playerCount, visits, tankOwners, message) {
			if (ClientManager.client.getState() === TTClient.STATES.UNCONNECTED) {
				if (success) {
					TankTrouble.Statistics._updateStatistics(serverId);
					TankTrouble.SettingsBox.enableServer(serverId, latency);
					TankTrouble.SettingsBox.setServer(serverId);
					ClientManager.log.debug('Attempt to connect to server resulted in new connect: ' + serverId);
					Cookies.set('multiplayerserverid', serverId, {
						expires: 365
					});
					ClientManager.multiplayerServerId = serverId;
					ClientManager.client.connect(ClientManager.availableServers[serverId].url);
				} else {
					TankTrouble.SettingsBox.disableServer(serverId);
					Cookies.remove('multiplayerserverid');
					ClientManager.multiplayerServerId = null;
					ClientManager._findAndConnectToBestAvailableServer();
				}
			} else {
				ClientManager.log.debug('Client connected to other server while attempting to connect to this server: ' + serverId);
			}
		});
	});

	TankTrouble.Statistics._updateStatistics = function(serverId) {
		var self = this;
		switch (this.type) {
			case 'global':
				Backend.getInstance().getStatistics(function(result) {
					console.log('Server response:', result); // Log the server response for debugging
					if (typeof result == 'object') {
						$('#visits').text(result.visits);
						$('#tankOwnersCount').text(result.tankOwners); 
						self._updateNumber($('#onlinePlayerCount'), result.onlineStatistics.playerCount);
						self._updateNumber($('#onlineGameCount'), result.onlineStatistics.gameCount, 'game');
						$('#statisticsSnippet').css('display', 'inline-block');
					}
				}, function(error) {
					console.error('Error fetching statistics:', error); // Log any errors that occur during fetching statistics
				});
				break;
			case 'server':
				var server;
				if (typeof serverId !== 'undefined') {
					server = serverId;
				} else {
					server = ClientManager.multiplayerServerId;
				}
				ClientManager._getSelectedServerStats(server, function(success, serverId, latency, gameCount, playerCount, message) {
					self._updateNumber($('#onlinePlayerCount'), playerCount);
					self._updateNumber($('#onlineGameCount'), gameCount, 'game');
					$('#statisticsSnippet').css('display', 'inline-block');
				});
				break;
			default:
				Backend.getInstance().getStatistics(function(result) {
					if (typeof result == 'object') {
						self._updateNumber($('#onlinePlayerCount'), result.onlineStatistics.playerCount);
						self._updateNumber($('#onlineGameCount'), result.onlineStatistics.gameCount, 'game');
						$('#statisticsSnippet').css('display', 'inline-block');
					}
				}, function(result) {});
				break;
		}
	};

	// Create helpSnippet and append to tertiaryContent
	insertElement('div', {
		id: 'helpSnippet'
	}, `
		<style>
			#helpSnippet {
				background: linear-gradient(to bottom, #000, #000);
				box-shadow: none;
				margin-bottom: 10px;
				text-align: center;
				border-radius: 5px;
				width: 135px;
			}
			#helpSnippet .header {
				font-family:'TankTrouble';
				font-size: 14px;
				background: none;
				color: #fff;
				border-radius: 3px;
				border: none;
				margin-bottom: 5px;
				padding: 5px 0 3px 0;
			}
			#helpSnippet .content {
				margin: 3px 1px 3px 1px;
				font-family: 'ClassicTankTrouble';
				font-size: 1.05em;
			}
			#helpSnippet .content * {
				margin: 3px 1px 3px 1px;
			}
		</style>
		<a href="https://tinyurl.com/ttfaqdoc" target="_blank" style="text-decoration: none;">
	<div class="content">
		<div class="header">Need Help?</div>
		<div style="color: #a4a4a4;">Check the FAQ</div>
	</div>`, 'tertiaryContent');

	// Tell a Friend Snippet
	// FIXME: actual email formatting instead of archive URL?
	insertElement('div', {
		id: 'tellAFriendSnippet',
		onclick: 'window.open("https://web.archive.org/web/20150223142811/http://www.tanktrouble.com/tellAFriendMail/", "_blank", "width=460,height=535,left="+(screen.width-460)/2+",top="+(screen.height-535)/2+",resizable=0,toolbar=0,location=0,status=0,menubar=0, scrollbars=0,directories=0");'
	}, `
		<style>
			#tellAFriendSnippet {
				background: #000;
				border-radius: 5px;
				box-shadow: none;
				margin-bottom: 10px;
				text-align: center;
			}
			#tellAFriendSnippet .header {
				font-family:'TankTrouble';
				font-size: 14px;
				color: #fff;
				border-radius: 3px;
				margin: 1px 1px 3px 1px;
				padding: 5px 0 3px 0;
			}
			#tellAFriendSnippet .content {
				margin: 3px 1px 3px 1px;
				font-family: 'ClassicTankTrouble';
				font-size: 1.05em;
			}
		</style>
		<div class="content">
		<div class="header">Tell a Friend</div>
		<img
			src="https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/images/snippets/tellAFriend.png"
			style="position: relative; top: 3px; left: 14px; pointer-events: none; width: 125px;"
		>
	</div>`, 'tertiaryContent');

})();
