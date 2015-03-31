//TEST DATA
//IGNORE
var ok;

nodecg.declareSyncedVar({
    variableName: 'platesData',
    setter: function(newVal) {
        $(".plate-header").text(newVal.shortHead);
        $(".plate-body").text(newVal.shortBody);


        $("#leftName").text(newVal.leftName);

        $("#rightName").text(newVal.rightName);


    }
});

nodecg.listenFor("classToggle", function(data) {
    console.log(data);


    if(data == "off")
    {
        $("body").removeClass("bottom-on");
        $("body").removeClass("twitter-on");
    } else if(data == "bottom-on")
    {
        $("body").addClass("bottom-on");
        $("body").removeClass("twitter-on");
        console.log();
        $(".plate-header").stop().css('opacity', '0').text(nodecg.variables.platesData.shortHead).animate({
            opacity: 1
        }, 2000);

        $(".plate-body").stop().css('opacity', '0').text(nodecg.variables.platesData.shortBody).animate({
            opacity: 1
        }, 2000);
        console.log("bottom");
    } else if(data == "twitter-on")
    {
        $("body").addClass("bottom-on");
        $("body").addClass("twitter-on");
        console.log("twitter");
        $(".plate-header").stop().css('opacity', '0').text(nodecg.variables.platesData.longerHead).animate({
            opacity: 1
        }, 2000);

        $(".plate-body").stop().css('opacity', '0').text(nodecg.variables.platesData.longerBody).animate({
            opacity: 1
        }, 2000);
    } else {
        $("body").toggleClass(data);
    }


});
