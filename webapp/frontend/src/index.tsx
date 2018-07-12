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
    this.dispatch(new LoadModelsEvent(this.dispatch));
  }

  private dispatch = (event: IEvent): void => {
    this.setState(event.update(this.state));
  }
}

const HotApp = hot(module)(App);

ReactDOM.render(<HotApp />, document.getElementById('app'));
