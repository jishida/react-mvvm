var observable = ReactMVVM.observable;
var proxy = ReactMVVM.proxy;
var Bind = ReactMVVM.Bind;

function StopwatchViewModel() {
  this.intervalId = 0;
  this.startAt = 0;
  this.storedTime = 0;
  this.elapsedTime = observable(0);
  this.elapsedTimeFloor = observable(0);
  this.elapsedTimeFloor2 = observable(0);
  this.enabled = observable(true);
  this.state = proxy(this, 'state');

  this.elapsedMillis = function () {
    return this.storedTime + Date.now() - this.startAt;
  };

  this.updateElapsedTime = function (elapsedTime) {
    var elapsedTime = this.elapsedMillis() / 1000;
    this.state.elapsedTime = elapsedTime;
    this.state.elapsedTimeFloor = Math.floor(elapsedTime);
    this.state.elapsedTimeFloor2 = Math.floor(elapsedTime * 2) / 2;
  };

  var self = this;

  this.start = function () {
    function callback() {
      self.updateElapsedTime();
    }
    if (!self.intervalId) {
      self.startAt = Date.now();
      self.intervalId = setInterval(callback, 50);
      self.state.enabled = false;
    }
  };

  this.stop = function () {
    if (self.intervalId) {
      self.storedTime = self.elapsedMillis();
      clearInterval(self.intervalId);
      self.intervalId = 0;
      self.state.enabled = true;
    }
  };

  this.reset = function () {
    self.storedTime = 0;
    self.state.elapsedTime = 0;
    self.state.elapsedTimeFloor = 0;
    self.state.elapsedTimeFloor2 = 0;
  };
}

var store = new StopwatchViewModel();

// Wrapping <span> tag with FunctionComponent to enable the Highlight Updates
// feature in React Developer Tools.
function Span(props) {
  return React.createElement('span', props);
}

function Stopwatch() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'table',
      null,
      React.createElement(
        'tbody',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement('td', null, 'elapsedTime'),
          React.createElement(
            'td',
            null,
            ': ',
            React.createElement(Bind, { $type: Span }, store.elapsedTime)
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement('td', null, 'Math.floor(elapsedTime)'),
          React.createElement(
            'td',
            null,
            ': ',
            React.createElement(Bind, { $type: Span }, store.elapsedTimeFloor)
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement('td', null, 'Math.floor(elapsedTime * 2) / 2'),
          React.createElement(
            'td',
            null,
            ': ',
            React.createElement(Bind, { $type: Span }, store.elapsedTimeFloor2)
          )
        )
      )
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        Bind,
        {
          $type: 'button',
          disabled: store.enabled.to(function (v) {
            return !v;
          }),
          onClick: store.start,
        },
        'start'
      ),
      React.createElement(
        Bind,
        { $type: 'button', disabled: store.enabled, onClick: store.stop },
        'stop'
      ),
      React.createElement(
        Bind,
        {
          $type: 'button',
          disabled: store.enabled.to(function (v) {
            return !v;
          }),
          onClick: store.reset,
        },
        'reset'
      )
    )
  );
}

ReactDOM.render(
  React.createElement(Stopwatch),
  document.getElementById('root')
);
