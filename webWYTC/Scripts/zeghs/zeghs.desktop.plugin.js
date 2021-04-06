//__ZEGHS_PACKER_ENCODE_ENABLED (此註解用來提醒編碼器需要將此檔案編碼)

ZEGHS.language = function (lang) {
    __language = lang;

    $.i18n.properties({
        name: "Resource.Desktop",
        path: "Scripts/resources/",
        mode: "map",
        language: lang
    });

    //設定多語系 MessageBox 按鈕文字
    ZEGHS.MessageBox.__cButtons = {
        "cancel": { label: $.i18n.prop("messagebox_button_CANCEL_text"), className: "btn-default" },
        "ignore": { label: $.i18n.prop("messagebox_button_IGNORE_text"), className: "btn-warning" },
        "no": { label: $.i18n.prop("messagebox_button_NO_text"), className: "btn-default" },
        "ok": { label: $.i18n.prop("messagebox_button_OK_text"), className: "btn-primary" },
        "retry": { label: $.i18n.prop("messagebox_button_RETRY_text"), className: "btn-danger" },
        "yes": { label: $.i18n.prop("messagebox_button_YES_text"), className: "btn-success" }
    };
};