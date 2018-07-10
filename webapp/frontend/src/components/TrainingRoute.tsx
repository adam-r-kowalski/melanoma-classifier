import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PlayArrow from '@material-ui/icons/PlayArrow';
import * as React from 'react';

import { context, Dispatch, IContext } from '../context';
import TrainModelEvent from '../events/TrainModelEvent';
import { optimizers } from '../model';
import Optimizer from './Optimizer';
import SaveButton from './SaveButton';

export default (): JSX.Element =>
  <>
    <Optimizer />
    <SaveButton />
  </>;
