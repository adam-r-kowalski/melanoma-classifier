import * as React from 'react';

import { context, Dispatch } from '../context';
import { Layers } from './Layers';
import { NewLayer } from './NewLayer';
import SaveButton from './SaveButton';

export default (): JSX.Element =>
  <>
    <NewLayer />
    <Layers />
    <SaveButton />
  </>;
