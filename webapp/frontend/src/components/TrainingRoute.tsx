import * as React from 'react';

import Optimizer from './Optimizer';
import SaveButton from './SaveButton';
import Train from './Train';

export default (): JSX.Element =>
  <>
    <Optimizer />
    <Train />
    <SaveButton />
  </>;
