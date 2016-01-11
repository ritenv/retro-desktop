var UXTaskbutton = function(param) {
    var template = $("#ux-taskbutton-template").html().toString();
    var ID = Desktop.genID();
    template = template.replace("{ID}", ID);
    template = template.replace("ux-icon-class-small-replace", (param.iconClassSmall == undefined ? Desktop.globals.generalIcon : param.iconClassSmall ));
    template = template.replace("{title}", (param.title.length > 15 ? param.title.substr(0,15) + "..." : param.title));
    $(".ux-taskbar-buttons").append(template);
    
    Desktop.get(ID).click(function() {
        if (!$(this).hasClass("ux-taskbar-button-active")) {
            Desktop.get($(this).attr("ux-window")).trigger("activate");
        } else {
            if (param.allowMinimize !== false) {
                var win = Desktop.get($(this).attr("ux-window"));
                if (win.not(":animated").length)
                    win.trigger("minimize");
            }
        }
    }).dblclick(function() {
        Desktop.get($(this).attr("ux-window")).trigger("close");
    });
    
    Desktop.get(ID).bind("activate", function() {
        $(this).addClass("ux-taskbar-button-active");
    });
    Desktop.get(ID).bind("deactivate", function() {
        $(this).removeClass("ux-taskbar-button-active");
    })
    
    return Desktop.get(ID);
}