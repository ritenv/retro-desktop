var UXIcon = function(param) {
    
    param.UX = {}
    //create icon
    var template = $("#ux-icon-template").html();
    var ID = Desktop.genID();
    template = template.replace("{ID}", ID);
    template = template.replace("ux-icon-class-replace", param.iconClass);
    template = template.replace("ux-icon-class-small-replace", (param.iconClassSmall == undefined ? "icon-general-16" : param.iconClassSmall ));
    template = template.replace("{title}", param.title);
    template = template.replace("{status}", param.status);
    $((param.renderTo || ".ux-icon-holder")).append(template);
    
    param.UX.iconID = ID;
    
    Desktop.get(ID).hover(function() {
        $(this).addClass("ux-icon-hover");
    }, function() {
        $(this).removeClass("ux-icon-hover");
    });
    
    Desktop.get(ID).click(function() {
        if ($(this).attr("ux-window")) {
            Desktop.get($(this).attr("ux-window")).trigger("activate");
            return;
        }
        this.uxWindow = new UXWindow(param);
        Desktop.get(ID).attr("ux-window", this.uxWindow.attr("id"));
        this.uxWindow.attr("ux-icon", ID);
        
        //create icons if this was a folder
        if (param.items && param.items.length) {
            for (var i in param.items) {
                var item = param.items[i];
                item.renderTo = this.uxWindow.find(".ux-window-content");
                new UXIcon(item);
            }
            Desktop.placeIconsHorizontally(this.uxWindow.find(".ux-window-content"));
            this.uxWindow.trigger("loadComplete")
        }
    }).attr("ux-id", param.id);
    
    if (param.iconStyles != undefined)
        Desktop.get(ID).css(param.iconStyles);
    
    //create taskbar icon only if rendering on desktop
    if (param.renderTo == undefined && param.hideFromTaskMenu !== true)
        this.uxTaskbarIcon = new UXTaskbarIcon(param);
    
    //if icon is placed on the desktop, call placing function to place them well
    if (param.renderTo == undefined)
        Desktop.placeIcons();
    
    return Desktop.get(ID);
}