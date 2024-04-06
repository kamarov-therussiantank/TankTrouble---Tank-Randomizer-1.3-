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
}
