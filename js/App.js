$(window).load(function() {
    var config;
    
    UXIcon({
        iconClass: "icon-typography",
        iconClassSmall: "icon-typography-16",
        title: "HTML Elements",
        status: "Typography throughout this template",
        autoLoad: "ajax-samples/html.html",
        width: 1000,
        height: "80%"
    });
    
    UXIcon({
        iconClass: "icon-widget",
        iconClassSmall: "icon-widget-16",
        title: "Widgets",
        status: "Flexible Widgets",
        autoLoad: "ajax-samples/widgets.html",
        width: 824,
        height: 535
    });
    UXIcon({
        iconClass: "icon-table",
        iconClassSmall: "icon-table-16",
        title: "Tables",
        status: "Flexible Tables",
        autoLoad: "ajax-samples/tables.html",
        width: 824,
        height: 535
    });
    UXIcon({
        iconClass: "icon-forms",
        iconClassSmall: "icon-forms-16",
        title: "Forms",
        status: "Forms for various type of data input",
        autoLoad: "ajax-samples/forms.html",
        width: 824,
        height: 535,
        listeners: {
            loadComplete: function(e, context) {
                $(context).find("input, textarea, select, button").uniform();
            }
        }
    });
    
    UXIcon({
        iconClass: "icon-charts",
        iconClassSmall: "icon-charts-16",
        title: "Charts",
        status: "Charts for various type of data visualizations",
        autoLoad: "ajax-samples/charts.html",
        width: 824,
        height: 535,
        listeners: {
            loadComplete: function(e, context) {
                $(context).find(".charts-list a").click(function(e) {
                    var chartUrl = $(this).attr("href");
                    new UXWindow({
                        title: "Chart Demo",
                        mode: "iframe",
                        width: 700,
                        height: 520,
                        autoLoad: chartUrl
                    });
                    e.preventDefault();
                })
            }
        }
    });
    
    
    UXIcon({
        id: "api-practice",
        iconClass: "icon-api-practice", 
        iconClassSmall: "icon-api-practice-16", 
        title: "API Practice",
        status: "See how your different desktop icons can be called and interacted.", 
        autoLoad: "ajax-samples/api_practice.html",
        height: 550,
//        confirmBeforeClose: true,
        listeners: {
            
            loadComplete: function(e, context) {
                $(context).find(".games").click(function() {
                    Desktop.open("games-folder");
                });
                
                $(context).find(".minimize").click(function() {
//                    Desktop.open("games-folder");
                    Desktop.getWindow("games-folder").trigger("minimize");
                });
                $(context).find(".close").click(function() {
//                    Desktop.open("games-folder");
                    Desktop.getWindow("games-folder").trigger("close");
                });
                new UXNotify({text:"Load Complete."});
            }
        }
    });
    
    UXIcon({
        iconClass: "icon-terminal",
        iconClassSmall: "icon-terminal-16", 
        title: "Practice Area", 
        autoLoad: "ajax-samples/practice.html", 
        mode: "ajax",
        width: 480,
        height: 480,
        left: 150
    });
    UXIcon({
        id: "other-websites-folder",
        iconClass: "folder", 
        iconClassSmall: "folder16", 
        title: "Favorite Websites", 
        width: 400,
        status: "List of favorite Websites",
        hideFromTaskMenu: true,
//        closeOnDeactivate: true,
        items: [
            {
                iconClass: "icon-website", 
                iconClassSmall: "icon-website-16", 
                title: "Theme Forest", 
                status: "Search the Web!", 
                autoLoad: "http://www.themeforest.net/",
                mode: "iframe", 
                width: 608,
                height: 520
            },
            {
                iconClass: "icon-website", 
                iconClassSmall: "icon-website-16", 
                title: "Activeden", 
                status: "Flash and Unity 3D!", 
                autoLoad: "http://www.activeden.com/",
                mode: "iframe", 
                width: 608,
                height: 520,
                maximized: true
            },
            {
                iconClass: "icon-website", 
                iconClassSmall: "icon-website-16", 
                title: "Graphic River", 
                status: "Graphics, Vectors and Print!", 
                autoLoad: "http://www.graphicriver.net/",
                mode: "iframe", 
                width: 608,
                height: 520,
                maximized: true
            }


        ]
        
    });
    UXIcon({
        id: "games-folder",
        iconClass: "folder", 
        iconClassSmall: "folder16", 
        title: "Games", 
        width: 400,
        status: "List of favorite applications",
        hideFromTaskMenu: true,
//        closeOnDeactivate: true,
        items: [
            {
                iconClass: "folder", 
                iconClassSmall: "folder16", 
                title: "Action", 
                status: "",
                listeners: {
                    loadComplete: function() {
                        new UXNotify({text:"Render Complete."});
                    }
                },
                items: [
                    {
                        iconClass: "icon-skater", 
                        iconClassSmall: "icon-skater-16", 
                        title: "Extreme Skater", 
                        status: "Skate your way through!", 
                        autoLoad: "http://www.miniclip.com/games/extreme-skater/en/gameloader.swf?mc_gamename=Extreme+Skater&mc_hsname=3090&mc_shockwave=0&mc_scoreistime=0&mc_lowscore=0&mc_negativescore=0&mc_icon=extremeskatersmallicon.jpg&mc_iconBig=extremeskatermedicon.jpg&mc_players_site=1&fn=ExtremeSkater.swf&mc_gameUrl=%2Fgames%2Fextreme-skater%2Fen%2F&mc_sessid=50677221068636160-633368403-8995420199557529600&mc_v2=1&mc_ua=7261d0c&mc_geo=NapMad&mc_geoCode=AE&loggedin=0",
                        mode: "iframe", 
                        width: 608,
                        height: 520,
                        allowMaximize: false,
                        allowResize: false
                    }
                    
                    
                ]

            },{
                iconClass: "folder", 
                iconClassSmall: "folder16", 
                title: "Sports", 
                status: "",
                items: [
                    {
                        iconClass: "icon-cricket", 
                        iconClassSmall: "icon-cricket-16", 
                        title: "Cricket", 
                        status: "Cricket is here! Mouse your mouse to move the bat!", 
                        autoLoad: "http://www.miniclip.com/games/extreme-skater/en/gameloader.swf?mc_gamename=Extreme+Skater&mc_hsname=3090&mc_shockwave=0&mc_scoreistime=0&mc_lowscore=0&mc_negativescore=0&mc_icon=extremeskatersmallicon.jpg&mc_iconBig=extremeskatermedicon.jpg&mc_players_site=1&fn=ExtremeSkater.swf&mc_gameUrl=%2Fgames%2Fextreme-skater%2Fen%2F&mc_sessid=50677221068636160-633368403-8995420199557529600&mc_v2=1&mc_ua=7261d0c&mc_geo=NapMad&mc_geoCode=AE&loggedin=0",                        width: 640,
						mode: "iframe",
                        height: 420,
                        allowResize: false
                    }
                ]

            }
            
        ]
        
    });
    new UXNotify({text:"For best user experience, view your browser in Full Screen. (F11 in Windows, CMD+SHIFT+F in OSX", stay: true});
});


//demo-related configuration options
var exampleDotComConfig = {
    title: "www.example.com",
    autoLoad: "http://www.example.com",
    mode: "iframe",
    width: 850,
    height: 600,
    maximize: true
}

//demo-related configuration options for API Practice
var APIDocConfig = {
    title: "API Documentation",
    autoLoad: "WebOS-Desktop-Manual.pdf",
    mode: "iframe",
    width: 850,
    height: 600,
    maximize: true,
    maximized: true
}
