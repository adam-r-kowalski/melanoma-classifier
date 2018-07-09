import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import { Model } from './components/Model';
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

ReactDOM.render(<App />, document.getElementById('app'));
