App_init = function() {
    $(document).bind("keydown", function(e) {
        var nextWin;
        if(e.which == 27) { //Escape keycode
            if (Desktop.activeWindow().is(".ux-close-on-esc") || e.shiftKey)
                Desktop.activeWindow().trigger("close");
        }
        
        if(e.which == 192 || e.which == 49) { //Tab keycode
            if (e.shiftKey) {
                nextWin = Desktop.activeWindow().next(".ux-window");
                nextWin = nextWin.length ? nextWin : $(".ux-window:first");
                nextWin.trigger("activate");
            }
        }
        if (e.ctrlKey && e.shiftKey) {
            nextWin = Desktop.activeWindow().next(".ux-window");
            nextWin = nextWin.length ? nextWin : $(".ux-body .ux-window:first");
            nextWin.trigger("activate");
        }
    });
    
    $(".close-all-windows").parent().click(function() {
        $(".ux-window").trigger("close");
        $(".ux-taskbar-menu-overlay").click();
    })
    $(".close-active-window").parent().click(function() {
        Desktop.activeWindow().trigger("close");
        $(".ux-taskbar-menu-overlay").click();
    })
    
    if ($(".ux-taskbar-icon-holder").height() > $(".ux-taskbar-icon-holder-wrapper").height())
        $(".ux-taskbar-scroll-down").show();
    var hoverInterval;
    $(".ux-taskbar-scroll-down").hover(function() {
        clearInterval(hoverInterval);
        $(".ux-taskbar-scroll-up").fadeIn();
        hoverInterval = setInterval(function() {
            $(".ux-taskbar-icon-holder-wrapper").scrollTop($(".ux-taskbar-icon-holder-wrapper").scrollTop()+1);
        }, 1);
    }, function() {
        clearInterval(hoverInterval);
    });
    $(".ux-taskbar-scroll-up").hover(function() {
        $(".ux-taskbar-scroll-up").fadeIn();
        clearInterval(hoverInterval);
        hoverInterval = setInterval(function() {
            $(".ux-taskbar-icon-holder-wrapper").scrollTop($(".ux-taskbar-icon-holder-wrapper").scrollTop()-1);
            if ($(".ux-taskbar-icon-holder-wrapper").scrollTop() == 0)
                $(".ux-taskbar-scroll-up").fadeOut();
        }, 1);
    }, function() {
        clearInterval(hoverInterval);
    });
    
    
    $(".ux-taskbar-config-holder .ux-taskbar-icon").hover(function() {
        $(this).addClass("ux-taskbar-icon-hover");
    }, function() {
        $(this).removeClass("ux-taskbar-icon-hover");
    });
    
    
    $(".ux-taskbar-menu-button").hover(function() {
        
    }, function() {

    }).click(function() {
        if ($(".ux-taskbar-menu-overlay").length) {
            $(".ux-taskbar-menu-overlay").click()
            return;
        }
        $(".ux-taskbar-menu-popup").stop().animate({opacity: 0.9, height: $(".ux-taskbar-menu-popup").css("max-height")}, 300);
        $(".ux-taskbar-menu-overlay").remove();
        $("#ux-desktop-wrapper").append("<div class='ux-taskbar-menu-overlay'></div>");
        $(".ux-taskbar-menu-overlay, .ux-taskbar-buttons").click(function() {
            $(".ux-taskbar-menu-popup").stop().animate({height: 0, opacity: 0});
            $(".ux-taskbar-menu-overlay").remove();
        })
    });
    
    $(".ux-show-desktop").click(function() {
        $(".ux-window:not(.ux-minimized) .ux-controls-min").click();
    });
    
    
    $(window).resize(function() {
        $(".ux-taskbar-quick-launch").css({left: $(".ux-taskbar-menu").width()});
        $(".ux-taskbar-buttons").css({left: $(".ux-taskbar-menu").width()+$(".ux-taskbar-quick-launch").width(), width: Desktop.screenWidth() - $(".ux-taskbar-menu").width() - $(".ux-taskbar-quick-launch").width()});
    });
    $(window).resize();
    $.each($(".ux-window"), function(i, elem) {
        window_resize($(elem))
    });
    
}
$(window).load(function() {
    setTimeout(App_init, 100);
});