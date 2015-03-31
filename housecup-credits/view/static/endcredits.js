nodecg.declareSyncedVar({
    name: 'animate',
    initialVal: false,
    setter: function(newVal) {
        if(newVal) {
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();


            $('#titles').fadeIn(1000);
            $('#titles').fadeTo("slow");
            $('#titles').fadeIn();
            $('#credits').transition({ marginTop: '-6500px', duration: 180000, easing: "linear" });
        } else
        {

        }
    }
});
