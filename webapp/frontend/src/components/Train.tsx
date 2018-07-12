import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { context } from '../context';
import TrainModelEvent from '../events/TrainModelEvent';

interface IState {
  epochs: number;
}

export default class Train extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { epochs: 1 };
  }

  public render() {
    return (
      <context.Consumer>
        {({ dispatch }) =>
          <Card style={{ width: 500, margin: '10px auto' }}>
            <CardContent>
              <Typography variant="headline">Train</Typography>
              {this.epochs()}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                onClick={() => dispatch(new TrainModelEvent(this.state.epochs))}
              >
                Begin Training
	      </Button>
            </CardActions>
          </Card>}
      </context.Consumer>
    );
  }

  private epochs() {
    return (
      <TextField
        label="Batch Size"
        type="number"
        value={this.state.epochs}
        onChange={e => this.setState({ epochs: Number(e.target.value) })}
        style={{ marginTop: 10 }}
      />
    );
  }
}
