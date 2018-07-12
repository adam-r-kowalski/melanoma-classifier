import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { context, Dispatch, IContext } from '../context';
import ChangeBatchSizeEvent from '../events/ChangeBatchSizeEvent';
import ChangeLearningRateEvent from '../events/ChangeLearningRateEvent';
import ChangeOptimizerEvent from '../events/ChangeOptimizerEvent';
import { optimizers } from '../model';

const styles = {
  formControl: {
    margin: '0 10px',
    width: 167,
  },
};

const changeVariant = (dispatch: Dispatch) =>
  (event: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(new ChangeOptimizerEvent(event.target.value));

const Variant = (ctx: IContext): JSX.Element =>
  <FormControl style={styles.formControl}>
    <InputLabel htmlFor="variant">Variant</InputLabel>
    <Select
      inputProps={{ id: 'variant' }}
      value={ctx.state.models[ctx.state.model].optimizer}
      onChange={changeVariant(ctx.dispatch)}
    >
      {optimizers.map(name =>
        <MenuItem key={name} value={name}>{name}</MenuItem>)}
    </Select>
  </FormControl>;

const changeLearningRate = (dispatch: Dispatch) =>
  (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(new ChangeLearningRateEvent(Number(event.target.value)));

const LearningRate = (ctx: IContext): JSX.Element =>
  <TextField
    label="Learning Rate"
    type="number"
    value={ctx.state.models[ctx.state.model].learningRate}
    onChange={changeLearningRate(ctx.dispatch)}
  />;

const changeBatchSize = (dispatch: Dispatch) =>
  (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(new ChangeBatchSizeEvent(Number(event.target.value)));

const BatchSize = (ctx: IContext): JSX.Element =>
  <TextField
    label="Batch Size"
    type="number"
    value={ctx.state.models[ctx.state.model].batchSize}
    onChange={changeBatchSize(ctx.dispatch)}
    style={{ marginTop: 10 }}
  />;

export default (): JSX.Element =>
  <context.Consumer>
    {ctx =>
      <Card style={{ width: 500, margin: '10px auto' }}>
        <CardContent>
          <Typography variant="headline" style={{ marginBottom: 10 }}>
            Optimizer
	  </Typography>
          <LearningRate {...ctx} />
          <Variant {...ctx} />
          <BatchSize {...ctx} />
        </CardContent>
      </Card>}
  </context.Consumer>;
