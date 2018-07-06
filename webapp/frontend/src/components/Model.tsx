import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';

import { context, Dispatch } from '../context';
import ChangeTabEvent from '../events/ChangeTabEvent';
import { Layers } from './Layers';
import { NewLayer } from './NewLayer';

const onChange = (dispatch: Dispatch) =>
  (event: React.ChangeEvent<{}>, value: number) =>
    dispatch(new ChangeTabEvent(value));

const LayersRoute = (): JSX.Element =>
  <>
    <NewLayer />
    <Layers />
  </>;

const TrainingRoute = (): JSX.Element =>
  <div>Not implemented yet</div>;

const PredictionRoute = (): JSX.Element =>
  <div>Not implemented yet</div>;

const SettingsRoute = (): JSX.Element =>
  <div>Not implemented yet</div>;

interface IRouterProps {
  tab: number;
}

const Router = (props: IRouterProps): JSX.Element => {
  switch (props.tab) {
    case 0: return <LayersRoute />;
    case 1: return <TrainingRoute />;
    case 2: return <PredictionRoute />;
    case 3: return <SettingsRoute />;
  }
};

export const Model = (): JSX.Element =>
  <context.Consumer>
    {({ state, dispatch }) =>
      <>
        <Tabs centered value={state.tab} onChange={onChange(dispatch)}>
          <Tab label="Layers" />
          <Tab label="Training" />
          <Tab label="Prediction" />
          <Tab label="Settings" />
        </Tabs>
        <Router tab={state.tab} />
      </>
    }
  </context.Consumer>;
