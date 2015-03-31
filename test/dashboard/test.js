var panel = $bundle.filter('.test');
var foo = panel.find('.foo');
var button = panel.find('.state');

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

foo.change(function () {
  console.log (this.value);
  nodecg.variables.testText = this.value;
});

button.click(function () {
  nodecg.variables.state = !nodecg.variables.state;
  console.log(nodecg.variables.state);
});
