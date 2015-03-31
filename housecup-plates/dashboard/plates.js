var panel = $bundle.filter('.plates');

nodecg.declareSyncedVar({
    variableName: 'platesData',
    initialVal: {
        "leftNick": "KORVERIK",
        "leftName": "Erik Korvlanda",
        "rightNick": "Olvsson",
        "rightName": "Love Olsson",
        "shortHead": "NOW WITH MORE HEADLINE",
        "shortBody": "So just hang in there people!",
        "longerHead": "This should be a tweet!",
        "longerBody": "I LOVE SAUSAGEFESSTJAOPIGJIDJIOJDIOJIOJ"
    },
    setter: function(newVal) {
        $('#leftnick').val(newVal.leftNick);
        $('#leftname').val(newVal.leftName);

        $('#rightnick').val(newVal.rightNick);
        $('#rightname').val(newVal.rightName);

        $('#bottombar-head').val(newVal.shortHead);
        $('#bottombar-body').val(newVal.shortBody);

        $('#longerbar-head').val(newVal.longerHead);
        $('#longerbar-body').val(newVal.longerBody);
    }
});

$(".classToggle").click(function () {
    nodecg.sendMessage("classToggle",$(this).data("class"));
    console.log("OK: " + $(this).data("class"));

});

$("#save").click(function(){
    $(".plate-form").each(function(index, value) {
        var addr = $(value).data("id");
        var temp = nodecg.variables.platesData;
        temp[addr] = $(value).val();
        nodecg.variables.platesData = temp;
    });
});

/*
nodecg.declareSyncedVar({
    variableName: "state",
    initialVal: {"bottombar": "off", "left": "off", "right": "off"},
    setter: function(newVal) {

    }

});
*/

nodecg.variables.platesData = {
        "leftNick": "KORVERIK",
        "leftName": "Erik Korvlanda",
        "rightNick": "Olvss",
        "rightName": "Love Olsson",
        "shortHead": "NOW WITH MORE NICE",
        "shortBody": "So just hang in there people!",
        "longerHead": "This should be a tweet!",
        "longerBody": "I LOVE SAUSAGEFESSTJAOPIGJIDJIOJDIOJIOJ"
    };
