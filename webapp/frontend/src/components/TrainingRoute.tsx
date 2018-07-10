import * as React from 'react';

import { context, Dispatch, IContext } from '../context';
import TrainModelEvent from '../events/TrainModelEvent';
import { optimizers } from '../model';
import Dataset from './Dataset';
import Optimizer from './Optimizer';
import SaveButton from './SaveButton';

export default (): JSX.Element =>
  <>
    <Optimizer />
    <Dataset />
    <SaveButton />
  </>;
