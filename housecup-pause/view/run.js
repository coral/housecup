//TEST DATA
//IGNORE

var debugData = function() {
 this.message = "Vad tycker du om färgen?";
 this.question = 8;
 this.color = "#FFFF00";
};


var d3Chart = function() {
  this.message = 'Vad tycker du om färgen blå?';
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
  var debug = new debugData();
  chart.render();
  var gui = new dat.GUI({ autoPlace: false });
  var customContainer = document.getElementById('gui');
  customContainer.appendChild(gui.domElement);

  var f1 = gui.addFolder('Question & Setup');
  var questionNumber = f1.add(debug, 'question', 0, 10).step(1);;
  var questionMessage = f1.add(debug, 'message');
  var questionColor = f1.addColor(debug, 'color');
  f1.open();

  var f2 = gui.addFolder('Answers');
  f2.add(chart, 'amount', 0, 50).step(1);
  f2.add(chart, 'scale', 0, 100).step(1);
  f2.add(chart, 'render');
  f2.open();

	questionNumber.onFinishChange(function(value) {
		$(".question-number").text(Math.round(debug.question));
	});

	questionMessage.onFinishChange(function(value) {
		$(".question-text").text(debug.message);
	});

	questionColor.onChange(function(value) {
		console.log("tejnea");
		$(".question-number").css("background-color", debug.color);
		$(".question-text").css("background-color", debug.color);
	});
};

