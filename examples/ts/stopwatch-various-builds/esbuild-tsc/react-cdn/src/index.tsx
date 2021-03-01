import React from 'react';
import ReactDOM from 'react-dom';
import { observable, Bind, proxy } from '@jishida/react-mvvm';

class StopwatchViewModel {
  intervalId = 0;

  startAt = 0;

  storedTime = 0;

  elapsedTime = observable(0);

  elapsedTimeFloor = observable(0);

  elapsedTimeFloor2 = observable(0);

  enabled = observable(true);

  state = proxy<StopwatchViewModel>(this, 'state');

  get elapsedMillis() {
    return this.storedTime + Date.now() - this.startAt;
  }

  updateElapsedTime = () => {
    const elapsedTime = this.elapsedMillis / 1000;
    this.state.elapsedTime = elapsedTime;
    this.state.elapsedTimeFloor = Math.floor(elapsedTime);
    this.state.elapsedTimeFloor2 = Math.floor(elapsedTime * 2) / 2;
  };

  start = () => {
    if (!this.intervalId) {
      this.startAt = Date.now();
      this.intervalId = window.setInterval(this.updateElapsedTime, 50);
      this.state.enabled = false;
    }
  };

  stop = () => {
    if (this.intervalId) {
      this.storedTime = this.elapsedMillis;
      clearInterval(this.intervalId);
      this.intervalId = 0;
      this.state.enabled = true;
    }
  };

  reset = () => {
    this.storedTime = 0;
    this.state.elapsedTime = 0;
    this.state.elapsedTimeFloor = 0;
    this.state.elapsedTimeFloor2 = 0;
  };
}

const store = new StopwatchViewModel();

// Wrapping <span> tag with FunctionComponent to enable the Highlight Updates
// feature in React Developer Tools.
function Span({ children }: { children: number }) {
  return <span>{children}</span>;
}

function Stopwatch() {
  const {
    elapsedTime,
    elapsedTimeFloor,
    elapsedTimeFloor2,
    enabled,
    reset,
    start,
    stop,
  } = store;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>elapsedTime</td>
            <td>
              : <Bind $type={Span}>{elapsedTime}</Bind>
            </td>
          </tr>
          <tr>
            <td>Math.floor(elapsedTime)</td>
            <td>
              : <Bind $type={Span}>{elapsedTimeFloor}</Bind>
            </td>
          </tr>
          <tr>
            <td>Math.floor(elapsedTime * 2) / 2</td>
            <td>
              : <Bind $type={Span}>{elapsedTimeFloor2}</Bind>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <Bind $type='button' disabled={enabled.to((v) => !v)} onClick={start}>
          start
        </Bind>
        <Bind $type='button' disabled={enabled} onClick={stop}>
          stop
        </Bind>
        <Bind $type='button' disabled={enabled.to((v) => !v)} onClick={reset}>
          reset
        </Bind>
      </div>
    </div>
  );
}

ReactDOM.render(<Stopwatch />, document.getElementById('root'));
