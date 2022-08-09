# React MVVM

[![npm version](https://img.shields.io/npm/v/@jishida/react-mvvm)](https://www.npmjs.com/package/@jishida/react-mvvm)
[![CI](https://github.com/jishida/react-mvvm/actions/workflows/ci.yml/badge.svg)](https://github.com/jishida/react-mvvm/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/jishida/react-mvvm/badge.svg?branch=master)](https://coveralls.io/github/jishida/react-mvvm?branch=master)
[![license: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue)](http://www.apache.org/licenses/LICENSE-2.0)

## Features

- __Wrapper functions and interfaces for React Hooks API to enable MVVM-like class design.__
- __\<Bind /> component to simplify re-rendering optimization.__
- __API design to be as concise as possible with high affinity to typescript type checking and IntelliSense.__

## Installation

```sh
npm install @jishida/react-mvvm
```
or

```sh
yarn add @jishida/react-mvvm
```

## Requirements

- react >=16.8.0 || >=17.0.0 || >=18.0.0 or preact >=10.0.0
- typescript >=4.1.0 if needed

## Examples and Usage

### Minimal Example

[demo](https://jishida.github.io/react-mvvm/examples/dist/minimal-app)

[javascript](https://github.com/jishida/react-mvvm/blob/master/examples/js/minimal-app/src/index.jsx)

[typescript](https://github.com/jishida/react-mvvm/blob/master/examples/ts/minimal-app/src/index.tsx)

```typescript
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
```

The monitored variable manages its state through an _Observable_ object created from the _observable_ function.
_Bind_ component monitors _Observable_ objects passed via props, resolves _Observable_ objects to the component passed in _$type_ prop, then passes the value.
_Bind_ component will be re-rendered when _Observable_ objects passed via props is modified or whose notify method is called.

### ViewModel Example

The minimal example is concise, but react-mvvm recommends that you classify states and actions as ViewModel.

[demo](https://jishida.github.io/react-mvvm/examples/dist/viewmodel-app)

[javascript](https://github.com/jishida/react-mvvm/blob/master/examples/js/viewmodel-app/src/index.jsx)

[typescript](https://github.com/jishida/react-mvvm/blob/master/examples/ts/viewmodel-app/src/index.tsx)
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { Bind, observable, proxy } from '@jishida/react-mvvm';

class IncrementViewModel {
  count = observable(0);

  // proxy function needs to be called after all Observable objects have been created.
  state = proxy<IncrementViewModel>(this, 'state');

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
```
Direct access to members of _Observable_ objects such as _value_ property is not intuitive and the code does not look good.
Therefore, this library recommends using _proxy_ function.
_proxy_ function provides six built-in proxies: _'ref'_, _'value'_, _'state'_, _'result'_, _'error'_ and _'message'_.
Those properties are type-safe and can be complemented by IntelliSense, making it more comfortable to code with typescript.

### Re-render Optimization Example

_Bind_ component will be re-rendered when there are changes to the _Observable_ object received from props.
It would be easier to understand [this Stopwatch Example Demo](https://jishida.github.io/react-mvvm/examples/dist/stopwatch) if you enable the "Highlight updates when components render." option in React Developper Tools.
Only components that need to be updated will be re-rendered.

[demo](https://jishida.github.io/react-mvvm/examples/dist/stopwatch)

[javascript](https://github.com/jishida/react-mvvm/blob/master/examples/js/stopwatch/src/index.jsx)

[typescript](https://github.com/jishida/react-mvvm/blob/master/examples/ts/stopwatch/src/index.tsx)

### Material-UI Form Example

The Observable object can optionally have additional features.

[demo](https://jishida.github.io/react-mvvm/examples/dist/material-ui-form)

[javascript](https://github.com/jishida/react-mvvm/blob/master/examples/js/material-ui-form/src/index.jsx)

[typescript](https://github.com/jishida/react-mvvm/blob/master/examples/ts/material-ui-form/src/index.tsx)

Using _ref_ option, you can add RefObject for React to _Observable_ object and save the code to access the DOM.
You can also use _validatable_ and _parsable_ functions instead of _observable_ function to create an object with _Validatable_ interface that extends _Observable_ interface.
_Validatable_ objects can be easily validated by specifying a validation or parsing function at initialization, and since they have properties of _Observable_ type such as _hasError_ and _errorMessage_, the results of validation can be bound to components.
_validator_ function creates a _ViewModelValidator_ object, which can be used to manage all _Validatable_ objects belonging to ViewModel by registering instances of ViewModel with it. By registering ViewModel instances with the _ViewModelValidator_ object, ViewModel can manage all _Validatable_ objects at once.
In this example, by combining material-ui and these features, a form application is implemented with simple code.

## Two different builds

There are two types of builds: full and lite.
The lite version of the build does not include proxy, validatable, parsable, and resolveObject functions.

### File Size

<!--- begin file size scope --->

full:

![](https://img.shields.io/badge/minified%20size-15.3%20kB-blue.svg)
![](https://img.shields.io/badge/gzipped%20size-4.1%20kB-blue.svg)

lite:

![](https://img.shields.io/badge/minified%20size-5.4%20kB-blue.svg)
![](https://img.shields.io/badge/gzipped%20size-1.8%20kB-blue.svg)

<!--- end file size scope --->

### ESModule

full:

```typescript
import ReactMVVM from '@jishida/react-mvvm';
```

lite:

```typescript
import ReactMVVM from '@jishida/react-mvvm/lite';
```

### IIFE

full:

```html
<script crossorigin src="https://unpkg.com/@jishida/react-mvvm@0.3/dist/react-mvvm.min.js"></script>
```

lite:

```html
<script crossorigin src="https://unpkg.com/@jishida/react-mvvm@0.3/dist/react-mvvm-lite.min.js"></script>
```

## Browser Support

React MVVM supports IE11, but Promise polyfill is required to use _async_ options.

## License

React MVVM is licensed under the [Apache 2.0 License](https://github.com/jishida/react-mvvm/blob/master/LICENSE)
