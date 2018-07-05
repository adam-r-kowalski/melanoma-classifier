import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';

import { Layers } from './Layers';

export const Model = (): JSX.Element =>
  <>
    <Tabs centered value={0}>
      <Tab label="Layers" />
      <Tab label="Training" />
      <Tab label="Prediction" />
    </Tabs>
    <Layers />
  </>;
