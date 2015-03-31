//TEST DATA
//IGNORE

nodecg.declareSyncedVar({
    name: 'testText',
    setter: function(newVal) {
      console.log(newVal);
      $(".question-text").text(newVal);
    }
});

nodecg.declareSyncedVar({
    name: 'questionResponse',
    setter: function(newVal) {
      $.each( newVal, function( i, val ) {
       $( "#q" ).append( document.createTextNode( " - " + val ));
      });
    }
});

nodecg.declareSyncedVar({
    name: 'questionData',
    setter: function(newVal) {
    	$(".question-number").text(newVal.question_id);
    }
});


nodecg.declareSyncedVar({
    name: 'state',
    setter: function(newVal) {
      if (newVal) $("body").addClass('on');
      if (!newVal) $("body").removeClass('on');

    }
});


var d3Chart = function() {
  this.amount = 10;
  this.scale = 30;
  this.render = function() {
	$(".render").html("");
	var dataset = [ ];
	for (var i = 0; i <= this.amount; i++)
		{
			var newNumber = Math.round(Math.random() * this.scale);
			dataset.push(newNumber);
		}

	d3.select(".render").selectAll("p")
		.data(dataset)
		.enter()
		.append("div")
		.transition()
		.duration(3000)
		.attr("class", "bar")
		.style("width", function(d) {
			//console.log(s);
			return d * 5 + "px";
		});
	};
};

window.onload = function() {
  var chart = new d3Chart();
  chart.render();

	questionColor.onChange(function(value) {
		console.log("tejnea");
		$(".question-number").css("background-color", debug.color);
		$(".question-text").css("background-color", debug.color);
	});
};

