import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { context, IContext } from '../context';

const Epochs = (ctx: IContext): JSX.Element =>
  <TextField
    label="Epochs"
    type="number"
    value={ctx.state.models[ctx.state.model].learningRate}
  />;

const BatchSize = (ctx: IContext): JSX.Element =>
  <TextField
    label="Epochs"
    type="number"
    value={ctx.state.models[ctx.state.model].batchSize}
  />;

export default (): JSX.Element =>
  <context.Consumer>
    {ctx =>
      <Card style={{ width: 500, margin: '10px auto' }}>
        <CardContent>
          <Typography variant="headline">Dataset</Typography>
          <Epochs {...ctx} />
          <BatchSize {...ctx} />
        </CardContent>
      </Card>}
  </context.Consumer>;
