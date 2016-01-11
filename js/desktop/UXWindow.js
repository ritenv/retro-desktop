
var UXWindow = function(param) {
    var parentContainer = $("#ux-desktop-wrapper");
    //if window with given id exists, do not open again
    if (param.id != undefined) {
//        alert(Desktop.getWindow(param.id).length);
        if (Desktop.getWindow(param.id).length) {
            Desktop.open(param.id)
            return false;
        }
    }
    
    var template = $("#ux-window-template").html().toString();
    var ID = Desktop.genID();
    template = template.replace("{ID}", ID);
    template = template.replace("ux-icon-class-small-replace", (param.iconClassSmall == undefined ? Desktop.globals.generalIcon : param.iconClassSmall ));
    template = template.replace("{title}", param.title);
    template = template.replace("{status}", (param.status==undefined?"":param.status));
    $("#ux-desktop-wrapper").append(template);
    var win = Desktop.get(ID);
    win.attr("ux-id", Desktop.makeUXID(param.id));
    if (param.width)
        win.width(param.width);
    if (param.height)
        win.height(param.height);
    if (param.left)
        win.css({left: param.left});
    else
        win.css({left: parseInt(win.css("left")) + Desktop.windowOffset()});
    if (param.top)
        win.css({top: param.top});
    else
        win.css({top: parseInt(win.css("top")) + Desktop.windowOffset()});
    
    
    this.taskButton = new UXTaskbutton(param);
    win.attr("ux-taskbutton", this.taskButton.attr("id"));
    this.taskButton.attr("ux-window", ID);
        
//    window events binding

    //close on "ESC" if this is a folder, or if param is passed
    if ((param.items && param.items.length) || param.closeOnEsc === true) {
        win.addClass("ux-close-on-esc");
    }
    win.bind("click", function(e) {
        if (!$(this).hasClass("ux-window-active") && !$(this).attr("ux-wait")) {
            win.trigger("activate", win.find(".ux-window-content"));
        } else {
            setTimeout(function() {
                $(win).attr("ux-wait", "");
            }, $(win).attr("ux-wait"));
        }
    });
    
    win.bind("loadComplete", function() {
        if (win.hasClass("ux-load-complete"))
            return;
        win.addClass("ux-load-complete");
    });
    
    //render is same as activate, but it will only be called once in a window's lifetime
    win.bind("render", function() {
        
    });
    
    win.bind("activate", function() {
        
        //if there is an overlay, don't activate other windows, return false to this function
        if ($(".ux-modal-overlay").length)
            return false;
        
//        call deactivate for active window
        $(".ux-window-active").trigger("deactivate", win.find(".ux-window-content"));
        
        Desktop.get(win.attr("ux-taskbutton")).trigger("activate", win.find(".ux-window-content"));
        $(".ux-window").css({zIndex: 10});
        win.css({zIndex: 12});
        if (!win.is(":visible")) {
            win.show();
            var opts;
            //window was maximized before being minimized
            if (Desktop.mobile.detect())
                opts = {opacity:1, top:0, left:0, width: Desktop.screenWidth(), height: Desktop.screenHeight()}
            else
                opts = {opacity:1, top:win.attr("origTop"), left:win.attr("origLeft"), width: win.attr("origWidth"), height: win.attr("origHeight")}
            
            win.animate(opts, 300, function() {
                window_resize(win);
                win.removeClass("ux-minimized");
            });
            win.attr("origWidth", "").attr("origHeight", "").attr("origTop", "").attr("origLeft", "");
        }
        win.addClass("ux-window-active");
    });
    win.bind("deactivate", function() {
        win.removeClass("ux-window-active");
        Desktop.get(win.attr("ux-taskbutton")).trigger("deactivate");
        if (param.closeOnDeactivate == true)
            win.trigger("close");
    })
    
    win.bind("close", function() {
        if (param.confirmBeforeClose) {
            if (!confirm("Are you sure you want to close this window?"))
                return false;
        }
        var taskbutton = Desktop.get(win.attr("ux-taskbutton"));
        win.animate({opacity: 0, top:taskbutton.offset().top, left:taskbutton.offset().left, width: taskbutton.width(), height: taskbutton.height()}, 300, function() {
            win.hide();
            
            Desktop.get(win.attr("ux-icon")).attr("ux-window", "");
            Desktop.get(win.attr("ux-taskbutton")).remove();
            if (param.isModal) {
                $(".ux-modal-overlay").fadeOut(function() {
                    $(this).remove();
                });
            }
            setTimeout(function() {
                parentContainer.find(".ux-window:last").trigger("activate", $(".ux-window:last .ux-window-content"));
            }, 100);
            
            win.remove();
        });
        
    });

    win.bind("resize", function() {
        Desktop.placeIconsHorizontally(win.find(".ux-window-content"));
        window_resize(win);
    })
    
    win.find(".ux-window-resizer")
      .drag("start",function( ev, dd ){
         dd.width = win.width();
         dd.height = win.height();
      })
      .drag(function( ev, dd ){
         win.css({
            width: Math.max( 20, dd.width + dd.deltaX ),
            height: Math.max( 20, dd.height + dd.deltaY )
         });
         win.trigger("resize", win.find(".ux-window-content"));
      });
      
    win.bind("dragStart", function() {
        if (!win.hasClass("ux-window-active")) {
            win.trigger("activate", win.find(".ux-window-content"));
        }
    });
    win.find('.ux-window-header').bind('drag',function(ev, dd){
        if (win.attr("origWidth"))
            return false;
        win.css({
                top: dd.offsetY,
                left: dd.offsetX
        });
    }).bind("dragstart", function() {
        win.trigger("dragStart", win.find(".ux-window-content"));
        
    }).bind("dragend", function() {
        win.trigger("dragComplete", win.find(".ux-window-content"));
    });
//    win.find(".ux-window-resizer").drag("start",function( ev, dd ){
//         dd.width = $( this ).width();
//         dd.height = $( this ).height();
//    }).bind("drag", function( ev, dd ){
//         win.css({
//            width: Math.max( 20, dd.width + dd.deltaX ),
//            height: Math.max( 20, dd.height + dd.deltaY )
//        });
//    });
    
    win.bind("minimize", function(e) {
        //timeout is required to prevent from calling "activated" upon minimizing, caused because "minimized" even is fired before "click"
        setTimeout(function() {
            //store window height if it is not maximized
            if (!win.hasClass("ux-maximized")) {
                win.attr("origWidth", win.width());
                win.attr("origHeight", win.height());
                win.attr("origTop", win.offset().top);
                win.attr("origLeft", win.offset().left);
            }
            var taskbutton = Desktop.get(win.attr("ux-taskbutton"));
            win.animate({opacity: 0, top:taskbutton.offset().top, left:taskbutton.offset().left, width: taskbutton.width(), height: taskbutton.height()}, 300, function() {
                win.hide();
                taskbutton.removeClass("ux-taskbar-button-active");
                win.addClass("ux-minimized");
            });
        }, 1);
    });
    win.bind("maximize", function() {
        if (win.attr("origWidth") && !Desktop.mobile.detect()) { //if its a mobile device, it always should maximize to full size
            win.animate({opacity:1, top:win.attr("origTop"), left:win.attr("origLeft"), width: win.attr("origWidth"), height: win.attr("origHeight")}, 300, function() {
                window_resize(win);
            });
            win.attr("origWidth", "").attr("origHeight", "").attr("origTop", "").attr("origLeft", "");
            win.removeClass("ux-maximized");
            return;
        }
        win.attr("origWidth", win.width());
        win.attr("origHeight", win.height());
        win.attr("origTop", win.offset().top);
        win.attr("origLeft", win.offset().left);
        win.animate({opacity:1, top:0, left:0, width: Desktop.screenWidth(), height: Desktop.screenHeight()}, 300, function() {
            window_resize(win);
            win.addClass("ux-maximized");
        });
    });
    
    for (var i in param.listeners) {
        win.bind(i, param.listeners[i]);
    }
    
    win.find('.ux-controls-max').click(function(e) {
        if (param.allowMaximize === false)
            return false;
        win.trigger("maximize", win.find(".ux-window-content"));
        e.stopPropagation();
    });
    
    win.find('.ux-controls-min').click(function(e) {
        if (param.allowMinimize === false)
            return false;
        win.trigger("deactivate", win.find(".ux-window-content"));
        win.trigger("minimize", win.find(".ux-window-content"));
        e.stopPropagation();
    });
    
    win.find('.ux-controls-close').click(function(e) {
            win.trigger("beforeClose", win.find(".ux-window-content"));
            win.trigger("close", win.find(".ux-window-content"));
            e.stopPropagation();
    });

    win.find('.ux-window-header').dblclick(function() {
        if (param.allowMaximize === false)
            return false;
        win.trigger("maximize", win.find(".ux-window-content"));
    })
    win.show();
    window_resize(win);
    win.hide();
    win.fadeIn(150);
//window events binding complete





    setTimeout(function() {
        win.trigger("activate", win.find(".ux-window-content"));
    }, 10);
    
    
    if (param.maximized || Desktop.mobile.detect())
        win.trigger("maximize", win.find(".ux-window-content"));
    
    if (param.allowMinimize === false || param.isModal === true)
        win.find(".ux-controls-min").remove();
    
    if (param.allowMaximize === false || Desktop.mobile.detect())
        win.find(".ux-controls-max").remove();
    
    if (param.allowResize === false)
        win.find(".ux-window-resizer").remove();
    
     if (param.isModal === true) {
         $("#ux-desktop-wrapper").append("<div class='ux-modal-overlay'></div>");
         $(".ux-modal-overlay").css("opacity", 0.8);
     }
    
    //now all window-related processing is over. Before we call the loader, let's "rendered" the window
    win.trigger("render", win.find(".ux-window-content"));
    
    //"rendered" after loading URL
    if (param.autoLoad) {
        param.onComplete = function() {
            Desktop.get(ID).trigger("loadComplete", win.find(".ux-window-content"))
        }
        new UXLoader(Desktop.get(ID).find(".ux-window-content"), param);
    } else if (param.html) {
        Desktop.get(ID).find(".ux-window-content").html(param.html);
        //"rendered" now, because no URL to load anyway
        Desktop.get(ID).trigger("loadComplete", win.find(".ux-window-content"));
    }
    
    return Desktop.get(ID);
}
var window_init = function(elem, param) {}
var window_resize = function(win) {
    win = $(win);
    win.find(".ux-window-content").css({
        height: 
            win.height() - win.find(".ux-window-header").height() - win.find(".ux-window-status").height()
    }, 300);
}