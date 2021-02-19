import React from 'react';
import ReactDOM from 'react-dom';
import { Bind, observable, proxy } from '@jishida/react-mvvm';

class IncrementViewModel {
  count = observable(0);

  // proxy function needs to be called after the Observable bject has been created.
  state = proxy(this, 'state');

  increment = () => {
    this.state.count += 1;
  }
}

const store = new IncrementViewModel();

ReactDOM.render(
  <Bind $type='button' onClick={store.increment}>
    increment: {store.count}
  </Bind>,
  document.getElementById('root')
);