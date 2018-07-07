import * as React from 'react';

import { context } from '../context';
import LayersRoute from './LayersRoute';
import SettingsRoute from './SettingsRoute';

const TrainingRoute = (): JSX.Element =>
  <div>Not implemented yet</div>;

const PredictionRoute = (): JSX.Element =>
  <div>Not implemented yet</div>;

const routes: { [tab: number]: JSX.Element } = {
  0: <LayersRoute />,
  1: <TrainingRoute />,
  2: <PredictionRoute />,
  3: <SettingsRoute />,
};

export default (): JSX.Element =>
  <context.Consumer>{({ state }) => routes[state.tab]}</context.Consumer>;
