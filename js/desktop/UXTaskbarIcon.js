var UXTaskbarIcon = function(param) {
    //create icon
    var template = $("#ux-taskbar-icon-template").html();
    var ID = Desktop.genID();
    template = template.replace("{ID}", ID);
    template = template.replace("ux-icon-class-small-replace", (param.iconClassSmall == undefined ? Desktop.globals.generalIcon : param.iconClassSmall ));
    template = template.replace("{title}", param.title);
    $(".ux-taskbar-icon-holder").append(template);
    Desktop.get(ID).click(function() {
        if (param.UX.iconID) {
            setTimeout(function() {
                Desktop.get(param.UX.iconID).click();
                $(".ux-taskbar-menu-overlay").click();
            }, 100)
        }
    }).hover(function() {
        $(this).addClass("ux-taskbar-icon-hover");
    }, function() {
        $(this).removeClass("ux-taskbar-icon-hover");
    });
}