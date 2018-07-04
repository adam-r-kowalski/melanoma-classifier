import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppBar from './components/AppBar';
import { Layers } from './components/Layers';
import { context } from './context';
import { IEvent } from './event';
import { empty, IState } from './state';

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = empty;
  }

  public render(): JSX.Element {
    const currentContext = { state: this.state, dispatch: this.dispatch };
    return (
      <context.Provider value={currentContext}>
        <MuiThemeProvider theme={this.state.theme}>
          <AppBar />
          <Layers />
        </MuiThemeProvider>
      </context.Provider>
    );
  }

  private dispatch = (event: IEvent): void => {
    this.setState(event.update(this.state));
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
