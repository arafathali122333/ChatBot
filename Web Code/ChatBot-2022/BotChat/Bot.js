function ouibounce(el, custom_config) {
    "use strict";

    var config = custom_config || {},
        aggressive = config.aggressive || false,
        sensitivity = setDefault(config.sensitivity, 20),
        timer = setDefault(config.timer, 15000),
        delay = setDefault(config.delay, 0),
        callback = config.callback || function() {},
        cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
        cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
        cookieName = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
        sitewide = config.sitewide === true ? ';path=/' : '',
        _delayTimer = null,
        _html = document.documentElement;

    function setDefault(_property, _default) {
        return typeof _property === 'undefined' ? _default : _property;
    }

    function setDefaultCookieExpire(days) {
        // transform days to milliseconds
        var ms = days * 24 * 60 * 60 * 1000;

        var date = new Date();
        date.setTime(date.getTime() + ms);

        return "; expires=" + date.toUTCString();
    }

    setTimeout(attachOuiBounce, timer);

    function attachOuiBounce() {
        if (isDisabled()) { return; }

        _html.addEventListener('mouseleave', handleMouseleave);
        _html.addEventListener('mouseenter', handleMouseenter);
        _html.addEventListener('keydown', handleKeydown);
    }

    function handleMouseleave(e) {
        if (e.clientY > sensitivity) { return; }

        _delayTimer = setTimeout(fire, delay);
    }

    function handleMouseenter() {
        if (_delayTimer) {
            clearTimeout(_delayTimer);
            _delayTimer = null;
        }
    }

    var disableKeydown = false;

    function handleKeydown(e) {
        if (disableKeydown) { return; } else if (!e.metaKey || e.keyCode !== 76) { return; }

        disableKeydown = true;
        _delayTimer = setTimeout(fire, delay);
    }

    function checkCookieValue(cookieName, value) {
        return parseCookies()[cookieName] === value;
    }

    function parseCookies() {
        // cookies are separated by '; '
        var cookies = document.cookie.split('; ');

        var ret = {};
        for (var i = cookies.length - 1; i >= 0; i--) {
            var el = cookies[i].split('=');
            ret[el[0]] = el[1];
        }
        return ret;
    }

    function isDisabled() {
        return checkCookieValue(cookieName, 'true') && !aggressive;
    }

    // You can use ouibounce without passing an element
    // https://github.com/carlsednaoui/ouibounce/issues/30
    function fire() {
        if (isDisabled()) { return; }

        if (el) { el.style.display = 'block'; }

        callback();
        disable();
    }

    function disable(custom_options) {
        var options = custom_options || {};

        // you can pass a specific cookie expiration when using the OuiBounce API
        // ex: _ouiBounce.disable({ cookieExpire: 5 });
        if (typeof options.cookieExpire !== 'undefined') {
            cookieExpire = setDefaultCookieExpire(options.cookieExpire);
        }

        // you can pass use sitewide cookies too
        // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
        if (options.sitewide === true) {
            sitewide = ';path=/';
        }

        // you can pass a domain string when the cookie should be read subdomain-wise
        // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
        if (typeof options.cookieDomain !== 'undefined') {
            cookieDomain = ';domain=' + options.cookieDomain;
        }

        if (typeof options.cookieName !== 'undefined') {
            cookieName = options.cookieName;
        }

        document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;

        // remove listeners
        _html.removeEventListener('mouseleave', handleMouseleave);
        _html.removeEventListener('mouseenter', handleMouseenter);
        _html.removeEventListener('keydown', handleKeydown);
    }

    return {
        fire: fire,
        disable: disable,
        isDisabled: isDisabled
    };
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AcoBuildHTML = function() {
    function BuildHTML() {
        _classCallCheck(this, BuildHTML);
    }

    BuildHTML.prototype.me =
        function me(text) {
            return '<div class="aco-single-bubble-line aco-user-answer"><p>' +
                text +
                '</p>\n</div>';
        };
    BuildHTML.prototype.bot = function bot(text) {
        return '<div class="aco-single-bubble-line aco-machine-answer aco-bg-color">' +
            text +
            '</div>';
    };

    BuildHTML.prototype.img = function img(imgTag) {
        return '<div class="aco-single-bubble-line">' +
            imgTag +
            '</div>';
    };

    return BuildHTML;
}();


var AcoWidget = function() {
    function AcoWidget() {
        _classCallCheck(this, AcoWidget);

        this.divs = '<link rel="stylesheet" href="//d1vrgybx2dsdrl.cloudfront.net/widget/css/widget_modern_v80.css"> <link rel="stylesheet" href="//acobot.ai/widget/css/font-awesome.css"> <style> .aco-bg-color{background-color:#182433!important;} .aco-bubbly .aco-machine-answer::after{border-right-color:#182433!important;} .aco-rectangle .aco-machine-answer::after{border-right-color:#182433!important;} .aco-color{color:#182433!important;} .aco-user-buttons a.aco-btn3:hover{background-color:#182433!important;}  </style> <div class="aco-slide-fixed-chat aco-chat-wrapper aco-modern aco-hidden-chat" style="display:none;"> <div class="aco-full-bg"><div style="width:100%;height:100%;background-color:rgba(0,0,0,0.5)"></div></div> <div class="aco-full-overlay"></div> <div class="aco-full-close"> <i class="aco-f aco-f-close aco-f-2x"></i> </div> <div class="aco-chat-container" > <div class="aco-flex-row"> <div class="aco-first-col"> <div class="aco-emoji-wrap bounce"> <div class="aco-emoji-inner hvr-buzz-out aco-rubber"> <i class="aco-f aco-f-times"></i> <img src="//d1vrgybx2dsdrl.cloudfront.net/sites/default/files/avatars/alien_1_1f47d.png" alt=""> </div> </div> </div> <div class="aco-second-col"> <div class="aco-chat-wrap" id="aco-chat-wrap"> <div class="aco-ended-posts-bubbles" id="aco-bubbles"> </div> <div class="aco-live-post-bubble"> <div class="aco-single-bubble-line aco-user-answer aco-user-input hvr-wobble-vertical"> <textarea class="aco-textarea" style="display:none;" id="aco-input" placeholder="Click to chat"></textarea> <div class="aco-user-buttons aco-show-audio-btn aco-hide-link-btn" id="aco-input-btns"> <p> <a class="aco-btn3" id="aco-input-chat-btn" title="Reply to bot">Click to chat</a> <a class="aco-btn3" id="aco-input-search-btn" title="Search"><i class="aco-f aco-f-search"></i></a> 		 <a class="aco-btn3" id="aco-input-contact-btn" title="Contact"><i class="aco-f aco-f-envelope-o"></i></a> <a class="aco-btn3" id="aco-input-audio-btn" title="Audio on"><i id="aco-audio-icon" class="aco-f aco-f-volume-up"></i></a> <a class="aco-btn3" id="aco-input-link-btn" href="https://acobot.ai" title="Powered by Acobot"><i class="aco-f aco-f-bolt"></i></a> <a class="aco-btn3" id="aco-input-exit-btn" title="Exit chat"><i class="aco-f aco-f-sign-out"></i></a> </p> </div> </div> </div>  </div> </div> </div> </div> </div> <div class="aco-beacon" id="aco-beacon"></div> ';

        var body = jQuery('body');
        body.append(this.divs);

        this.buildHTML = new AcoBuildHTML();

        this.chatwidget = jQuery('#aco-chat-wrap');
        this.input = jQuery('#aco-input');
        this.bubbles = jQuery('#aco-bubbles');
        this.replyBtns = jQuery('#aco-buttons-wrapper');


        this.getMsgId = new Date().getTime();
        this.wid = new Date().getTime();
        this.lastSend = 0;
        this.inChatting = false;

        this.uid = getAcoUid();
        this.groupid = 591066;
        this.groupkey = "DvbQ1JvrMOS2VQtr";
        this.inviteMessage = "inviteMessage en";

        this.smsgid = 0;
        this.lastActiveTime = new Date().getTime();

        this.idle_timeout = 120000;
        this.receiveInterval = 3000;
        this.lastReceived = new Date().getTime();
        this.maxMsgLen = 100;
        this.chatted = getChatted();
        this.chatting = false;

        this.abbrs =
            new Array(" a.i. ", " apr. ", " aug. ", " dec. ", " dr. ", " jr. ", " etc. ", " feb. ", " fri. ", " inc. ", " jan. ", " jul. ", " jun. ",
                " mar. ", " may. ", " mon. ", " mr. ", " mrs. ", " ms. ", " nov. ", " oct. ", " p.s. ", " sat. ", " sep. ", " sept. ", " sr. ", " st. ", " sun. ",
                " thu. ", " tue. ", " u. s. a. ", " wed. "
            );

        var widget = this;
        this.input.keydown(function(e) {
            var key = e.which || e.keyCode;
            var textVal = widget.input.val();
            if (!allowMultipleLineInput && textVal.length > widget.maxMsgLen) {
                widget.input.val(textVal.substring(0, widget.maxMsgLen));
            }

            if (key === 13) {
                arrangemeet(textVal);
                e.preventDefault();
                widget.sendMessage();
                widget.sendGAEvent();
            }
        });

        this.input.keyup(function(e) {
            var textVal = widget.input.val();
            if (textVal.length > 2) {
                if (!allowMultipleLineInput && textVal.match(/[\.\?!]\s/) != null) {
                    var isAbbr = false;
                    var lowerText = textVal.toLowerCase();
                    for (var i in widget.abbrs) {
                        if (endsWith(lowerText, widget.abbrs[i])) {
                            isAbbr = true;
                            break;
                        }
                    }
                    if (!isAbbr) {
                        e.preventDefault();
                        widget.sendMessage();
                        widget.sendGAEvent();
                    }
                }
            }
        });

        jQuery(".aco-close-chat").click(function() {
            jQuery(".aco-chat-wrapper").addClass("aco-hidden-chat");
        });

        jQuery("#aco-input-exit-btn").click(function() {
            jQuery(".aco-chat-wrapper").toggleClass("aco-hidden-chat");
        });

        jQuery(".aco-emoji-inner").click(function() {
            if (!jQuery(".aco-landing-bot")[0]) {
                acoWidgetStatusSwitch();
                if (jQuery(".aco-full-screen")[0]) {
                    jQuery(".aco-slide-fixed-chat").removeClass("aco-full-screen");
                    inQuit = false;
                    widget.sendInviteMessage();
                }
                jQuery(".aco-emoji-wrap").toggleClass("bounce");
                jQuery(".aco-chat-wrapper").toggleClass("aco-hidden-chat");
                setTimeout(function() {
                    jQuery(".aco-emoji-wrap").toggleClass("bounce");
                }, 500);
            }
        });

        jQuery('#aco-go-to-top').click(function() {
            jQuery('html, body').animate({ scrollTop: 0 }, 'fast');
        });

        jQuery(".aco-textarea").keyup(function(e) {
            this.style.height = "28px";
            this.style.height = (this.scrollHeight) + "px";
        });


        jQuery(".aco-textarea").focus(function() {
            jQuery(this).attr('placeholder', acoDefaultPlaceHolder);
        });

        jQuery(".aco-textarea").blur(function() {
            jQuery(this).attr('placeholder', 'Click to chat');
        });

        jQuery(".aco-full-close").click(function() {
            jQuery(".aco-slide-fixed-chat").removeClass("aco-full-screen");
            inQuit = false;
            widget.sendBgMessage("acoxHiddenMsg clicked close full screen");
            jQuery("#aco-input-exit-btn").show();
        });

        jQuery("#aco-input-chat-btn").click(function() {
            if (!acoInChatPlace) {
                acoInChatPlace = true;
                acoWidget.sendInviteMessage();
            }
            widget.showInputArea();
        });

        var isOnChat = false;
        var acoFlexRow = jQuery(".aco-flex-row");
        acoFlexRow.mouseenter(function() { isOnChat = true; });
        acoFlexRow.mouseleave(function() { isOnChat = false; });

        var acoInput = jQuery("#aco-input");
        var acoInputBtns = jQuery("#aco-input-btns");
        acoInput.focusout(function() {
            if (!isOnChat) {
                widget.showInputBtns();
            }
        });

        jQuery("#aco-input-search-btn").click(function() {
            widget.sendBgMessage("acoxHiddenMsg clicked search");
            acoInputBtns.fadeOut(function() {
                acoInput.show();
                acoInput.focus();
            });
            acoInChatPlace = false;
        });

        jQuery("#aco-input-q-btn").click(function() {
            widget.sendBgMessage("acoxHiddenMsg clicked qmark");
            acoInputBtns.fadeOut(function() {
                acoInput.show();
                acoInput.focus();
            });
        });

        jQuery("#aco-input-contact-btn").click(function() {
            widget.sendBgMessage("acoxHiddenMsg clicked contact");
            acoInputBtns.fadeOut(function() {
                acoInput.show();
                acoInput.focus();
            });
            acoInChatPlace = false;
        });
        jQuery("#aco-input-audio-btn").click(function() {
            widget.switchAudio();
        });
    }

    AcoWidget.prototype.turnOffVoice =
        function turnOffVoice() {
            var acoAudioIcon = jQuery("#aco-audio-icon");
            this.sendBgMessage("acoSetVoiceOff");
            jQuery("#aco-input-audio-btn").attr("title", 'Audio off');
            acoAudioIcon.removeClass("aco-f-volume-up");
            acoAudioIcon.addClass("aco-f-volume-off");
            this.sendBgMessage("acoxHiddenMsg widget audio off");
            acoCookieSet('audio', 'off', 7);

            var audioIcon2 = jQuery('#aco-volume-icon');
            if (audioIcon2) {
                audioIcon2.removeClass("aco-f-volume-up");
                audioIcon2.addClass("aco-f-volume-off");
            }
        }


    AcoWidget.prototype.turnOnVoice =
        function turnOffVoice() {
            this.sendBgMessage("acoSetVoiceOn");
            var acoAudioIcon = jQuery("#aco-audio-icon");
            jQuery("#aco-input-audio-btn").attr("title", 'Audio on');
            acoAudioIcon.removeClass("aco-f-volume-off");
            acoAudioIcon.addClass("aco-f-volume-up");
            this.sendBgMessage("acoxHiddenMsg widget audio on");
            acoCookieSet('audio', 'on', 7);

            var audioIcon2 = jQuery('#aco-volume-icon');
            if (audioIcon2) {
                audioIcon2.removeClass("aco-f-volume-off");
                audioIcon2.addClass("aco-f-volume-up");
            }
        }

    AcoWidget.prototype.switchAudio =
        function switchAudio() {
            var acoAudioIcon = jQuery("#aco-audio-icon");
            var acoInputAudioBtn = jQuery("#aco-input-audio-btn");
            var title = acoInputAudioBtn.attr("title");
            if (title == 'Audio on') {
                this.sendBgMessage("acoSetVoiceOff");
                acoInputAudioBtn.attr("title", 'Audio off');
                acoAudioIcon.removeClass("aco-f-volume-up");
                acoAudioIcon.addClass("aco-f-volume-off");
                this.sendBgMessage("acoxHiddenMsg widget audio off");
                acoCookieSet('audio', 'off', 7);
            } else {
                this.sendBgMessage("acoSetVoiceOn");
                acoInputAudioBtn.attr("title", 'Audio on');
                acoAudioIcon.removeClass("aco-f-volume-off");
                acoAudioIcon.addClass("aco-f-volume-up");
                this.sendBgMessage("acoxHiddenMsg widget audio on");
                acoCookieSet('audio', 'on', 7);
            }

            var audioIcon2 = jQuery('#aco-volume-icon');
            if (audioIcon2) {
                if (audioIcon2.hasClass("aco-f-volume-up")) {
                    audioIcon2.removeClass("aco-f-volume-up");
                    audioIcon2.addClass("aco-f-volume-off");
                } else {
                    audioIcon2.removeClass("aco-f-volume-off");
                    audioIcon2.addClass("aco-f-volume-up");
                }
            }
        };

    AcoWidget.prototype.closeBotBubble =
        function closeBotBubble() {
            acoMsgClosed = true;
            acoCookieSet('aco_widget_closed', "1", 1);
            jQuery(".aco-chat-wrapper").addClass("aco-hidden-chat");
        };

    AcoWidget.prototype.initAudio =
        function initAudio() {
            var acoInputAudioBtn = jQuery("#aco-input-audio-btn");
            if (acoVoice === false) {
                this.sendBgMessage("acoSetVoiceOff");
                acoInputAudioBtn.hide();
                return;
            }

            var audio = acoCookieGet('audio');
            var audioIcon2 = jQuery('#aco-volume-icon');
            var acoAudioIcon = jQuery("#aco-audio-icon");
            if (audio != undefined && audio == 'off') {
                this.bgSendBgMessage("acoSetVoiceOff");
                acoInputAudioBtn.attr("title", 'Audio off');
                acoAudioIcon.removeClass("aco-f-volume-up");
                acoAudioIcon.addClass("aco-f-volume-off");
                if (audioIcon2) {
                    audioIcon2.removeClass("aco-f-volume-up");
                    audioIcon2.addClass("aco-f-volume-off");
                }
            } else {
                this.bgSendBgMessage("acoSetVoiceOn");
                acoInputAudioBtn.attr("title", 'Audio on');
                acoAudioIcon.removeClass("aco-f-volume-off");
                acoAudioIcon.addClass("aco-f-volume-up");
                if (audioIcon2) {
                    audioIcon2.removeClass("aco-f-volume-off");
                    audioIcon2.addClass("aco-f-volume-up");
                }
            }
        };

    AcoWidget.prototype.showInputArea =
        function showInputArea() {
            var acoInput = jQuery("#aco-input");
            jQuery("#aco-input-btns").hide();
            acoInput.show();
            acoInput.focus();
        };

    AcoWidget.prototype.closeKeyboard =
        function closeKeyboard() {
            // no operation
        };

    AcoWidget.prototype.showInputBtns =
        function showInputBtns() {
            jQuery("#aco-input").hide();
            jQuery("#aco-input-btns").show();
        };

    AcoWidget.prototype.sendGAEvent =
        function sendGAEvent() {
            var nowStr = new Date().getTime().toString();
            if ((typeof ga) === 'function') {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Acobot',
                    eventAction: 'Interaction with AI',
                    eventLabel: "AI Interaction " + nowStr
                });
            }
        };


    AcoWidget.prototype.animateText =
        function animateText() {
            var bubble = this.bubbles.find('.aco-single-bubble-line').last();
            bubble.addClass('acoAnimated acoFadeInUp');
            setTimeout(function() {
                bubble.removeClass('acoFadeInUp').addClass("hvr-wobble-vertical");
            }, 2000);
        };


    AcoWidget.prototype.clearOldMsg =
        function clearOldMsg() {
            if (this.bubbles == undefined) return;
            var size = this.bubbles.find('.aco-single-bubble-line').length;
            if (size < 3) return;
            var removing = this.bubbles.find('.aco-single-bubble-line')[0];
            this.bubbles.find(removing).addClass("acoFadeOut");
            var widget = this;
            setTimeout(function() {
                jQuery(removing).remove();
                widget.clearOldMsg();
            }, 1100);
        };


    AcoWidget.prototype.clearPreviousMsg =
        function clearPreviousMsg(from, to) {
            var msgs = this.bubbles.find('.aco-single-bubble-line');
            var removing = msgs[0];
            if (msgs.length > 0 && from <= to) {
                var widget = this;
                this.bubbles.find(removing).addClass("acoFadeOut");
                setTimeout(function() {
                    jQuery(removing).remove();
                    widget.clearPreviousMsg(from + 1, to);
                }, 1100);
            }
        };

    AcoWidget.prototype.clearPreviousBotMsg =
        function clearPreviousBotMsg() {
            var prebotMsg = this.bubbles.find('.aco-single-bubble-line').last();
            var len = this.bubbles.find('.aco-single-bubble-line').length;
            if (prebotMsg.hasClass('aco-machine-answer')) {
                this.clearPreviousMsg(0, len - 1);
            } else {
                if (len >= 2) {
                    this.clearPreviousMsg(0, len - 2);
                } else {
                    this.clearPreviousMsg(0, 0);
                }
            }
        };

    AcoWidget.prototype.removeAllMsg =
        function instantAllMsg() {
            var msgs = this.bubbles.find('.aco-single-bubble-line');
            jQuery.each(msgs, function(nidx, msg) {
                jQuery(msg).remove();
            });
        };

    AcoWidget.prototype.buildSent =
        function buildSent(message) {
            message = message.replace("<", "&lt;");
            message = message.replace(">", "&gt;");
            this.bubbles.append(this.buildHTML.me(message));
            this.animateText();
        };


    AcoWidget.prototype.buildRecieved =
        function buildRecieved(widget, message) {
            if (message.charAt(0) !== '[' || message === '[]') {
                return;
            }
            var msgs = jQuery.parseJSON(message);
            var lastUserMsg;
            var lastBotMsg;

            jQuery.each(msgs, function(idx, msgObj) {
                var msgText = msgObj.cnt;
                var msgid = parseInt(msgObj.id);
                if (msgText && msgid > widget.smsgid && !startsWith(msgText, 'acoxHiddenMsg')) {
                    widget.smsgid = msgid;
                    if (msgObj.by !== 'u') {
                        lastBotMsg = msgText;
                    } else {
                        lastUserMsg = msgText;
                    }
                }
            });

            if (lastBotMsg) {
                widget.lastReceived = new Date().getTime();
                lastBotMsg = acoParseSearchResult(lastBotMsg);
                lastBotMsg = acoCheckChatInputDisplay(lastBotMsg);
                lastBotMsg = acoParseLeadCaptured(lastBotMsg);
                var cmds = acoParseCmds(lastBotMsg);
                if (cmds != undefined && cmds.length > 0) {
                    lastBotMsg = acoRemoveCmds(lastBotMsg);
                }
                lastBotMsg = acoParsePlaceholder(lastBotMsg);
                lastBotMsg = acoParseAllowMultipleLine(lastBotMsg);
                lastBotMsg = acoParseVoice(lastBotMsg);
                lastBotMsg = acoParseEcom(lastBotMsg);
                lastBotMsg = acoParseInvite(lastBotMsg);
                var replyBtnHtml = acoParseReplyBtn(lastBotMsg);
                if (replyBtnHtml !== '') {
                    lastBotMsg = acoCleanReplyBtn(lastBotMsg);
                }
                if (!widget.inChatting && lastUserMsg) {
                    widget.bubbles.append(widget.buildHTML.me(lastUserMsg));
                }

                var t = 1500;
                if (showQuit) {
                    showQuit = false;
                    widget.removeAllMsg();
                    jQuery(".aco-slide-fixed-chat").addClass("aco-full-screen");
                    jQuery("#aco-input-exit-btn").hide();
                    jQuery(".aco-textarea").attr('placeholder', "You're interacting with AI. Just chat!");
                    // t = 3000;
                } else {
                    jQuery("#aco-input-exit-btn").show();
                    widget.clearPreviousBotMsg();
                }



                var url;
                var matches = lastBotMsg.match(/href=\s*\"(.*?)\"/);
                if (!matches) {
                    matches = lastBotMsg.match(/href=\s*'(.*?)'/);
                }
                if (matches) {
                    url = matches[1].trim();
                }


                var count = (lastBotMsg.match(/<a/g) || []).length;
                if (widget.inChatting && url && lastBotMsg.search(/onclick/i) === -1 && count < 2) {
                    lastBotMsg = lastBotMsg + replyBtnHtml;
                    var locUrl = window.location.href;
                    var cleanedLoc = acoCleanURL(locUrl);
                    var locHost = acoExtractHostname(cleanedLoc);
                    if (startsWith(url, "/")) {
                        if (startsWith(url, "//")) {
                            if (startsWith(locUrl, "https")) {
                                url = "https:" + url;
                            } else {
                                url = "http:" + url;
                            }
                        } else {
                            if (startsWith(locUrl, "https")) {
                                url = "https://" + locHost + url;
                            } else {
                                url = "http://" + locHost + url;
                            }
                        }
                    }

                    if (startsWith(url, "http")) {
                        if (acoIsPreviewUrl(locUrl)) {
                            var endLocIdx = locUrl.indexOf("?");
                            if (endLocIdx > 0) {
                                locUrl = locUrl.substring(0, endLocIdx);
                            }
                            var naviPreviewUrl = locUrl + '?url=' + encodeURI(url);
                            setTimeout(widget.gotoNewPage, 200, naviPreviewUrl);
                        } else if (acoIsTestUrl(locUrl)) {
                            var naviTestUrl = 'http://acobot.ai/demo/show?url=' + encodeURI(url);
                            setTimeout(widget.testGotoNewPage, 200, naviTestUrl);
                        } else {
                            var cleanedNewUrl = acoCleanURL(url);
                            // if (cleanedLoc != cleanedNewUrl) {
                            if (locHost == acoExtractHostname(cleanedNewUrl)) {
                                widget.inChatting = false;
                                setTimeout(widget.gotoNewPage, 200, url);
                            } else if (acoHasHiddenLink(lastBotMsg)) {
                                var prebotElem = this.bubbles.find('.aco-single-bubble-line').last();
                                prebotElem.html(acoDisplayLink(lastBotMsg));
                            }
                            // } else {
                            //     scrollToAcoTarget(url);
                            // }
                        }
                    }
                } else {
                    if (lastBotMsg.indexOf('<msg/>') !== -1) {
                        var lastBotMsgs = lastBotMsg.split("<msg/>");
                        var i = 0;
                        jQuery.each(lastBotMsgs, function(nidx, bmsg) {
                            bmsg = bmsg.trim();
                            if (bmsg) {
                                if ((i + 1) === lastBotMsgs.length) {
                                    bmsg = "<p>" + bmsg + "</p>" + replyBtnHtml;
                                }
                                setTimeout(function() {
                                    if (bmsg) {
                                        bmsg = "<p>" + bmsg + "</p>";
                                        if (bmsg.indexOf("<img ") !== -1) {
                                            widget.bubbles.append(widget.buildHTML.img(bmsg));
                                        } else {
                                            widget.bubbles.append(widget.buildHTML.bot(bmsg));
                                        }
                                        widget.animateText();
                                    }
                                }, i * t);
                                i++;
                            }
                        });
                    } else {
                        lastBotMsg = "<p>" + lastBotMsg + "</p>";
                        if (lastBotMsg.indexOf("<img ") !== -1) {
                            widget.bubbles.append(widget.buildHTML.img(lastBotMsg));
                        } else {
                            widget.bubbles.append(widget.buildHTML.bot(lastBotMsg + replyBtnHtml));
                        }
                        widget.animateText();
                    }

                    jQuery(".aco-emoji-wrap").toggleClass("bounce");
                    setTimeout(function() {
                        jQuery(".aco-emoji-wrap").toggleClass("bounce");
                    }, 750);
                }

                acoRunCmds(cmds);
            }
        };


    AcoWidget.prototype.gotoNewPage =
        function gotoNewPage(url) {
            acoCookieSet(acoWidget.groupid + '-aconavi', "1", 30);
            var locationHref = document.location.href;
            if (locationHref.indexOf("acobot.ai/try/") !== -1) {
                var internalUrl = "http://acobot.ai/demo/show?url=" + encodeURI(url);
                jQuery('#demo-wrapper').html('<iframe src="' + internalUrl + '" id="site-frame" class="site-frame"></iframe>');
            } else if (locationHref.indexOf("http://acobot.ai/group/") !== -1) {
                var internalUrl = "http://acobot.ai/demo/show?url=" + encodeURI(url);
                jQuery('#test-home').attr("src", internalUrl);
            } else {
                jQuery(location).attr("href", url);
            }
        };

    AcoWidget.prototype.testGotoNewPage =
        function testGotoNewPage(url) {
            jQuery('#test-home').attr("src", url);
        };

    AcoWidget.prototype.getMsg =
        function getMsg(id) {
            if (id !== this.getMsgId) return;
            this.receiveMessage();
            var timeout = this.receiveInterval; // 3 secs
            var now = new Date().getTime();
            if (now - this.lastActiveTime > this.idle_timeout) {
                timeout = 10000; // 10 secs
            }
            if (now - this.lastActiveTime > (this.idle_timeout * 2)) {
                timeout = 20000; // 20 secs
            }

            setTimeout(this.getMsg, timeout, id);
        };



    AcoWidget.prototype.receiveMessage =
        function receiveMessage() {
            var burl = 'https://chat.acobot.ai/uget?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey + '&instance=' + this.wid + '';
            var widget = this;
            jQuery.ajax({
                url: burl,
                dataType: 'jsonp',
                success: function(resp) {
                    //widget.clearOldMsg();
                    widget.buildRecieved(widget, resp);
                }
            });
        };

    AcoWidget.prototype.sendMessage =
        function sendMessage() {
            acoInChatPlace = true;
            var now = new Date().getTime();
            if (now - this.lastSend < 1000) {
                return;
            }

            this.lastSend = now;
            this.inChatting = true;
            var text = this.input.val();
            if (!allowMultipleLineInput && text.length > this.maxMsgLen) {
                text = text.substring(0, this.maxMsgLen);
            }

            if (!text || !text.trim()) return;
            this.lastActiveTime = now;
            this.getMsgId = now;
            setTimeout(this.getMsg, this.receiveInterval, now);

            // this.clearOldMsg();
            this.replyBtns.html('');
            this.buildSent(text);
            this.input.val('');
            this.input.focus();
            markChatted();
            this.chatted = true;
            this.chatting = true;

            var path = window.location.pathname;

            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey + '&url=' + path + '';
            var widget = this;
            jQuery.ajax({
                url: burl + '&msg=' + encodeURIComponent(text),
                dataType: 'jsonp',
                success: function(resp) {
                    widget.receiveMessage();
                },
                complete: function(XMLHttpRequest, status) {}
            });
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                document.activeElement.blur();
            }
        };

    AcoWidget.prototype.sendInviteMessage =
        function sendInviteMessage() {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;

            var path = window.location.pathname;
            console.log("current path: " + path);

            if (isEcommGroup) {
                var addedCartProductPath = acoCookieGet("aco_ecomm_product_path_in_cart");

                if (addedCartProductPath !== null && addedCartProductPath === path) {
                    path = path + " ADDED2CART";
                    acoCookieSet("aco_ecomm_product_path_in_cart", "", 1);
                } else {}

                var url = window.location.href;
                if (url === ecommCartUrl) {
                    if (!jQuery(".woocommerce-cart-form").length && !jQuery(".cart").length && !jQuery("form[action='/cart']").length) { // cart  empty
                        path += " EMPTYCART";
                    } else {}
                }
            }


            jQuery.ajax({
                url: burl + '&msg=' + this.inviteMessage + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };


    // jQuery(location).attr('pathname'),
    AcoWidget.prototype.sendBgMessage =
        function sendBgMessage(msg) {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;
            var path = window.location.pathname;
            jQuery.ajax({
                url: burl + '&msg=' + encodeURIComponent(msg) + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };

    AcoWidget.prototype.sendMuc =
        function sendMuc() {
            var burl = 'https://acobot.ai/api/muc/' + this.groupid;
            jQuery.ajax({
                url: burl,
                dataType: 'jsonp',
                success: function(result) {}
            });
        };

    AcoWidget.prototype.bgSendBgMessage =
        function bgSendBgMessage(msg) {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var path = window.location.pathname;
            jQuery.ajax({
                url: burl + '&msg=' + msg + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {}
            });
        };

    AcoWidget.prototype.sendMessageWithCtx =
        function sendMessageWithCtx(msg, ctx) {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;
            msg = '<set-context>' + ctx + '</set-context>' + msg;
            var path = window.location.pathname;
            jQuery.ajax({
                url: burl + '&msg=' + encodeURIComponent(msg) + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };

    AcoWidget.prototype.sendEndpageInviteMessage =
        function sendEndpageInviteMessage() {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var path = window.location.pathname;
            var widget = this;
            jQuery.ajax({
                url: burl + '&msg=' + this.inviteMessage + ' endpage&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };

    AcoWidget.prototype.sendQuitpageInviteMessage =
        function sendQuitpageInviteMessage() {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;
            var path = window.location.pathname;
            jQuery.ajax({
                url: burl + '&msg=' + this.inviteMessage + ' quitpage&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };

    AcoWidget.prototype.checkInPageNavi =
        function checkInPageNavi() {
            var aconavi = acoCookieGet(this.groupid + '-aconavi');
            return aconavi != undefined && aconavi === "1";
        };

    AcoWidget.prototype.resetPageNavi =
        function resetPageNavi() {
            acoCookieSet(this.groupid + '-aconavi', "0", 30);
        };


    AcoWidget.prototype.openWidget =
        function openWidget(isNeedReceiveMsg) {
            var openCount = 0;
            var widget = this;

            var openTimer =
                setInterval(function() {
                    jQuery(".aco-chat-wrapper").attr("style", "");
                    var bubbles = widget.bubbles.find('.aco-single-bubble-line');
                    if (bubbles && bubbles.length > 0) {
                        setTimeout(function() {
                            jQuery(".aco-emoji-wrap").toggleClass("bounce");
                            if (!acoWidgetIsClosed()) {
                                jQuery(".aco-chat-wrapper").removeClass("aco-hidden-chat");
                            }
                            setTimeout(function() {
                                jQuery(".aco-emoji-wrap").toggleClass("bounce");
                            }, 500);
                        }, 1000);
                        clearInterval(openTimer);
                        return;
                    }
                    openCount++;
                    if (openCount > 5) {
                        clearInterval(openTimer);
                    }
                }, 1000);
            if (isNeedReceiveMsg) {
                this.receiveMessage();
            }
        };

    AcoWidget.prototype.startWidget =
        function startWidget() {
            var isNeedReceiveMsg = true;
            if (!this.checkInPageNavi()) {
                isNeedReceiveMsg = false;
                this.sendInviteMessage();
            } else if (isEcommGroup) {
                var locUrl = window.location.href;
                var needInvite = false;
                if (ecommProductPathPtn != null && ecommProductPathPtn.test(locUrl)) {
                    needInvite = true;
                }
                if (locUrl.includes('product-category')) {
                    needInvite = true;
                }
                if (locUrl.includes('product-tag')) {
                    needInvite = true;
                }
                if (locUrl.includes('cart')) {
                    needInvite = true;
                }
                if (locUrl.includes('collections')) {
                    needInvite = true;
                }

                if (needInvite) {
                    isNeedReceiveMsg = false;
                    this.sendInviteMessage();
                } else {
                    var invite = acoCookieGet("aco-invite");
                    if (invite != null && invite == "1") {
                        isNeedReceiveMsg = false;
                        this.sendInviteMessage();
                        acoCookieSet("aco-invite", "0");
                    } else {}
                }
            }
            this.openWidget(isNeedReceiveMsg);
            this.resetPageNavi();
        };
    return AcoWidget;
}();


var acoChatOnFocus = false;
var acoMsgClosed = false;
var acoDefaultPlaceHolder = 'Enter or Enter(2) to send';
var acoInChatPlace = true;
var AcoMobileWidget = function() {
    function AcoMobileWidget() {
        _classCallCheck(this, AcoMobileWidget);

        this.divs = '<link rel="stylesheet" href="https://acobot.ai/widget/css/widget_mobile_v33.css"> <link rel="stylesheet" href="//acobot.ai/widget/css/font-awesome.css"> <style> .aco-invite-bubble {background-color:#182433!important;} .aco-invite-bubble:after {border-bottom-color:#182433!important;} .aco-icon-circle {background-color:#182433!important;} .aco-color{color:#182433!important;} .aco-bot-bubble {background-color:#182433!important;} .aco-bot-bubble:after {border-top-color: #182433!important;} </style> <div class="aco-mb aco-modern" style="display:block;"> <div class="aco-bg" style="display:none;"></div> <div> <div class="aco-top" style="display:none;"> <div class="aco-user" style="display:none;"> <div class="aco-user-inner"> <div class="aco-user-msg"> </div> <div class="aco-user-close"> <i class="aco-f aco-f-close"></i> </div> </div> </div> <div class="aco-bot" style="display:none;"> <div class="aco-bot-inner"> </div> <div class="aco-bot-avatar" onclick="acoWidget.tapToChat();"> <img src="//d1vrgybx2dsdrl.cloudfront.net/sites/default/files/avatars/alien_1_1f47d.png" alt=""> </div> </div> </div> <div class="aco-middle"> <div class="aco-loader" style="display:none;"> <i class="aco-f aco-f-refresh aco-f-spin aco-f-3x aco-f-fw" aria-hidden="true"></i> <span class="sr-only">Refreshing...</span> </div> <div class="aco-speaking" style="display:none;"> <div class="aco-speaking-icon"> <i class="aco-f aco-f-microphone"></i> </div> <div class="aco-speaking-label"> Speak Now </div> </div> <div id="aco-img" style="display:none;"></div> </div> <div class="aco-btm" style="display:none;"> <div class="aco-input" style="display:none;"> <textarea class="aco-textarea" id="aco-input" placeholder="Type a reply"></textarea> <div class="aco-icon-audio"> <div id="aco-icon-audio-div" style="float:left;"> <i id="aco-icon-audio" class="aco-f aco-f-volume-up"></i> </div> <div id="aco-icon-demo-div" style="float:left;margin-left:15px;font-size:18px;margin-top:-2px;display:none;"> <i id="aco-icon-demo" class="aco-f aco-f-sign-out"></i> </div> </div> </div> <div class="aco-invite" style="display:none;"> <div class="aco-invite-avatar" onclick="acoWidget.tapToChat();"> <img src="//d1vrgybx2dsdrl.cloudfront.net/sites/default/files/avatars/alien_1_1f47d.png" alt=""> </div> <div class="aco-invite-inner"> <div class="aco-invite-bubble"> <div class="aco-invite-msg"> </div> <div class="aco-invite-close"> <i class="aco-f aco-f-close"></i> </div> </div> </div> </div> </div> </div> </div> <div class="aco-start-btn"> <div id="aco-chat-btn" class="aco-emoji-wrap bounce"> <div class="aco-emoji-inner hvr-buzz-out aco-rubber"> <span class="aco-f-stack aco-f-2x aco-color"> <i class="aco-f aco-f-circle aco-f-stack-2x"></i> <i class="aco-f aco-f-comments aco-f-stack-1x aco-f-inverse"></i> </span> </div> </div> <div id="aco-cancel-btn" style="display:none;" class="aco-emoji-wrap"> <div class="aco-emoji-inner hvr-buzz-out aco-rubber"> <span class="aco-f-stack aco-f-2x aco-color"> <i class="aco-f aco-f-circle aco-f-stack-2x"></i> <i class="aco-f aco-f-times aco-f-stack-1x aco-f-inverse"></i> </span> </div> </div> </div> <div class="aco-beacon" id="aco-beacon"></div> ';

        var body = jQuery('body');
        body.append(this.divs);

        this.input = jQuery('#aco-input');
        this.bubbles = jQuery('.aco-bot-inner');

        this.getMsgId = new Date().getTime();
        this.wid = new Date().getTime();
        this.lastSend = 0;
        this.inChatting = false;
        this.hasMsg = false;

        this.uid = getAcoUid();

        this.groupid = 591066;
        this.groupkey = "DvbQ1JvrMOS2VQtr";
        this.inviteMessage = "inviteMessage en";

        this.smsgid = 0;
        this.lastActiveTime = new Date().getTime();

        this.idle_timeout = 120000;
        this.receiveInterval = 3000;
        this.lastReceived = new Date().getTime();
        this.maxMsgLen = 100;
        this.chatted = getChatted();
        this.chatting = false;
        acoMsgClosed = acoWidgetIsClosed();

        this.abbrs =
            new Array(" a.i. ", " apr. ", " aug. ", " dec. ", " dr. ", " jr. ", " etc. ", " feb. ", " fri. ", " inc. ", " jan. ", " jul. ", " jun. ",
                " mar. ", " may. ", " mon. ", " mr. ", " mrs. ", " ms. ", " nov. ", " oct. ", " p.s. ", " sat. ", " sep. ", " sept. ", " sr. ", " st. ", " sun. ",
                " thu. ", " tue. ", " u. s. a. ", " wed. "
            );

        var widget = this;
        this.input.keydown(function(e) {
            var key = e.which || e.keyCode;
            var textVal = widget.input.val();
            if (textVal.length > widget.maxMsgLen) {
                widget.input.val(textVal.substring(0, widget.maxMsgLen));
            }

            if (key === 13) {
                arrangemeet(textVal);
                e.preventDefault();
                widget.sendMessage();
                widget.sendGAEvent();
            }
        });

        this.input.keyup(function(e) {
            var textVal = widget.input.val();
            if (textVal.length > 2) {
                if (!allowMultipleLineInput && textVal.match(/[\.\?!]\s/) != null) {
                    var isAbbr = false;
                    var lowerText = textVal.toLowerCase();
                    for (var i in widget.abbrs) {
                        if (endsWith(lowerText, widget.abbrs[i])) {
                            isAbbr = true;
                            break;
                        }
                    }
                    if (!isAbbr) {
                        e.preventDefault();
                        widget.sendMessage();
                        widget.sendGAEvent();
                    }
                }
            }
        });

        jQuery(".aco-user-close").click(function() {
            jQuery("#aco-chat-btn").show();
            jQuery(".aco-bg").hide();
            jQuery(".aco-top").fadeOut();
            acoMsgClosed = true;
            acoCookieSet('aco_widget_closed', "1", 1);
            jQuery(".aco-btm").fadeOut();
        });

        var acoTextArea = jQuery(".aco-textarea");
        acoTextArea.keyup(function(e) {
            this.style.height = "28px";
            this.style.height = (this.scrollHeight) + "px";
        });

        acoTextArea.focus(function() {
            jQuery(this).attr('placeholder', acoDefaultPlaceHolder);
            widget.showTop();
            acoChatOnFocus = true;
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                jQuery('.aco-top').addClass("aco-ios-fix");
            }
        });

        acoTextArea.blur(function() {
            jQuery(this).attr('placeholder', 'Click to chat');
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                jQuery('.aco-top').removeClass("aco-ios-fix");
            }
        });

        jQuery(".aco-icon-audio").click(function() {
            acoMobileShowMsg = true;
            widget.switchAudio();
        });

        jQuery("#aco-chat-btn").click(function() {
            if (!acoMobileShowMsg) {
                acoMobileShowMsg = true;
            }
            widget.topShowBotMsg();
            widget.showInputArea();
            acoCookieSet('aco_widget_closed', "0", 1);
            jQuery("#aco-chat-btn").hide();
        });
    }

    AcoMobileWidget.prototype.topShowUserMsg =
        function topShowUserMsg(msg) {
            jQuery(".aco-bot").hide();
            jQuery(".aco-user-msg").html("<p>" + msg + "</p>");
            jQuery(".aco-user").show();
            jQuery(".aco-top").fadeIn();
            jQuery(".aco-bg").fadeIn();
        };


    AcoMobileWidget.prototype.topShowBotMsg =
        function topShowBotMsg() {
            if (acoMobileShowMsg) {
                jQuery(".aco-user").hide();
                jQuery(".aco-bot").show();
                jQuery(".aco-top").fadeIn();
                jQuery(".aco-bg").fadeIn();
            }
            if (jQuery(window).width() < 360) {
                acoWidget.closeKeyboard();
            }
        };

    AcoMobileWidget.prototype.appendBotBubble =
        function appendBotBubble(msg) {
            jQuery(".aco-bot-inner").append('<div class="aco-bot-bubble"><div class="aco-bot-msg">' + msg + "</div></div>");
        };
    AcoMobileWidget.prototype.appendLastBotBubble =
        function appendLastBotBubble(msg) {
            jQuery(".aco-bot-inner").append('<div class="aco-bot-bubble"><div class="aco-bot-msg">' + msg +
                '</div><div class="aco-bot-close" onclick="acoWidget.closeBotBubble();"><i class="aco-f aco-f-close"></i></div></div>');
        };

    AcoMobileWidget.prototype.clearBotBubble =
        function clearBotBubble() {
            jQuery(".aco-bot-inner").html('');
        };

    AcoMobileWidget.prototype.closeBotBubble =
        function closeBotBubble() {
            if (acoLandingURL !== "") {
                jQuery(location).attr("href", acoLandingURL);
            } else {
                jQuery("#aco-chat-btn").show();
                jQuery(".aco-top").fadeOut();
                jQuery(".aco-bg").hide();
                acoMsgClosed = true;
                acoCookieSet('aco_widget_closed', "1", 1);
                jQuery(".aco-input").hide();
                jQuery(".aco-btm").fadeOut();
                if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    jQuery('.aco-top').removeClass("aco-ios-fix");
                }
            }
        };


    AcoMobileWidget.prototype.showTop =
        function showTop() {
            acoMsgClosed = false;
            acoCookieSet('aco_widget_closed', "0", 1);
            if (this.hasMsg) {
                jQuery(".aco-top").fadeIn();
            }
        };

    AcoMobileWidget.prototype.hideBtm =
        function hideBtm() {
            jQuery(".aco-btm").fadeOut();
        };


    AcoMobileWidget.prototype.turnOffVoice =
        function turnOffVoice() {
            var audioIcon = jQuery('#aco-icon-audio');
            this.sendBgMessage("acoSetVoiceOff");
            audioIcon.removeClass("aco-f-volume-up");
            audioIcon.addClass("aco-f-volume-off");
            this.sendBgMessage("acoxHiddenMsg widget audio off");
            acoCookieSet('audio', 'off', 7);

            var audioIcon2 = jQuery('#aco-volume-icon');
            if (audioIcon2) {
                audioIcon2.removeClass("aco-f-volume-up");
                audioIcon2.addClass("aco-f-volume-off");
            }

            var audioIcon3 = jQuery("#aco-audio-icon");
            if (audioIcon3) {
                audioIcon3.removeClass("aco-f-volume-up");
                audioIcon3.addClass("aco-f-volume-off");
            }
        };

    AcoMobileWidget.prototype.turnOnVoice =
        function turnOffVoice() {
            var audioIcon = jQuery('#aco-icon-audio');
            this.sendBgMessage("acoSetVoiceOn");
            audioIcon.removeClass("aco-f-volume-off");
            audioIcon.addClass("aco-f-volume-up");
            this.sendBgMessage("acoxHiddenMsg widget audio on");
            acoCookieSet('audio', 'on', 7);

            var audioIcon2 = jQuery('#aco-volume-icon');
            if (audioIcon2) {
                audioIcon2.removeClass("aco-f-volume-off");
                audioIcon2.addClass("aco-f-volume-up");
            }

            var audioIcon3 = jQuery("#aco-audio-icon");
            if (audioIcon3) {
                audioIcon3.removeClass("aco-f-volume-off");
                audioIcon3.addClass("aco-f-volume-up");
            }
        };

    AcoMobileWidget.prototype.switchAudio =
        function switchAudio() {
            var audioIcon = jQuery('#aco-icon-audio');
            if (audioIcon.hasClass("aco-f-volume-up")) {
                this.sendBgMessage("acoSetVoiceOff");
                audioIcon.removeClass("aco-f-volume-up");
                audioIcon.addClass("aco-f-volume-off");
                this.sendBgMessage("acoxHiddenMsg widget audio off");
                acoCookieSet('audio', 'off', 7);
            } else {
                this.sendBgMessage("acoSetVoiceOn");
                audioIcon.removeClass("aco-f-volume-off");
                audioIcon.addClass("aco-f-volume-up");
                this.sendBgMessage("acoxHiddenMsg widget audio on");
                acoCookieSet('audio', 'on', 7);
            }

            var audioIcon2 = jQuery('#aco-volume-icon');
            if (audioIcon2) {
                if (audioIcon2.hasClass("aco-f-volume-up")) {
                    audioIcon2.removeClass("aco-f-volume-up");
                    audioIcon2.addClass("aco-f-volume-off");
                } else {
                    audioIcon2.removeClass("aco-f-volume-off");
                    audioIcon2.addClass("aco-f-volume-up");
                }
            }

            var audioIcon3 = jQuery("#aco-audio-icon");
            if (audioIcon3) {
                if (audioIcon3.hasClass("aco-f-volume-up")) {
                    audioIcon3.removeClass("aco-f-volume-up");
                    audioIcon3.addClass("aco-f-volume-off");
                } else {
                    audioIcon3.removeClass("aco-f-volume-off");
                    audioIcon3.addClass("aco-f-volume-up");
                }
            }
        };

    AcoMobileWidget.prototype.initAudio =
        function initAudio() {
            var audioIcon = jQuery('#aco-icon-audio');
            if (acoVoice === false) {
                this.bgSendBgMessage("acoSetVoiceOff");
                jQuery('.aco-icon-audio').hide();
                return;
            }
            var audio = acoCookieGet('audio');
            var audioIcon3 = jQuery("#aco-audio-icon");
            if (audio != undefined && audio == 'off') {
                this.bgSendBgMessage("acoSetVoiceOff");
                audioIcon.removeClass("aco-f-volume-up");
                audioIcon.addClass("aco-f-volume-off");
            } else {
                this.bgSendBgMessage("acoSetVoiceOn");
                audioIcon.removeClass("aco-f-volume-off");
                audioIcon.addClass("aco-f-volume-up");
            }

            if (audioIcon3 && audio == 'off') {
                if (audioIcon3.hasClass("aco-f-volume-up")) {
                    audioIcon3.removeClass("aco-f-volume-up");
                    audioIcon3.addClass("aco-f-volume-off");
                } else {
                    audioIcon3.removeClass("aco-f-volume-off");
                    audioIcon3.addClass("aco-f-volume-up");
                }
            }
        };

    AcoMobileWidget.prototype.showInputArea =
        function showInputArea() {
            jQuery(".aco-btm").fadeIn();
            jQuery(".aco-input").show();
        };

    AcoMobileWidget.prototype.closeKeyboard =
        function closeKeyboard() {
            document.activeElement.blur();
            jQuery(".aco-input").blur();
        };

    AcoMobileWidget.prototype.tapToChat =
        function tapToChat() {
            jQuery("#aco-input").focus();
        };

    AcoMobileWidget.prototype.msgToTop =
        function msgToTop() {
            this.showTop();
        };

    AcoMobileWidget.prototype.sendGAEvent =
        function sendGAEvent() {
            var nowStr = new Date().getTime().toString();
            if ((typeof ga) === 'function') {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Acobot',
                    eventAction: 'Interaction with AI',
                    eventLabel: "AI Interaction " + nowStr
                });
            }
        };

    AcoMobileWidget.prototype.buildSent =
        function buildSent(message) {
            acoMsgClosed = false;
            acoCookieSet('aco_widget_closed', "0", 1);
            message = message.replace("<", "&lt;");
            message = message.replace(">", "&gt;");
            this.topShowUserMsg(message);
        };


    AcoMobileWidget.prototype.buildRecieved =
        function buildRecieved(widget, message) {
            jQuery(".aco-loader").hide();
            jQuery(".aco-speaking").hide();

            if (message.charAt(0) !== '[' || message === '[]') {
                return;
            }
            var msgs = jQuery.parseJSON(message);
            var lastBotMsg;

            jQuery.each(msgs, function(idx, msgObj) {
                var msgText = msgObj.cnt;
                var msgid = parseInt(msgObj.id);
                if (msgText && msgid > widget.smsgid && !startsWith(msgText, 'acoxHiddenMsg')) {
                    widget.smsgid = msgid;
                    if (msgObj.by !== 'u') {
                        lastBotMsg = msgText;
                    }
                }
            });

            if (lastBotMsg) {
                jQuery(".aco-top").fadeIn();
                widget.hasMsg = true;
                widget.lastReceived = new Date().getTime();
                lastBotMsg = acoParseSearchResult(lastBotMsg);
                if (lastBotMsg == '') {
                    return;
                }
                lastBotMsg = acoCheckChatInputDisplay(lastBotMsg);
                lastBotMsg = acoParseLeadCaptured(lastBotMsg);
                var cmds = acoParseCmds(lastBotMsg);
                if (cmds != undefined && cmds.length > 0) {
                    lastBotMsg = acoRemoveCmds(lastBotMsg);
                }
                lastBotMsg = acoParsePlaceholder(lastBotMsg);
                lastBotMsg = acoParseAllowMultipleLine(lastBotMsg);
                lastBotMsg = acoParseVoice(lastBotMsg);
                lastBotMsg = acoParseEcom(lastBotMsg);
                lastBotMsg = acoParseInvite(lastBotMsg);

                var replyBtnHtml = acoParseMobileReplyBtn(lastBotMsg);

                var url;
                var matches = lastBotMsg.match(/href=\s*\"(.*?)\"/);

                if (!matches) {
                    matches = lastBotMsg.match(/href=\s*'(.*?)'/);
                }
                if (matches) {
                    url = matches[1].trim();
                }

                var singleLinkLmt = 1;
                if (replyBtnHtml !== '') {
                    lastBotMsg = acoCleanReplyBtn(lastBotMsg);
                } else if (!acoChatOnFocus && !matches) {
                    replyBtnHtml = '<a class="aco-btn aco-btn-last" onclick="acoWidget.tapToChat();">Tap to chat</a>';
                    singleLinkLmt += 1;
                }


                var t = 1000;
                widget.clearBotBubble();

                if (lastBotMsg.indexOf('<msg/>') !== -1) {
                    var lastBotMsgs = lastBotMsg.split("<msg/>");
                    var i = 0;


                    jQuery.each(lastBotMsgs, function(nidx, bmsg) {
                        bmsg = bmsg.trim();
                        var isLast = false;
                        if (bmsg) {
                            if ((i + 1) === lastBotMsgs.length) {
                                isLast = true;
                                bmsg = "<p>" + bmsg + "</p>" + replyBtnHtml;
                            } else {
                                bmsg = "<p>" + bmsg + "</p>";
                            }

                            setTimeout(function() {
                                if (bmsg) {
                                    if (!isLast) {
                                        widget.appendBotBubble(bmsg);
                                    } else {
                                        widget.appendLastBotBubble(bmsg);
                                    }
                                    widget.topShowBotMsg();
                                }
                            }, i * t);
                            i++;
                        }
                    });
                } else {
                    widget.appendLastBotBubble("<p>" + lastBotMsg + "</p>" + replyBtnHtml);
                    this.topShowBotMsg();
                }

                lastBotMsg = lastBotMsg + replyBtnHtml;
                var count = (lastBotMsg.match(/<a/g) || []).length;
                if (widget.inChatting && url && lastBotMsg.search(/onclick/i) === -1 && count <= singleLinkLmt) {
                    var locUrl = window.location.href;
                    var cleanedLoc = acoCleanURL(locUrl);
                    var locHost = acoExtractHostname(cleanedLoc);
                    if (startsWith(url, "/")) {
                        if (startsWith(url, "//")) {
                            if (startsWith(locUrl, "https")) {
                                url = "https:" + url;
                            } else {
                                url = "http:" + url;
                            }
                        } else {
                            if (startsWith(locUrl, "https")) {
                                url = "https://" + locHost + url;
                            } else {
                                url = "http://" + locHost + url;
                            }
                        }
                    }

                    if (startsWith(url, "http")) {
                        if (acoIsPreviewUrl(locUrl)) {
                            var endLocIdx = locUrl.indexOf("?");
                            if (endLocIdx > 0) {
                                locUrl = locUrl.substring(0, endLocIdx);
                            }
                            var naviPreviewUrl = locUrl + '?url=' + encodeURI(url);
                            setTimeout(widget.gotoNewPage, 200, naviPreviewUrl);
                        } else if (acoIsTestUrl(locUrl)) {
                            var naviTestUrl = 'http://acobot.ai/demo/show?url=' + encodeURI(url);
                            setTimeout(widget.testGotoNewPage, 200, naviTestUrl);
                        } else {
                            var cleanedNewUrl = acoCleanURL(url);
                            if (locHost === acoExtractHostname(cleanedNewUrl)) {
                                widget.inChatting = false;
                                setTimeout(widget.gotoNewPage, 200, url);
                            } else if (acoHasHiddenLink(lastBotMsg)) {
                                var prebotElem = this.bubbles.find('.aco-single-bubble-line').last();
                                prebotElem.html(acoDisplayLink(lastBotMsg));
                            }
                        }
                    }
                } else {
                    jQuery(".aco-emoji-wrap").toggleClass("bounce");
                    setTimeout(function() {
                        jQuery(".aco-emoji-wrap").toggleClass("bounce");
                    }, 750);
                }
                acoRunCmds(cmds);
            }
        };


    AcoMobileWidget.prototype.gotoNewPage =
        function gotoNewPage(url) {
            acoCookieSet(acoWidget.groupid + '-aconavi', "1", 30);
            var locationHref = document.location.href;
            if (locationHref.indexOf("acobot.ai/try/") !== -1) {
                var internalUrl = "http://acobot.ai/demo/show?url=" + encodeURI(url);
                jQuery('#demo-wrapper').html('<iframe src="' + internalUrl + '" id="site-frame" class="site-frame"></iframe>');
            } else if (locationHref.indexOf("http://acobot.ai/group/") !== -1) {
                var internalUrl = "http://acobot.ai/demo/show?url=" + encodeURI(url);
                jQuery('#test-home').attr("src", internalUrl);
            } else {
                jQuery(location).attr("href", url);
            }
        };

    AcoMobileWidget.prototype.testGotoNewPage =
        function testGotoNewPage(url) {
            jQuery('#test-home').attr("src", url);
        };

    AcoMobileWidget.prototype.getMsg =
        function getMsg(id) {
            if (id !== this.getMsgId) return;
            this.receiveMessage();
            var timeout = this.receiveInterval; // 3 secs
            var now = new Date().getTime();
            if (now - this.lastActiveTime > this.idle_timeout) {
                timeout = 10000; // 10 secs
            }
            if (now - this.lastActiveTime > (this.idle_timeout * 2)) {
                timeout = 20000; // 20 secs
            }

            setTimeout(this.getMsg, timeout, id);
        };



    AcoMobileWidget.prototype.receiveMessage =
        function receiveMessage() {
            var burl = 'https://chat.acobot.ai/uget?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey + '&instance=' + this.wid + '';
            var widget = this;
            jQuery.ajax({
                url: burl,
                dataType: 'jsonp',
                success: function(resp) {
                    widget.buildRecieved(widget, resp);
                }
            });
        };

    AcoMobileWidget.prototype.sendMessage =
        function sendMessage() {
            jQuery(".aco-loader").show();
            jQuery(".aco-speaking").hide();

            var now = new Date().getTime();
            if (now - this.lastSend < 1000) {
                return;
            }

            this.lastSend = now;
            this.inChatting = true;
            var text = this.input.val();
            if (text.length > this.maxMsgLen) {
                text = text.substring(0, this.maxMsgLen);
            }

            if (!text || !text.trim()) return;
            this.lastActiveTime = now;
            this.getMsgId = now;
            setTimeout(this.getMsg, this.receiveInterval, now);

            this.buildSent(text);
            this.input.val('');
            this.input.focus();
            markChatted();
            this.chatted = true;
            this.chatting = true;

            var path = window.location.pathname;
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;
            jQuery.ajax({
                url: burl + '&msg=' + encodeURIComponent(text) + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {
                    widget.receiveMessage();
                },
                complete: function(XMLHttpRequest, status) {}
            });

        };

    AcoMobileWidget.prototype.sendInviteMessage =
        function sendInviteMessage() {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;

            var path = window.location.pathname;
            if (isEcommGroup) {
                var addedCartProductPath = acoCookieGet("aco_ecomm_product_path_in_cart");

                if (addedCartProductPath !== null && addedCartProductPath === path) {
                    path = path + " ADDED2CART";
                    acoCookieSet("aco_ecomm_product_path_in_cart", "", 1);
                } else {}

                var url = window.location.href;
                if (url === ecommCartUrl) {
                    if (!jQuery(".woocommerce-cart-form").length && !jQuery(".cart").length && !jQuery("form[action='/cart']").length) { // cart  empty
                        path += " EMPTYCART";
                    } else {}
                }
            }

            jQuery.ajax({
                url: burl + '&msg=' + this.inviteMessage + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };

    AcoMobileWidget.prototype.sendBgMessage =
        function sendBgMessage(msg) {
            jQuery(".aco-loader").show();
            jQuery(".aco-speaking").hide();
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;
            var path = window.location.pathname;
            jQuery.ajax({
                url: burl + '&msg=' + encodeURIComponent(msg) + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };

    AcoMobileWidget.prototype.sendMuc =
        function sendMuc() {
            var burl = 'https://acobot.ai/api/muc/' + this.groupid;
            jQuery.ajax({
                url: burl,
                dataType: 'jsonp',
                success: function(result) {}
            });
        };

    AcoMobileWidget.prototype.bgSendBgMessage =
        function bgSendBgMessage(msg) {
            jQuery(".aco-loader").show();
            jQuery(".aco-speaking").hide();
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;
            var path = window.location.pathname;
            jQuery.ajax({
                url: burl + '&msg=' + encodeURIComponent(msg) + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {}
            });
        };

    AcoMobileWidget.prototype.sendMessageWithCtx =
        function sendMessageWithCtx(msg, ctx) {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;
            msg = '<set-context>' + ctx + '</set-context>' + msg;
            var path = window.location.pathname;
            jQuery.ajax({
                url: burl + '&msg=' + encodeURIComponent(msg) + '&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };

    AcoMobileWidget.prototype.sendEndpageInviteMessage =
        function sendEndpageInviteMessage() {
            var burl = 'https://chat.acobot.ai/usend?uid=' + this.uid + '&gid=' + this.groupid + '&key=' + this.groupkey;
            var widget = this;
            var path = window.location.pathname;
            jQuery.ajax({
                url: burl + '&msg=' + this.inviteMessage + ' endpage&url=' + path + '',
                dataType: 'jsonp',
                success: function(resp) {},
                complete: function(XMLHttpRequest, status) {
                    widget.receiveMessage();
                }
            });
        };

    AcoMobileWidget.prototype.checkInPageNavi =
        function checkInPageNavi() {
            var aconavi = acoCookieGet(this.groupid + '-aconavi');
            if (aconavi != undefined && aconavi === "1") {
                return true;
            } else {
                return false;
            }
        };

    AcoMobileWidget.prototype.resetPageNavi =
        function resetPageNavi() {
            acoCookieSet(this.groupid + '-aconavi', "0", 30);
        };

    AcoMobileWidget.prototype.openWidget =
        function openWidget() {
            var openCount = 0;
            var widget = this;

            var openTimer =
                setInterval(function() {
                    var bubbles = widget.bubbles.find('.aco-bot-bubble');
                    if (bubbles && bubbles.length > 0) {
                        setTimeout(function() {
                            if (!acoWidgetIsClosed()) {
                                if (!acoMobileShowMsg) {
                                    acoMobileShowMsg = true;
                                }
                                widget.topShowBotMsg();
                                widget.showInputArea();
                                jQuery("#aco-chat-btn").hide();
                            }
                        }, 1000);
                        clearInterval(openTimer);
                        return;
                    }
                    openCount++;
                    if (openCount > 5) {
                        clearInterval(openTimer);
                    }
                }, 1000);
        };


    AcoMobileWidget.prototype.startWidget =
        function startWidget() {
            if (!this.checkInPageNavi()) {
                this.sendInviteMessage();
            } else {
                if (isEcommGroup) {
                    var locUrl = window.location.href;
                    var needInvite = false;
                    if (ecommProductPathPtn != null && ecommProductPathPtn.test(locUrl)) {
                        needInvite = true;
                    }
                    if (locUrl.includes('product-category')) {
                        needInvite = true;
                    }
                    if (locUrl.includes('product-tag')) {
                        needInvite = true;
                    }
                    if (locUrl.includes('cart')) {
                        needInvite = true;
                    }
                    if (locUrl.includes('collections')) {
                        needInvite = true;
                    }

                    if (needInvite) {
                        this.sendInviteMessage();
                    } else {
                        var invite = acoCookieGet("aco-invite");
                        if (invite != null && invite == "1") {
                            this.sendInviteMessage();
                            acoCookieSet("aco-invite", "0");
                        } else {}
                    }
                }
            }

            this.resetPageNavi();
            jQuery(".aco-loader").hide();
            jQuery(".aco-speaking").hide();
            jQuery(".aco-btm").fadeIn();
            this.openWidget();

            // this.resetPageNavi();
            // jQuery(".aco-loader").hide();
            // jQuery(".aco-speaking").hide();
            // jQuery(".aco-btm").fadeIn();
            // this.sendInviteMessage();
        };
    return AcoMobileWidget;
}();


function acoCookieSet(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }

    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function acoCookieGet(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}


function getAcoUid() {
    if (acoCookieGet('acouid')) {
        return acoCookieGet("acouid");
    }

    var d = new Date().getTime();
    acoCookieSet("arrived", Math.floor(d / 1000), 30);
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    acoCookieSet('acouid', uuid, 30);
    return uuid;
}

function getChatted() {
    if (acoCookieGet('chatted')) {
        return true;
    } else {
        return false;
    }
}

function markChatted() {
    acoCookieSet('chatted', "1", 1);
}

function acoWidgetStatusSwitch() {
    if (acoWidgetIsClosed()) {
        acoCookieSet('aco_widget_closed', "0", 1);
    } else {
        acoCookieSet('aco_widget_closed', "1", 1);
    }
}

function acoWidgetIsClosed() {
    var closeCookie = acoCookieGet('aco_widget_closed');
    if (closeCookie && closeCookie == "1") {
        return true;
    } else {
        return false;
    }
}

function aco_css_ready() {
    var len = document.getElementById('aco-beacon').clientWidth;
    return len === 42;
}

function aco_init_and_load_widget() {
    if (acoWidget == null) {
        if (acoIsMobile) {
            acoWidget = new AcoMobileWidget();
            if (isEcommGroup) {
                acoEcomInit();
            }
        } else {
            acoWidget = new AcoWidget();
            if (isEcommGroup) {
                acoEcomInit();
            } else {
                acoAlterForFreeBtns();
            }
        }
        acoWidget.initAudio();

        var muc = acoCookieGet('muc');
        if (muc == null) {
            acoWidget.sendMuc();
        }

        setInterval(acoExtSession, 20000);
        if (!acoIsMobile && typeof aco_full_screen !== 'undefined' && aco_full_screen) {
            jQuery(".aco-slide-fixed-chat").addClass("aco-full-screen");
            jQuery(".aco-textarea").attr('placeholder', "You're interacting with AI. just chat!");
        }
    }

    if (!acoIsMobile) {
        if (aco_css_ready()) {
            jQuery('#aco-go-to-top').fadeOut();
        }
    }
    acoWidget.startWidget();
}

function aco_deferLoadWidget() {
    if (window.jQuery) {
        var url = "https://chat.acobot.ai/status?gid=591066&path=" + window.location.pathname;
        jQuery.ajax({
            url: url,
            async: false,
            dataType: 'jsonp',
            success: function(result) {
                if (result == 'ok') {
                    aco_init_and_load_widget();
                } else {
                    console.log("Server connecting failed, Widget off.")
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log("Server connecting failed, Widget off.")
            }
        });
        return;
    }

    setTimeout(function() {
        aco_deferLoadWidget()
    }, 50);
}


function acoExtSession() {
    var now = new Date().getTime();
    if (now - acoWidget.lastReceived > 600000) { // 10 minutes
        acoWidget.sendInviteMessage();
    }
}

function aco_ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState !== 'loading')
                fn();
        });
    }
}

function startsWith(src, prefix) {
    return src.slice(0, prefix.length) === prefix;
}

function endsWith(src, suffix) {
    return src.indexOf(suffix, src.length - suffix.length) !== -1;
}


function scrollToAcoTarget(loc) {
    if (loc == undefined) {
        loc = window.location.href;
    }
    var idxFrom = loc.indexOf('acogo');
    if (idxFrom !== -1) {
        var acogo = loc.substr(idxFrom);
        if (acogo.indexOf("&") !== -1) {
            acogo = acogo.substr(0, acogo.indexOf("&"));
        }
        var targetFrom = acogo.indexOf("=");
        if (targetFrom !== -1) {
            var target = acogo.substr(targetFrom + 1);
            var nameEnd = target.indexOf('.');
            if (nameEnd !== -1) {
                var name = target.substr(0, nameEnd);
                var idx = target.substr(nameEnd + 1);
                var ele = jQuery(name).eq(Number(idx));
                acoScrollToElementAndHighlight(ele);
            }
        }
    }
}

function acoExtractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    url = url.toLowerCase();
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    if (hostname.startsWith('www.')) {
        hostname = hostname.substring(4);
    }
    return hostname;
}

// To address those who want the "root domain," use this function:
function acoExtractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}

function acoDisplayLink(msg) {
    return msg.replace("<div style=\"height: 0px;width: 0px;overflow:hidden;\">", " ")
        .replace("</div>", "").replace("</a>", "<i class=\"aco-f aco-f-external-link\" aria-hidden=\"true\"></i></a>");
}

function acoHasHiddenLink(msg) {
    return msg.indexOf("style=\"height: 0px;width: 0px;overflow:hidden;\"><a") !== -1;

}

function acoScrollToElementAndHighlight(selector) {
    var toUpper = jQuery(window).height() * 0.2;
    var offsetTop = selector.offset().top;
    if (offsetTop) {
        var animation = { scrollTop: parseInt(offsetTop - toUpper) };
        var backgroundColor = selector.css("background-color");
        var color = selector.css("color");
        jQuery('html,body').animate(animation, 'slow', 'swing', function() {
            setTimeout(function() {
                selector.addClass('acoAnimated aco-flash');
                selector.css({ "background-color": "#182433", "color": "#ffffff" });
            }, 2000);
        });

        setTimeout(function() {
            selector.css({
                "background-color": backgroundColor,
                "color": color,
                "-webkit-transition": "background-color 0.7s ease",
                "-moz-transition": "background-color 0.7s ease",
                "-o-transition": "background-color 0.7s ease",
                "transition": "background-color 0.7s ease"
            });
        }, 5000);
    }
}

function acoScrollToElement(selector) {
    var toUpper = jQuery(window).height() * 0.2;
    var offsetTop = selector.offset().top;
    if (offsetTop) {
        var animation = { scrollTop: parseInt(offsetTop - toUpper) };
        jQuery('html,body').animate(animation, 'slow', 'swing', function() {});
    }
}

function acoParsePlaceholder(source) {
    var regex = /<aco-placeholder>(.*?)<\/aco-placeholder>/g;
    var prgArr = regex.exec(source);
    if (prgArr == null) {
        jQuery(".aco-textarea").attr('placeholder', 'Type a reply');
        acoDefaultPlaceHolder = 'Enter or Enter(2) to send';
        return source;
    } else {
        var placeholder = prgArr[1];
        jQuery(".aco-textarea").attr('placeholder', placeholder);
        acoDefaultPlaceHolder = placeholder;
        return source.replace(/<aco-placeholder>(.*)<\/aco-placeholder>/g, '');
    }
}

function acoParseAllowMultipleLine(source) {
    var regex = /<allow-multiple-line-input\s*\/>/g;
    if (regex.test(source)) {
        allowMultipleLineInput = true;
        return source.replace(regex, '');
    } else {
        allowMultipleLineInput = false;
        return source;
    }
}

function acoCleanReplyBtn(source) {
    return source.replace(/<aco-btn>(.*)<\/aco-btn>/g, '');
}

function acoParseCmds(source) {
    var cmds = [];
    var regex = /<aco-cmd-(.*?)\/>/g;
    var cmdTags = source.match(regex);
    if (cmdTags == null) return cmds;
    for (i = 0; i < cmdTags.length; i++) {
        var cmdTag = cmdTags[i];
        var cmd = cmdTag.replace('<aco-cmd-', '').replace('/>', '');
        cmds.push(cmd.trim());
    }
    return cmds;
}

function acoParseLeadCaptured(source) {
    var lcTag = "<lead-captured/>";
    if (source.includes(lcTag)) {
        source = source.replace(lcTag, '');
        var loc = window.location.href;
        var regex = /group\/\d+\/preview\/tutorial\/chat/g;
        if (loc.match(regex)) {
            setTimeout(function() {
                jQuery('#leadModal').modal('show');
            }, 10000);
        }
        var nowStr = new Date().getTime().toString();
        if ((typeof ga) === 'function') {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Acobot',
                eventAction: 'Acobot Lead Captured',
                eventLabel: "Acobot Lead Captured " + nowStr
            });
        }
    }
    return source;
}

function acoRemoveCmds(source) {
    var regex = /<aco-cmd-(.*?)\/>/g;
    return source.replace(regex, "");
}

function acoRunCmds(cmds) {
    if (cmds == undefined || cmds.length === 0) {
        return;
    }
    for (var i = 0; i < cmds.length; i++) {
        if (cmds[i] == "close-widget") {
            setTimeout(function() {
                acoWidget.closeBotBubble();
            }, 2000);
        } else if (cmds[i] == 'turn-voice-on') {
            acoWidget.turnOnVoice();
        } else if (cmds[i] == 'turn-voice-off') {
            acoWidget.turnOffVoice();
        }
    }
}

function acoParseReplyBtn(source) {
    if (!source.includes("<aco-btn>")) {
        return '';
    }
    var regex = /<aco-btn>(.*?)<\/aco-btn>/g;
    var btns = source.match(regex);
    var btnHtml = '';
    var btnTxts = [];
    var linkMsg = "";
    for (i = 0; i < btns.length; i++) {
        var btn = btns[i];
        var btnTxt = btn.replace('<aco-btn>', '').replace('</aco-btn>', '');
        var btnTxtJs = btnTxt.replace("'", "\\'");
        btnTxtJs = btnTxtJs.replace(/"/g, '&quot;');
        var tf = btnTxt.indexOf('[aco-link');
        if (tf > 0) {
            var te = tf + btnTxt.substring(tf).indexOf(']');
            if (te > tf) {
                btnTxtJs = btnTxt.substring(tf + 1, te).replace("'", "\\'");
                btnTxt = btnTxt.substring(0, tf);
            }
        }
        if (btnTxts.indexOf(btnTxt) >= 0) {
            continue;
        }
        var linkMsg = "Good choice! Here we go...";
        var linkMsg_1 = "Nice choice! Here we go...";
        if (i == 0) {
            if (btnTxt == "Previous") {
                btnHtml = btnHtml + '<a class="aco-btn2 aco-btn-first" onclick="acoBtnReply(\'Previous\');"><i class="aco-f aco-f-angle-left"></i></a> ';
            } else if (btnTxt == "Next") {
                btnHtml = btnHtml + '<a class="aco-btn2 aco-btn-first" onclick="acoBtnReply(\'Next\');"><i class="aco-f aco-f-angle-right"></i></a> ';
            } else {
                if (btnTxtJs.startsWith("aco-link:")) {
                    var link = btnTxtJs.substr("aco-link:".length);
                    if (Math.floor(Math.random() * 2) === 1) {
                        linkMsg = linkMsg_1;
                    }
                    btnHtml = btnHtml + '<a class="aco-btn2 aco-btn-first" href="' + link + '"' +
                        ' onclick="acoWidget.buildSent(\'' + linkMsg + '\')">' + btnTxt + '</a> ';
                } else {
                    btnHtml = btnHtml + '<a class="aco-btn2 aco-btn-first" onclick="acoBtnReply(\'' + btnTxtJs + '\');">' + btnTxt + '</a> ';
                }
            }
        } else if (i == btns.length - 1) {
            if (btnTxt == "Previous") {
                btnHtml = btnHtml + '<a class="aco-btn2 aco-btn-last" onclick="acoBtnReply(\'Previous\');"><i class="aco-f aco-f-angle-left"></i></a> ';
            } else if (btnTxt == "Next") {
                btnHtml = btnHtml + '<a class="aco-btn2 aco-btn-last" onclick="acoBtnReply(\'Next\');"><i class="aco-f aco-f-angle-right"></i></a> ';
            } else {
                if (btnTxtJs.startsWith("aco-link:")) {
                    var link = btnTxtJs.substr("aco-link:".length);
                    if (Math.floor(Math.random() * 2) === 1) {
                        linkMsg = linkMsg_1;
                    }
                    btnHtml = btnHtml + '<a class="aco-btn2 aco-btn-last" href="' + link + '"' +
                        ' onclick="acoWidget.buildSent(\'' + linkMsg + '\')">' + btnTxt + '</a> ';
                } else {
                    btnHtml = btnHtml + '<a class="aco-btn2 aco-btn-last" onclick="acoBtnReply(\'' + btnTxtJs + '\');">' + btnTxt + '</a> ';
                }
            }
        } else {
            if (btnTxt == "Previous") {
                btnHtml = btnHtml + '<a class="aco-btn2" onclick="acoBtnReply(\'Previous\');"><i class="aco-f aco-f-angle-left"></i></a> ';
            } else if (btnTxt == "Next") {
                btnHtml = btnHtml + '<a class="aco-btn2" onclick="acoBtnReply(\'Next\');"><i class="aco-f aco-f-angle-right"></i></a> ';
            } else {
                if (btnTxtJs.startsWith("aco-link:")) {
                    var link = btnTxtJs.substr("aco-link:".length);
                    if (Math.floor(Math.random() * 2) === 1) {
                        linkMsg = linkMsg_1;
                    }
                    btnHtml = btnHtml + '<a class="aco-btn2" href="' + link + '"' +
                        ' onclick="acoWidget.buildSent(\'' + linkMsg + '\')">' + btnTxt + '</a> ';
                } else {
                    btnHtml = btnHtml + '<a class="aco-btn2" onclick="acoBtnReply(\'' + btnTxtJs + '\');">' + btnTxt + '</a> ';
                }
            }
        }
        btnTxts.push(btnTxt);
    }

    // acoWidget.showInputArea();
    return btnHtml;
}

function acoParseMobileReplyBtn(source) {
    if (!source.includes("<aco-btn>")) {
        return '';
    }

    var regex = /<aco-btn>(.*?)<\/aco-btn>/g;
    var btns = source.match(regex);
    var btnHtml = '';
    var btnTxts = [];
    var linkMsg = "Good choice! Here we go...";
    var linkMsg_1 = "Nice choice! Here we go...";
    for (i = 0; i < btns.length; i++) {
        var btn = btns[i];
        var btnTxt = btn.replace('<aco-btn>', '').replace('</aco-btn>', '');
        var btnTxtJs = btnTxt.replace("'", "\\'");
        btnTxtJs = btnTxtJs.replace(/"/g, '&quot;');
        var tf = btnTxt.indexOf('[');
        if (tf > 0) {
            var te = btnTxt.indexOf(']');
            if (te > tf) {
                btnTxtJs = btnTxt.substring(tf + 1, te).replace("'", "\\'");
                btnTxt = btnTxt.substring(0, tf);
            }
        }
        if (btnTxts.indexOf(btnTxt) >= 0) {
            continue;
        }


        if (i == 0) {
            if (btnTxt == "Previous") {
                btnHtml = btnHtml + '<a class="aco-btn aco-btn-first" onclick="this.disabled=true; acoMobileBtnReply(\'Previous\');"><i class="aco-f aco-f-angle-left"></i></a> ';
            } else if (btnTxt == "Next") {
                btnHtml = btnHtml + '<a class="aco-btn aco-btn-first" onclick="this.disabled=true; acoMobileBtnReply(\'Next\');"><i class="aco-f aco-f-angle-right"></i></a> ';
            } else {
                if (btnTxtJs.startsWith("aco-link:")) {
                    var link = btnTxtJs.substr("aco-link:".length);
                    if (Math.floor(Math.random() * 2) === 1) {
                        linkMsg = linkMsg_1;
                    }
                    btnHtml = btnHtml + '<a class="aco-btn  aco-btn-first" href="' + link + '"' +
                        'onclick="acoWidget.buildSent(\'' + linkMsg + '\')"' + '>' + btnTxt + '</a> ';
                } else {
                    btnHtml = btnHtml + '<a class="aco-btn aco-btn-first" onclick="this.disabled=true; acoMobileBtnReply(\'' + btnTxtJs + '\');">' + btnTxt + '</a> ';
                }
            }
        } else if (i == btns.length - 1) {
            if (btnTxt == "Previous") {
                btnHtml = btnHtml + '<a class="aco-btn aco-btn-last" onclick="this.disabled=true; acoMobileBtnReply(\'Previous\');"><i class="aco-f aco-f-angle-left"></i></a> ';
            } else if (btnTxt == "Next") {
                btnHtml = btnHtml + '<a class="aco-btn aco-btn-last" onclick="this.disabled=true; acoMobileBtnReply(\'Next\');"><i class="aco-f aco-f-angle-right"></i></a> ';
            } else {
                if (btnTxtJs.startsWith("aco-link:")) {
                    var link = btnTxtJs.substr("aco-link:".length);
                    if (Math.floor(Math.random() * 2) === 1) {
                        linkMsg = linkMsg_1;
                    }
                    btnHtml = btnHtml + '<a class="aco-btn  aco-btn-last" href="' + link + '"' +
                        'onclick="acoWidget.buildSent(\'' + linkMsg + '\')"' + '>' + btnTxt + '</a> ';
                } else {
                    btnHtml = btnHtml + '<a class="aco-btn aco-btn-last" onclick="this.disabled=true; acoMobileBtnReply(\'' + btnTxtJs + '\');">' + btnTxt + '</a> ';
                }
            }
        } else {
            if (btnTxt == "Previous") {
                btnHtml = btnHtml + '<a class="aco-btn" onclick="this.disabled=true; acoMobileBtnReply(\'Previous\');"><i class="aco-f aco-f-angle-left"></i></a> ';
            } else if (btnTxt == "Next") {
                btnHtml = btnHtml + '<a class="aco-btn" onclick="this.disabled=true; acoMobileBtnReply(\'Next\');"><i class="aco-f aco-f-angle-right"></i></a> ';
            } else {
                if (btnTxtJs.startsWith("aco-link:")) {
                    var link = btnTxtJs.substr("aco-link:".length);
                    if (Math.floor(Math.random() * 2) === 1) {
                        linkMsg = linkMsg_1;
                    }
                    btnHtml = btnHtml + '<a class="aco-btn" href="' + link + '"' +
                        'onclick="acoWidget.buildSent(\'' + linkMsg + '\')"' + '>' + btnTxt + '</a> ';
                } else {
                    btnHtml = btnHtml + '<a class="aco-btn" onclick="this.disabled=true; acoMobileBtnReply(\'' + btnTxtJs + '\');">' + btnTxt + '</a> ';
                }
            }
        }
        btnTxts.push(btnTxt);
    }

    return btnHtml;
}


function acoParseVoice(source) {
    var regex = /<aco-voice>(.*?)<\/aco-voice>/g;
    var prgArr = regex.exec(source);
    if (prgArr == null) {
        return source;
    } else {
        var audio = acoCookieGet('audio');
        if (acoVoice === false || audio != undefined && audio === 'off' || acoWidgetIsClosed()) {
            return source.replace(/<aco-voice>(.*)<\/aco-voice>/g, '');
        }
        var url = "https://chat.acobot.ai/voices/" + prgArr[1];
        setTimeout(function() {
            var media = new Audio(url);
            const playPromise = media.play();
            if (playPromise !== null && playPromise !== undefined) {
                playPromise.catch(function() {});
            }
        }, 100);
        return source.replace(/<aco-voice>(.*)<\/aco-voice>/g, '');
    }
}

function acoParseEcomPa(source) {
    if (source.includes('<woocom-pa>')) {
        var regex = /<woocom-pa>(.*?)<\/woocom-pa>/g;
        var prgArr = regex.exec(source);
        if (prgArr == null) {
            return source;
        } else {
            var paVal = prgArr[1];
            var res = paVal.split("=");
            if (res[0] && res[1]) {
                var attr = res[0].trim();
                var val = res[1].trim();

                acoScrollToElement(jQuery("#" + attr));
                setTimeout(function() {
                    var option = '#' + attr + ' option[value="' + val + '"]';
                    var optionObj = jQuery(option);
                    if (optionObj) {
                        jQuery(option).prop('selected', 'selected').change();
                    } else {
                        val = val.split(".").join("-");
                        val = val.split(" ").join("-");
                        val = val.split("--").join("-");
                        option = '#' + attr + ' option[value="' + val + '"]';
                        jQuery(option).prop('selected', 'selected').change();
                    }
                }, 1000);

            }
            return source.replace(/<woocom-pa>(.*?)<\/woocom-pa>/g, '');
        }
    } else {
        return source;
    }
}

function acoParseInvite(source) {
    if (source.includes('<invite/>')) {
        acoCookieSet("aco-invite", "1", 1);
        return source.replace('<invite/>', '');
    } else {
        return source;
    }
}


var acoProduct = null;

function acoEcomInit() {
    jQuery("#aco-input-search-btn").hide();
    acoEcomResponseSelect();
}

function acoEcomResponseSelect() {
    var selects = jQuery('select');
    for (i = 0; i < selects.length; i++) {
        var s = selects[i];
        jQuery(s).on("click", function() {
            if (!ecommChoosingProductAttr && !acoIsMobile) {
                acoWidget.sendBgMessage("acoxHiddenMsg product attribute clicked");
                ecommChoosingProductAttr = true;
            }
        });
    }

    var cartForm = jQuery('.cart'); // woocom
    cartForm.on("submit", function() {
        if (!ecommAddedToCartByCmds) {
            acoCookieSet("aco_ecomm_product_path_in_cart", window.location.pathname, 1);
            ecommAddedToCartByCmds = false;
        } else {}
    });
}

function acoParseEcomAddCart(source) {
    if (source.includes('<woocom-add-to-cart/>')) {
        ecommAddedToCartByCmds = true;
        setTimeout(function() {
            jQuery('.single_add_to_cart_button').click();
        }, 1000);

        setTimeout(function() {
            acoWidget.sendInviteMessage();
        }, 3000);
        return source.replace('<woocom-add-to-cart/>', '');
    } else {
        return source;
    }
}

function acoParseEcommGroupedQty(source) {
    var regex = /<grouped-qty>(.*?)<\/grouped-qty>/g;
    var prgArr = regex.exec(source);
    if (prgArr == null) {
        return source;
    } else {
        var qty = prgArr[1].trim();
        var inputs = jQuery('.qty');
        for (i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            jQuery(input).val(qty);
        }
    }
    return source.replace(/<grouped-qty>(.*?)<\/grouped-qty>/g, '');
}

function acoParseEcom(source) {
    source = acoParseEcomAddCart(source);
    source = acoParseEcommGroupedQty(source);
    return acoParseEcomPa(source);
}


function acoCloseSearch() {
    jQuery(".aco-search").remove();
}

function acoParseSearchResult(source) {
    var regex = /<search>(.*?)<\/search>/g;
    var prgArr = regex.exec(source);
    jQuery(".aco-search").remove();
    if (prgArr == null) {
        return source;
    } else {
        var searchSrc = prgArr[1];
        var regItem = RegExp('<item>.*?</item>', 'g');
        var arrayItem;
        var searchDiv = '<div class="aco-search"><div class="aco-search-wrapper"><div class="aco-search-inner"><div class="aco-search-close" onclick="acoCloseSearch();"><i class="aco-f aco-f-close"></i></div>';
        while ((arrayItem = regItem.exec(searchSrc)) !== null) {
            var itemDiv = "<div class='aco-search-item'>";
            var regName = RegExp('<name>(.*?)</name>', 'g');
            var regUrl = RegExp('<url>(.*?)</url>', 'g');
            var regDisplayUrl = RegExp('<display-url>(.*?)</display-url>', 'g');
            var regSnippet = RegExp('<snippet>(.*?)</snippet>', 'g');
            var item = arrayItem[0];
            var name = regName.exec(item)[1];
            var url = regUrl.exec(item)[1];
            var displayUrl = regDisplayUrl.exec(item)[1];
            var snippet = regSnippet.exec(item)[1];
            itemDiv = itemDiv + '<div class="aco-search-title"><a href="' + url + '">' + name + "</a></div>";
            itemDiv = itemDiv + '<div class="aco-search-url">' + displayUrl + '</div>';
            itemDiv = itemDiv + '<div class="aco-search-desc">' + snippet + "</div></div>";
            searchDiv = searchDiv + itemDiv;
        }
        searchDiv = searchDiv + "</div></div></div>";
        setTimeout(function() {
            jQuery('body').append(searchDiv);
            acoWidget.closeKeyboard();
        }, 500);
        source = source.replace(regex, '');
        return source;
    }
}



function acoBtnInput(input) {
    acoWidget.input.val(input);
}

function acoSend() {
    acoWidget.sendMessage();
    acoWidget.sendGAEvent();
}

function acoBtnReply(message) {
    if (jQuery(".aco-live-post-bubble").is(":hidden")) {
        acoBtnInput(message);
        acoSend();
        return;
    }
    var i;
    var idx = 0;
    var len = message.length;
    var interval = 200;
    if (len > 20) {
        interval = 80;
    } else if (len > 10) {
        interval = 120;
    }

    acoWidget.showInputArea();
    // for(i = 0; i <= len; i++) {
    //     setTimeout(acoBtnInput, interval * i, message.substring(0,i));
    // }

    // setTimeout(acoSend, interval * i + 500);
    acoWidget.input.val(message);
    setTimeout(acoSend, 200);

    // acoWidget.sendBgMessage(message);
}

function acoMobileBtnReply(message) {
    jQuery(".aco-input").blur();
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        jQuery('.aco-top').removeClass("aco-ios-fix");
    }
    acoWidget.inChatting = true;

    acoWidget.sendBgMessage(message);
}


function acoCleanURL(url) {
    var idxFrom = url.indexOf('acogo');
    if (idxFrom != -1) {
        url = url.substr(0, idxFrom);
    }
    var rem = ['?', '/', '&'];
    while (rem.indexOf(url.charAt(url.length - 1)) != -1) {
        url = url.substr(0, url.length - 1);
    }
    return url;
}

var lastFixPos = 0;
var scrollPosThreshold = 600;
var scrollBottomThreshold = 100;
var scrollTimeThreshold = 15;
var bottomTimeThreshold = 15;
var showQuit = false;
var inQuit = false;
var acoMobileShowMsg = false;
var allowMultipleLineInput = false;

var isEcommGroup = false;
var ecommProductPathPtn = null;
var ecommCartUrl = "";
var ecommChoosingProductAttr = false;
var ecommAddedToCartByCmds = false;

var acoWidget = null;

function acoDisplayGotoTop() {
    var go2Top = jQuery('#aco-go-to-top');
    if (go2Top.length) {
        if (jQuery(window).scrollTop() > 100) {
            go2Top.fadeIn();
        } else {
            go2Top.fadeOut();
        }
    }
}

function acoCheckChatInputDisplay(msg) {
    var regex;
    if (msg.includes("<aco-cmd-hide-text-input")) {
        jQuery(".aco-live-post-bubble").hide();
        regex = /<aco-cmd-hide-text-input(.*?)\/>/g;
        msg = msg.replace(regex, "");
    } else if (msg.includes("<aco-cmd-show-text-input")) {
        acoWidget.showInputArea();
        regex = /<aco-cmd-show-text-input(.*?)\/>/g;
        msg = msg.replace(regex, "");
    } else {
        jQuery(".aco-live-post-bubble").show();
    }
    return msg;
}

function acoCreateBacklinkSEO() {
    var link = '<link rel="stylesheet" href="//d1vrgybx2dsdrl.cloudfront.net/widget/css/widget_modern_v80.css">' +
        '<div class="aco-slide-fixed-chat aco-hidden-chat"><div classs="aco-emoji-wrap" style="pointer-events:auto;">' +
        '<a href="https://acobot.ai">Virtual Shop Assistant</a></div></div>';
    document.body.innerHTML += link;
}

var acoIsCrawlerAgent = false;

function acoStartWhenJQueryReady() {
    acoIsCrawlerAgent = /bot|googlebot|crawler|spider|robot|crawling|bingpreview|duckduckgo|http:|https:/i.test(navigator.userAgent);
    if (acoIsCrawlerAgent) {
        console.log("is crawler");
        acoCreateBacklinkSEO();
        return;
    }

    checkMobile();
    if (window.jQuery) {
        // $ = jQuery.noConflict();

        var wrapper = jQuery('#aco-chat-wrap');
        if (!wrapper.length) {
            aco_ready(aco_deferLoadWidget);
        }

        scrollToAcoTarget();
        var inviteTime = jQuery.now();
        var bottomInviteTime = jQuery.now();
        if (!acoIsMobile) {
            acoDisplayGotoTop();
            jQuery(window).scroll(function() {
                acoDisplayGotoTop();
                if (inQuit) return;
                if (getChatted()) return;
                if (isEcommGroup) return;
                var diff = Math.abs(jQuery(window).scrollTop() - lastFixPos);
                if (jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
                    if (diff > scrollBottomThreshold) {
                        if ((jQuery.now() - bottomInviteTime) > bottomTimeThreshold * 1000) {
                            bottomInviteTime = jQuery.now();
                            bottomTimeThreshold = 15;
                            acoWidget.sendEndpageInviteMessage();
                        }
                    }
                } else if (diff > scrollPosThreshold) {
                    lastFixPos = jQuery(window).scrollTop();
                    if ((jQuery.now() - inviteTime) > scrollTimeThreshold * 1000) {
                        inviteTime = jQuery.now();
                        bottomInviteTime = inviteTime;
                        bottomTimeThreshold = 5;
                        acoWidget.sendInviteMessage();
                    }
                }
            });
            if (acoPopup) {
                ouibounce(null, {
                    callback: function() {
                        if (!getChatted()) {
                            inQuit = true;
                            showQuit = true;
                            markChatted();
                            acoWidget.sendQuitpageInviteMessage();
                        }
                    }
                });
            }
        }
    } else {
        setTimeout(acoStartWhenJQueryReady, 100);
    }
}

function acoAlterForFreeBtns() {
    if (isEcommGroup) return;
    var linkBtn = jQuery(".aco-show-link-btn");
    if (linkBtn && linkBtn.length == 1) {
        linkBtn.css("margin-left", "-6px");
        linkBtn.css("margin-right", "-6px");
    }
}

function acoExitEngagement() {
    showQuit = true;
    acoWidget.sendQuitpageInviteMessage();
}

function acoIsTestUrl(url) {
    var regex = /http:\/\/acobot.ai\/group\/\d+\/test\/go/g;
    return url.match(regex);
}

function acoIsPreviewUrl(url) {
    var previewRegx = RegExp('https://acobot.ai/group/\\d+/preview.*', 'g');
    return url.match(previewRegx);
}


var acoIsMobile = false;
var acoPopup = true;
var acoVoice = true;
var acoLandingURL = "";

function checkMobile() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if (h > w || w <= 768) {
        acoIsMobile = true;
        scrollPosThreshold = 100;
        scrollBottomThreshold = 30;
        scrollTimeThreshold = 2;
        bottomTimeThreshold = 2;
    }
}

acoStartWhenJQueryReady();


function arrangemeet(k) {

    ar1 = ["meet", "session", "therapy", "therapist", "doctor", "psychologist"];
    ar2 = ["sign out", "signout", "logout", "log out"];
    ar3 = ["chatroom", "chat room", "privatechat", "private chat"];

    if (k.toLowerCase().indexOf("discussion") !== -1) {
        window.open("/Discussion/index.html", "_self");
    }
    for (let i = 0; i < ar1.length; i++) {
        if ((k.toLowerCase().indexOf(ar1[i])) !== -1) {
            window.open("/Chatmeet/index.html", "_self");
        }
    }
    for (let i = 0; i < ar2.length; i++) {
        if ((k.toLowerCase().indexOf(ar2[i])) !== -1) {
            signOut();
        }
    }
    for (let i = 0; i < ar3.length; i++) {
        if ((k.toLowerCase().indexOf(ar3[i])) !== -1) {
            window.open("/Private Chat/pages/home.html", "_self");
        }
    }

}