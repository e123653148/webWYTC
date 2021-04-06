//__ZEGHS_PACKER_ENCODE_ENABLED (此註解用來提醒編碼器需要將此檔案編碼)

var ZEGHS = ZEGHS || { PLUGIN_VERSION: "1.0.0" };
ZEGHS.__debug = false;

ZEGHS.__CreateLoader = function (mainId) {
    ZEGHS.CreateLanguage(mainId);

    var cLinks = $("#" + mainId).children().find("[data-link]");
    var iLength = cLinks.length;
    for (var i = 0; i < iLength; i++) {
        var cLink = cLinks.eq(i);
        if (cLink[0].tagName == "IMG") {
            cLink.attr("src", ZEGHS.loadImage(cLink.attr("data-link")));
        } else {
            var sTarget = cLink.attr("targetContainer");
            if (sTarget == undefined) {
                cLink.attr("targetContainer", mainId);
            }

            cLink.off("click");
            cLink.on("click", function () {
                var sTarget = $(this).attr("targetContainer");
                ZEGHS.loadPage(sTarget, $(this));
            });
        }
    }

    var cFrame = $("#" + mainId).find("[frame-context-id]").eq(0);
    if (cFrame.length > 0) {
        var sContext = session.getValue("__frame_context_url");
        if (sContext != undefined) {
            session.remove("__frame_context_url");
            ZEGHS.loadPage(cFrame.attr("frame-context-id"), sContext);
        }
    }
};

ZEGHS.CreateLanguage = function (object) {
    var cResources = undefined;
    if (typeof (object) == "string") {
        cResources = $("#" + object).children().find("[resource]");
    } else {
        cResources = object.children().find("[resource]");
    }

    var iLength = cResources.length;
    for (var i = 0; i < iLength; i++) {
        var cResource = cResources.eq(i);
        var sData = cResource.attr("resource");
        if (sData.charAt(0) == '[') {
            var sItems = sData.split("=");
            var sProperty = sItems[0].substring(1, sItems[0].length - 1);
            if (sProperty == "html") {
                cResource.html($.i18n.prop(sItems[1]));
            } else {
                cResource.attr(sProperty, $.i18n.prop(sItems[1]));
            }
        } else {
            cResource.text($.i18n.prop(sData));
        }
    }
};

ZEGHS.GetQueryStringFormName = function (name) {
    var url = window.location.search;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);

    if (!results || !results[2]) {
        return "";
    }
    return results[2];
};

ZEGHS.Run = function (script) {
    this.parentid = __loadPage_request.parentid;
    this.query = $.extend({}, __loadPage_request.query);
    this.url = __loadPage_request.url;

    script.call(this);

    if (typeof (this.dispose) == "function") {
        var cDispose = $("#" + this.parentid).find("div").eq(0);
        cDispose.data("__dispose", this.dispose);
    }
};

ZEGHS.Vue = function (args) {
    if (!args.hasOwnProperty("mounted")) {
        args.mounted = function () {
            ZEGHS.__CreateLoader(this.$el.id);
        };
    }
    return new Vue(args);
};

ZEGHS.loadImage = function (url) {
    return url + "?t=" + (new Date()).getTime().toString();
};

ZEGHS.loadPage = function (mainId, object, frame) {
    HoldOn.open({ theme: "sk-cube-grid", message: "Loading..." });

    var sURL = undefined;
    if (typeof (object) == "string") {
        if (frame == undefined) {
            sURL = object;
        } else {
            sURL = frame;
            session.add("__frame_context_url", object);
        }
    } else {
        var sFrame = object.attr("data-frame");
        if (sFrame == undefined) {
            sURL = object.attr("data-link");
        } else {
            sURL = sFrame;
            session.add("__frame_context_url", object.attr("data-link"));
        }
    }

    if (sURL.length == 0) {
        HoldOn.close();
    } else {
        $.ajax({
            type: "GET",
            url: sURL + "?t=" + (new Date()).getTime().toString(),
            success: function (data, textStatus, jqXHR) {
                //封裝 loadPage request 參數(此參數提供給 ZEGHS.Run 使用)
                __loadPage_request.parentid = mainId;
                __loadPage_request.url = sURL;

                if (sURL.charAt(sURL.length - 1) == '}') {
                    var iIndex = sURL.indexOf("?");
                    if (iIndex > -1) {
                        __loadPage_request.query = JSON.parse(sURL.substr(iIndex + 6));
                    }
                }

                $("#" + mainId).dispose();
                $("#" + mainId).empty().html(data);

                ZEGHS.__CreateLoader(mainId);
                __loadPage_request = {};

                HoldOn.close();
            }
        });
    }
};

ZEGHS.request = function (method, args, callback, blockLoading) {
    var oResult = {};
    if (callback != undefined) {
        blockLoading = blockLoading || false;
        if (!blockLoading) {
            HoldOn.open({ theme: "sk-cube-grid", message: "Loading..." });
        }
    }

    args = args || {};
    args.token = __token;

    $.ajax({
        async: (callback != undefined),
        type: "POST",
        url: __WEBSERVICES_URL + method,
        data: JSON.stringify(args),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus, jqXHR) {
            oResult = data;

            if (callback != undefined) {
                HoldOn.close();

                var token = oResult.data.token;
                if (token != undefined) {
                    __token = token;
                    delete oResult.data.token;
                }

                if (oResult.code != 0) {
                    if (ZEGHS.__debug) {
                        console.log(oResult);
                    }

                    //User token expiry 就強制登出並讓使用者重新登入
                    if (oResult.data.id === "ERROR_MEMBER_USERTOKEN_EXPIRY") {
                        ZEGHS.MessageBox.show(PK10.Error["ERROR_MEMBER_USERTOKEN_EXPIRY"], "Expiry", {
                            "ok": function () {
                                window.location.href = "index.html";
                            }
                        });
                        return;
                    }
                }

                callback(oResult);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("[" + jqXHR.status + "] " + errorThrown + "\n\nMethod:post\nDataType:json\n\n" + JSON.stringify(args));
        }
    });
    return oResult;
};

//------------------------------------------------------------------------------------------
// ZEGHS.Session
//------------------------------------------------------------------------------------------
ZEGHS.Session = function () {
    this.__oSession = {};
    this.id = 0;

    ZEGHS.Session.prototype.__getSessionId.call(this);
};

ZEGHS.Session.prototype.__getSessionId = function () {
    var cKeys = new Array();
    var sKEY = "0123456789abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 24; i++) {
        var iIndex = Math.random() * 36;
        cKeys.push(sKEY.charAt(iIndex));
    }
    this.id = cKeys.join("");
};

ZEGHS.Session.prototype.add = function (key, value) {
    this.__oSession[key] = value;
};

ZEGHS.Session.prototype.clear = function () {
    this.__oSession = {};
};

ZEGHS.Session.prototype.getValue = function (key) {
    return this.__oSession[key];
};

ZEGHS.Session.prototype.remove = function (key) {
    if (this.__oSession[key] !== undefined) {
        delete this.__oSession[key];
    }
};

//------------------------------------------------------------------------------------------
// ZEGHS.MessageBox
//------------------------------------------------------------------------------------------
ZEGHS.MessageBox = {};
ZEGHS.MessageBox.show = function (text, caption, buttons) {
    buttons = buttons || { "ok": undefined };

    var cButtons = {};
    $.each(buttons, function (cmd, callback) {
        var cButton = $.extend({}, ZEGHS.MessageBox.__cButtons[cmd]);  //淺層拷貝
        if (callback != undefined) {
            cButton.callback = callback;
        }

        cButtons[cmd] = cButton;
    });

    bootbox.dialog({
        message: text,
        title: caption,
        buttons: cButtons
    });
};

//------------------------------------------------------------------------------------------
// 基本函數擴充功能
//------------------------------------------------------------------------------------------
Date.prototype.addDays = function (days) {
    this.setTime(this.getTime() + days * 86400000);
    return this;
};

Number.prototype.padLeft = function (ch, base) {
    var nr = this, iLength = (base - String(nr).length) + 1;
    return ((iLength > 0) ? new Array(iLength).join(ch) + nr : nr.toString());
};

Number.prototype.padRight = function (ch, base) {
    var nr = this, iLength = (base - String(nr).length) + 1;
    return ((iLength > 0) ? nr + (new Array(iLength).join(ch)) : nr.toString());
};

Number.prototype.toThousand = function (decimal) {
    var re = '\\d(?=(\\d{3})+' + (decimal > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, Number(decimal))).replace(new RegExp(re, 'g'), '$&,');
};

$.fn.dispose = function () {
    if (this == undefined) {
        return;
    }

    var cDispose = this.data("__dispose");
    if (cDispose != undefined) {
        cDispose();
    }

    this.children().each(function (index, cDOM) {
        var cjDOM = $(cDOM);
        if (cjDOM.children().length > 0) {
            cjDOM.dispose();
        }

        cjDOM.off();
        cjDOM.removeData();
        cjDOM.empty();
        cjDOM.remove();
    });
};

//------------------------------------------------------------------------------------------
var __language = "zh-TW";
var __loadPage_request = {};
var __WEBSERVICES_URL = "http://" + location.host;  //遠端服務 Host

var session = new ZEGHS.Session();
var storage = window.localStorage;