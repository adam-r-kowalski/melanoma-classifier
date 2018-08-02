// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import { Model } from './components/Model';
import Notifications from './components/Notifications';
import { context } from './context';
import { IEvent } from './events';
import AppStartedEvent from './events/AppStartedEvent';
import LoadModelsEvent from './events/LoadModelsEvent';
import { empty, IState } from './state';

document.body.style.margin = '0';
document.body.style.overflow = 'scroll';

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
          <Drawer />
          <AppBar />
          <Model />
          <Notifications />
        </MuiThemeProvider>
      </context.Provider>
    );
  }

  public componentDidMount() {
    this.dispatch(new AppStartedEvent(this.dispatch));
  }

  private dispatch = (event: IEvent): void => {
    this.setState(event.update(this.state));
  }
}

const HotApp = hot(module)(App);

ReactDOM.render(<HotApp />, document.getElementById('app'));
