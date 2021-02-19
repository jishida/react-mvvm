var observable = ReactMVVM.observable;
var Bind = ReactMVVM.Bind;

var count = observable(0);

function increment() {
  count.value += 1;
}

ReactDOM.render(
  React.createElement(
    Bind,
    { $type: 'button', onClick: increment },
    'increment: ',
    count
  ),
  document.getElementById('root')
);
