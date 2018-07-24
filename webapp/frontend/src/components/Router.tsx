import * as React from 'react';

import { context } from '../context';
import LayersRoute from './LayersRoute';
import SettingsRoute from './SettingsRoute';
import TrainingRoute from './TrainingRoute';
import PredictionsRoute from './PredictionsRoute';

const routes: { [tab: number]: JSX.Element } = {
  0: <LayersRoute />,
  1: <TrainingRoute />,
  2: <PredictionsRoute />,
  3: <SettingsRoute />,
};

export default (): JSX.Element =>
  <context.Consumer>{({ state }) => routes[state.tab]}</context.Consumer>;
