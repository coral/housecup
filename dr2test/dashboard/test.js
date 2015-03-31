var panel = $bundle.filter('.dr2test');
var foo = panel.find('.foo');
var button = panel.find('.state');
var question = panel.find('.questionSelect');

nodecg.declareSyncedVar({
		name: 'testText',
		setter: function(newVal) {
				foo.val(newVal);
		}
});

nodecg.declareSyncedVar({
		name: 'state',
		setter: function(newVal) {
			button.css({backgroundColor:
			(newVal) ? 'green':'red'});
		}
});

nodecg.declareSyncedVar({
		name: 'questionData',
		setter: function(newVal) {
			panel.find('.currentQuestion').text(newVal.question_id);
			panel.find('.questionSelect').val(newVal.question_id);
		}
});

nodecg.declareSyncedVar({
		name: 'questionResponse',
		setter: function(newVal) {
			console.log(newVal);
			panel.find(".questionResponse").html("");
			panel.find(".questionResponse").append("<h3>" + newVal.Table[0][1] + "</h3>");
			$.each( newVal.Table, function( i, val ) {



				if(val != null) {
					panel.find(".questionResponse").append("<p>" + val[4] + "%: " + val[3] + "</p>");
				}
			});
		}
});


question.change(function () {

	nodecg.variables.questionData = {
			question_id: parseInt(this.value),
			vote_id: 2,
			cat_id: 2
	};

});

foo.change(function () {
	console.log (this.value);
	nodecg.variables.testText = this.value;
});

button.click(function () {
	nodecg.variables.state = !nodecg.variables.state;
	console.log(nodecg.variables.state);
});
