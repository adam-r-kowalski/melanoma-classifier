import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { context, Dispatch } from '../context';
import DeleteModelEvent from '../events/DeleteModelEvent';

interface IState {
  name: string;
}

export default class RenameModel extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { name: '' };
  }

  public render() {
    return (
      <context.Consumer>
        {({ dispatch }) =>
          <Card style={{ width: 500, margin: '10px auto' }}>
            <CardContent>
              <Typography variant="headline">Delete Model</Typography>
              <TextField
                label="Confirm Model Name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </CardContent>
            <CardActions>
              <Button color="secondary" onClick={this.onClick(dispatch)}>Delete</Button>
            </CardActions>
          </Card>
        }
      </context.Consumer>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  }

  private onClick = (dispatch: Dispatch) =>
    () => {
      dispatch(new DeleteModelEvent(this.state.name, dispatch));
      this.setState({ name: '' });
    }
}
