var UXNotify = function(param) {
    setTimeout(function() {
        if (param.text != undefined)
            $.noticeAdd({text:param.text, stay: param.stay});
    }, 1);
}