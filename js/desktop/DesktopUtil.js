var Desktop = {
    globals: {
        windowOffset: 0,
        generalIcon: "icon-general-16"
    },
    open: function(UXID) {
        this.activeWindow().attr("ux-wait", 100);
        setTimeout(function() {
            Desktop.getIcon(UXID).click();
        }, 10);
    },
    genID: function() {
    	return "ux-elem-" + parseInt(Math.random() * 1000000000000);
	},
    get: function(id) {
        return $("#"+id);
    },
    getWindow: function(UXID) {
        return $("*[ux-id='" + UXID + "-window']");
    },
    getIcon: function(UXID) {
        return $("*[ux-id='" + UXID + "']");
    },
    makeUXID: function(id) {
        return id + "-window";
    },
    screenWidth: function() {
        return $(".ux-body").width();
    },
    screenHeight: function() {
        return $(".ux-body").height() - $(".ux-taskbar").height();
    },
    windowOffset: function() {
        if (Desktop.mobile.detect())
            return 0;
        return ( (Desktop.globals.windowOffset += 10) < 90 ? Desktop.globals.windowOffset : (Desktop.globals.windowOffset = 0));
    },
    activeWindow: function() {
        return $(".ux-window-active");
    },
    placeIcons: function(parent) {
        var containerHeight = parent != undefined ? $(parent).height() : Desktop.screenHeight();
        if (parent == undefined) {
            $(".ux-icon-holder").height(Desktop.screenHeight());
        }
        var totalIcons = $(".ux-icon-holder .ux-icon").length;
        var iconHeight = $(".ux-icon:first").height() + parseInt($(".ux-icon:first").css("marginTop")) + parseInt($(".ux-icon:first").css("marginBottom"));
        var iconWidth = $(".ux-icon:first").width() + parseInt($(".ux-icon:first").css("marginLeft")) + parseInt($(".ux-icon:first").css("marginRight"));
        var inOneColumn = Math.floor(containerHeight / iconHeight);
        var totalColumns = Math.ceil(totalIcons / inOneColumn);
        
        for (var col=1;col<=totalColumns;col++) {
            for (var row=1;row<=inOneColumn;row++) {
                icon = col > 1 ? row+(inOneColumn*(col-1))-1 : row-1;
                var uxIcon = parent ? $(parent).find(".ux-icon:eq("+(icon)+")") : $(".ux-icon-holder .ux-icon:eq("+(icon)+")");
                uxIcon.stop().animate({
                    top: row==1?0:((row-1)*iconHeight),
                    left: ((col-1)*iconWidth)
                });
            }
        }
//        $(".ux-icon-holder").width(iconWidth * totalColumns);
    },
    placeIconsHorizontally: function(parent) {
        
        var containerWidth = parent != undefined ? $(parent).width() : Desktop.screenWidth();
        if (parent == undefined) {
            $(".ux-icon-holder").height(Desktop.screenWidth());
        }
        var totalIcons = $(".ux-icon-holder .ux-icon").length;
        var iconHeight = $(".ux-icon:first").height() + parseInt($(".ux-icon:first").css("marginTop")) + parseInt($(".ux-icon:first").css("marginBottom"));
        var iconWidth = $(".ux-icon:first").width() + parseInt($(".ux-icon:first").css("marginLeft")) + parseInt($(".ux-icon:first").css("marginRight"));
        var inOneRow = Math.floor(containerWidth / iconWidth);
        var totalRows = Math.ceil(totalIcons / inOneRow);
        for (var row=1;row<=totalRows;row++) {
            for (var col=1;col<=inOneRow;col++) {
                icon = row > 1 ? col+(inOneRow*(row-1))-1 : col-1;
                var uxIcon = parent ? $(parent).find(".ux-icon:eq("+(icon)+")") : $(".ux-icon-holder .ux-icon:eq("+(icon)+")");
                uxIcon.stop().animate({
                    top: row==1?0:((row-1)*iconHeight),
                    left: ((col-1)*iconWidth)
                });
            }
        }
//        $(".ux-icon-holder").width(iconWidth * totalColumns);
    },
    
    mobile: {
            detect:function(){
                    var uagent = navigator.userAgent.toLowerCase(); 
                    var list = this.mobiles;
                    var ismobile = false;
                    for(var d=0;d<list.length;d+=1){
                            if(uagent.indexOf(list[d])!=-1){
                                    ismobile = list[d];
                            }
                    }
//                    ismobile = "iphone";
                    if (ismobile) {
                        $("body").addClass("mobile").addClass(ismobile);
                    }
                    return ismobile;
            },
            mobiles:[
                    "midp","240x320","blackberry","netfront","nokia","panasonic",
                    "portalmmm","sharp","sie-","sonyericsson","symbian",
                    "windows ce","benq","mda","mot-","opera mini",
                    "philips","pocket pc","sagem","samsung","sda",
                    "sgh-","vodafone","xda","palm","iphone",
                    "ipod","android"
            ]
    }
}
$(document).ready(function() {
    if (Desktop.mobile.detect()) {
        $('<link rel="stylesheet" href="css/mobile.css"></script>').appendTo("head");
        $(".ux-taskbar-menu-popup").css({maxHeight: 375});
        $("body").addClass("mobile-device");
    }
})
$(window).resize(function() {
    Desktop.placeIcons();
});
