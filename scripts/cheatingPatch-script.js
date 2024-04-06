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
