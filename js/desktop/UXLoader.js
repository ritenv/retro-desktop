UXLoaderImage = "images/system/loader.gif";
var UXLoader = function(selector, param) {
    if (!$(selector).length) {
        return;
    }
    $(selector).html("<img class='ux-loader-image' src='"+UXLoaderImage+"' />");
    if (param.mode != "iframe") {
        $(selector).load(param.autoLoad, "", (param.onComplete || function() {}));
    } else {
        var ID = Desktop.genID();
        var iframeTemplate = "<iframe id='{ID}' width='100%' height='100%' src='{src}' frameborder='0'></iframe>".replace("{src}", param.autoLoad).replace("{ID}", ID);
        $(selector).html("")
        $(iframeTemplate).appendTo(selector).load((param.onComplete || function() {}));
//        $(selector).html(iframeTemplate);
    }
}