// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { context, Dispatch } from '../context';
import LoadPredictionsEvent from '../events/LoadPredictionsEvent';
import { IPrediction } from '../state';

const loadPredictions = (dispatch: Dispatch) =>
  () => dispatch(new LoadPredictionsEvent(dispatch));

interface IProps {
  prediction: IPrediction;
}

const styles: { [name: string]: React.CSSProperties } = {
  card: {
    margin: '10px auto',
    width: 500,
  },
  content: {
    display: 'flex',
  },
  div: {
    marginLeft: 10,
  },
};

const labelToName = (label: number): string =>
  label === 1 ? 'Melanoma' : 'Not Melanoma';

const Prediction = (props: IProps) =>
  <Card style={styles.card}>
    <CardContent style={styles.content}>
      <img src={`data:image/png;base64,${props.prediction.image}`} />

      <div style={styles.div}>
        <Typography>Label: {labelToName(props.prediction.label)}</Typography>
        <Typography>Prediction: {labelToName(props.prediction.prediction)}</Typography>
      </div>
    </CardContent>
  </Card>;

export default (): JSX.Element =>
  <context.Consumer>
    {({ dispatch, state }) =>
      <>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="headline">Generate Predictions</Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={loadPredictions(dispatch)}>Generate</Button>
          </CardActions>
        </Card>

        {state.predictions.map((prediction, index) =>
          <Prediction prediction={prediction} key={index} />)}
      </>
    }
  </context.Consumer >;
