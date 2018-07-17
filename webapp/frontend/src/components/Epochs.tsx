import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { context } from '../context';
import { IIteration } from '../state';

interface IPercentageProps {
  value: number;
}

const Percentage = (props: IPercentageProps): JSX.Element =>
  <>{(props.value * 100).toFixed(2)}%</>;

interface IEpochProps {
  training: boolean,
  epoch: string;
  iteration: IIteration;
}

const Epoch = (props: IEpochProps): JSX.Element =>
  <Card style={{ width: 500, margin: '10px auto' }}>
    <CardContent>
      <Typography variant="headline" style={{ marginBottom: 10 }}>
        {props.training ? "Training" : "Testing"} Epoch {props.epoch}
      </Typography>

      <Typography>Iteration {props.iteration.iteration}</Typography>
      <Typography>Accuracy <Percentage value={props.iteration.accuracy} /></Typography>
      <Typography>Loss {props.iteration.loss.toFixed(2)}</Typography>
    </CardContent>
  </Card>;

export default (): JSX.Element =>
  <context.Consumer>
    {({ state }) =>
      <>
        {Object.keys(state.training.train).sort().map(epoch =>
          <Epoch
            training={true}
            epoch={epoch}
            iteration={state.training.train[Number(epoch)]}
            key={epoch}
          />)}

        {Object.keys(state.training.test).sort().map(epoch =>
          <Epoch
            training={false}
            epoch={epoch}
            iteration={state.training.test[Number(epoch)]}
            key={epoch}
          />)}
      </>
    }
  </context.Consumer>;
