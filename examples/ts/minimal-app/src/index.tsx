import React from 'react';
import ReactDOM from 'react-dom';
import { Bind, observable } from '@jishida/react-mvvm';

const count = observable(0);

function increment() {
  count.value += 1;
}

ReactDOM.render(
  <Bind $type='button' onClick={increment}>
    increment: {count}
  </Bind>,
  document.getElementById('root')
);
