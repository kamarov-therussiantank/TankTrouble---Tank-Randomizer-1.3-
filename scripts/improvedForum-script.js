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

    // Improved Forum script
    ForumView.method('checkForUnmoderatedReplies', function(thread, animate) {
        if (Users.highestGmLevel >= UIConstants.ADMIN_LEVEL_APPROVE_THREAD_OR_REPLY) {
            var self = this;
            Backend.getInstance().getForumReplies(function(result) {
                if (typeof result == 'object') {
                    var replies = result.result.data.replies;
                    if (replies.length > 0) {
                        for (var i = 0; i < replies.length; i++) {
                            if (replies[i].approved == false && replies[i].deleted == false) {
                                i = replies.length;
                                thread.html.threadlist = $(thread.html.threadlist).addClass('unmoderatedReplies').prop('outerHTML');
                                self.mergeThread(thread, animate);
                            }
                        }
                    }
                } else {
                    self.mergeThread(thread, animate);
                }
            }, function(result) {}, function(result) {}, thread.id, Number.MAX_SAFE_INTEGER, 'older', 0, 3);
        } else {
            this.mergeThread(thread, animate);
        }
    });

    ForumView.method('threadListChanged', function(threadList, animate) {
        this.changeState(ForumView.STATE_THREADLIST);
        if (this.model.getTrackingNewestThreads()) {
            Forum.getInstance().startThreadSynchronization(UIConstants.FORUM_THREAD_REFRESH_INTERVAL, !this.suppressNextUpdateAnimation);
        } else {
            Forum.getInstance().stopSynchronization(!this.suppressNextUpdateAnimation);
        }
        for (var i = 0; i < threadList.length; i++) {
            this.mergeThread(threadList[i], animate);
            this.checkForUnmoderatedReplies(threadList[i], animate);
        }
        $('.forum .thread[id]').each(function() {
            var t = $(this).data();
            for (i = 0; i < threadList.length; i++) {
                if (threadList[i].id == t.id) {
                    if (threadList[i].time <= t.time) {
                        return;
                    }
                }
            }
            if (animate) {
                $(this).css('height', $(this).height()).css('min-height', 0).animate({ opacity: 0 }, 300).animate({ height: 0, marginTop: 0 }, 300, function() {
                    $(this).remove();
                });
            } else {
                $(this).remove();
            }
        });
        var pageCount = Math.ceil(this.model.getThreadCount() / this.model.getThreadRequestSize());
        var currentPage = Math.floor(pageCount - (this.model.getThreadCount() - this.model.getThreadOffset()) / this.model.getThreadRequestSize() - 1);
        Forum.log.debug(this.model.getThreadOffset() + '/' + this.model.getThreadCount());
        Forum.log.debug(currentPage + '/' + pageCount);
        this.updatePaginator($('.threadsPaginator').first(), currentPage, pageCount, this.threadPageFunctions, false, false, false, !this.suppressNextUpdateAnimation);
        this.updatePaginator($('.threadsPaginator').last(), currentPage, pageCount, this.threadPageFunctions, false, false, false, !this.suppressNextUpdateAnimation);
        Forum.getInstance().updateComposeAndStatus(!this.suppressNextUpdateAnimation, true);
        this.suppressNextUpdateAnimation = false;
        Forum.log.debug('Pushing thread list length ' + threadList.length);
        var data = { id: this.model.getCurrentThreadWindowNewestThreadId() };
        Content.updateTab('forum', '/forum?id=' + data.id, data, this.replaceNextHistory);
        this.replaceNextHistory = false;
    });

  // Forum Overview Improvements
    ForumView.method('mergeReply', function(reply, i, animate) {
    var inserted = false;

    $('.forum .reply').each(function() {
        var r = $(this).data();

        if (reply.id == r.id) {
            Forum.log.debug('VIEW REPLY UPDATE');
            var replyHtml = $(reply.html.replylist);
            var newContent = replyHtml.find('.content');
            var newDetails = replyHtml.find('.details');

            if (reply.latestEdit !== null) {
                $(newDetails).text($(newDetails).html().trim() + ' [Edited ' + Utils.forumTimeDiffToString(reply.time, reply.latestEdit) + ' ago]');
            }

            $(this).find('.content').replaceWith(newContent);
            $(this).find('.details').replaceWith(newDetails);
            $(this).removeClass('banned deleted approved moderatable approvable deletable bannable editable likable liked').addClass(replyHtml.attr('class'));
            $(this).data(reply);

            inserted = true;
            return false;
        } else if (reply.id < r.id) {
            Forum.log.debug('VIEW REPLY MERGE');
            var atLeft = (Forum.getInstance().getSelectedThreadReplyOffset() + i) % 2 == 1;
            var replyHtml = $(reply.html.replylist);
            var newDetails = replyHtml.find('.details');

            if (reply.latestEdit !== null) {
                $(newDetails).text($(newDetails).html().trim() + ' [Edited ' + Utils.forumTimeDiffToString(reply.time, reply.latestEdit) + ' ago]');
            }

            $(replyHtml).find('.details').replaceWith(newDetails);
            replyHtml.addClass(atLeft ? 'left' : 'right');

            if (animate) {
                replyHtml.addClass('collapsed');
            }

            replyHtml.data(reply);

            [reply.coCreator1, reply.coCreator2].forEach(function(playerId, index) {
                index = index + 1;
                if (playerId !== null) {
                    var coCreatorDiv = $("<div style='position: absolute;'></div>");
                    var canvas = $("<canvas id='reply-" + reply.id + '-coTank' + index + "'></canvas>");
                    canvas = canvas[0];

                    coCreatorDiv.on('mouseup', function(event) {
                        var position = $(this).offset();
                        TankTrouble.TankInfoBox.show(position.left + $(this).width() / 2, position.top + $(this).height() / 2, playerId, $(this).width() / 2, $(this).height() / 4)
                    });

                    canvas.width = UIConstants.TANK_ICON_WIDTH_SMALL;
                    canvas.height = UIConstants.TANK_ICON_HEIGHT_SMALL;
                    canvas.style.width = UIConstants.TANK_ICON_RESOLUTIONS[UIConstants.TANK_ICON_SIZES.SMALL] * (1 - index / 5) + 'px';
                    canvas.style.height = UIConstants.TANK_ICON_RESOLUTIONS[UIConstants.TANK_ICON_SIZES.SMALL] * .6 * (1 - index / 5) + 'px';

                    coCreatorDiv.css('top', UIConstants.TANK_ICON_RESOLUTIONS[UIConstants.TANK_ICON_SIZES.SMALL] * (index / 10) + 'px');
                    coCreatorDiv.css('left', (atLeft ? '-' : '') + 60 * (index * .9) + 'px');

                    UITankIcon.loadPlayerTankIcon(canvas, UIConstants.TANK_ICON_SIZES.SMALL, playerId);
                    coCreatorDiv.append(canvas);
                    replyHtml.find('.tank').append(coCreatorDiv);
                }
            });

            replyHtml.insertBefore($(this));

            if (animate) {
                insertedReplyHeight = replyHtml.height();
                replyHtml.css({ minHeight: 0, height: 0, opacity: 0 });
                replyHtml.delay(300).animate({ height: insertedReplyHeight }, 300).animate({ opacity: 1 }, 300, function() { $(this).removeAttr('style') });
                replyHtml.removeClass('collapsed');
            }

            inserted = true;
            return false;
        }
    });

    if (!inserted) {
        Forum.log.debug('VIEW REPLY BOTTOM');
        var previousReply = $('.forum .reply').last();
        var atLeft = false;

        if (previousReply.length > 0) {
            Forum.log.debug('RELATIVE PLACEMENT');
            atLeft = previousReply.hasClass('left') ? false : true;
        } else {
            Forum.log.debug('ABSOLUTE PLACEMENT');
            atLeft = (Forum.getInstance().getSelectedThreadReplyOffset() + i) % 2 == 1;
        }

        var replyHtml = $(reply.html.replylist);
        var newDetails = replyHtml.find('.details');

        if (reply.latestEdit !== null) {
            $(newDetails).text($(newDetails).html().trim() + ' [Edited ' + Utils.forumTimeDiffToString(reply.time, reply.latestEdit) + ' ago]');
        }

        $(replyHtml).find('.details').replaceWith(newDetails);
        replyHtml.addClass(atLeft ? 'left' : 'right');

        if (animate) {
            replyHtml.addClass('collapsed');
        }

        replyHtml.data(reply);

        [reply.coCreator1, reply.coCreator2].forEach(function(playerId, index) {
            index = index + 1;
            if (playerId !== null) {
                var coCreatorDiv = $("<div style='position: absolute;'></div>");
                var canvas = $("<canvas id='reply-" + reply.id + '-coTank' + index + "'></canvas>");
                canvas = canvas[0];

                coCreatorDiv.on('mouseup', function(event) {
                    var position = $(this).offset();
                    TankTrouble.TankInfoBox.show(position.left + $(this).width() / 2, position.top + $(this).height() / 2, playerId, $(this).width() / 2, $(this).height() / 4)
                });

                canvas.width = UIConstants.TANK_ICON_WIDTH_SMALL;
                canvas.height = UIConstants.TANK_ICON_HEIGHT_SMALL;
                canvas.style.width = UIConstants.TANK_ICON_RESOLUTIONS[UIConstants.TANK_ICON_SIZES.SMALL] * (1 - index / 5) + 'px';
                canvas.style.height = UIConstants.TANK_ICON_RESOLUTIONS[UIConstants.TANK_ICON_SIZES.SMALL] * .6 * (1 - index / 5) + 'px';

                coCreatorDiv.css('top', UIConstants.TANK_ICON_RESOLUTIONS[UIConstants.TANK_ICON_SIZES.SMALL] * (index / 10) + 'px');
                coCreatorDiv.css('left', (atLeft ? '-' : '') + 32 * (1.5 + index ** 2 / 2.5) + 'px');

                UITankIcon.loadPlayerTankIcon(canvas, UIConstants.TANK_ICON_SIZES.SMALL, playerId);
                coCreatorDiv.append(canvas);
                replyHtml.find('.tank').append(coCreatorDiv);
            }
        });

        replyHtml.appendTo('#repliesContainer');

        if (animate) {
            insertedReplyHeight = replyHtml.height();
            replyHtml.css({ minHeight: 0, height: 0, opacity: 0 });
            replyHtml.delay(300).animate({ height: insertedReplyHeight }, 300).animate({ opacity: 1 }, 300, function() { $(this).removeAttr('style') });
            replyHtml.removeClass('collapsed');
        }
    }
});

ForumView.method('replyUpdated', function(reply) {
    var existingReply = $('#reply-' + reply.id);
    var r = existingReply.data();

    if (r && reply.id == r.id) {
        Forum.log.debug('VIEW REPLY UPDATE SINGLE');
        var replyHtml = $(reply.html.replylist);
        var newContent = replyHtml.find('.content');
        var newDetails = replyHtml.find('.details');

        if (reply.latestEdit !== null) {
            $(newDetails).text($(newDetails).html().trim() + ' [Edited ' + Utils.forumTimeDiffToString(reply.time, reply.latestEdit) + ' ago]');
        }

        existingReply.find('.content').replaceWith(newContent);
        existingReply.find('.details').replaceWith(newDetails);
        existingReply.removeClass('banned deleted approved moderatable approvable deletable bannable editable likable liked').addClass(replyHtml.attr('class'));
        existingReply.data(reply);

        this.updateSingleBubbleAndActionWidth(existingReply);
        this.updateModerationTooltip(existingReply);
        Forum.getInstance().checkCooldown(true);
    }
});

Utils.classMethod('forumTimeDiffToString', function(now, then) {
    if (then > now) {
        return 'no time';
    } else {
        var diff = now - then;
        if (diff > 31536e3) {
            var years = Math.floor(diff / 31536e3);
            return years + ' year' + (years != 1 ? 's' : '');
        } else if (diff > 2678400) {
            var months = Math.floor(diff / 2678400);
            return months + ' month' + (months != 1 ? 's' : '');
        } else if (diff > 604800) {
            var weeks = Math.floor(diff / 604800);
            return weeks + ' week' + (weeks != 1 ? 's' : '');
        } else if (diff > 86400) {
            var days = Math.floor(diff / 86400);
            return days + ' day' + (days != 1 ? 's' : '');
        } else if (diff > 3600) {
            var hours = Math.floor(diff / 3600);
            return hours + ' hour' + (hours != 1 ? 's' : '');
        } else if (diff > 60) {
            var minutes = Math.floor(diff / 60);
            return minutes + ' minute' + (minutes != 1 ? 's' : '');
        } else {
            var seconds = Math.floor(diff / 1);
            return seconds + ' second' + (seconds !== 1 ? 's' : '');
        }
    }
});
}
