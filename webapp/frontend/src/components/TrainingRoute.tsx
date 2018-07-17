import * as React from 'react';

import Epochs from './Epochs';
import Optimizer from './Optimizer';
import SaveButton from './SaveButton';
import Train from './Train';

export default (): JSX.Element =>
  <>
    <Optimizer />
    <Train />
    <SaveButton />
    <Epochs />
  </>;
