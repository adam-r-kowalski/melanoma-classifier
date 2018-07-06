import * as React from 'react';

import { context } from '../context';
import Router from './Router';
import Tabs from './Tabs';

const ModelExists = (): JSX.Element =>
  <>
    <Tabs />
    <Router />
  </>;

const NoModelExists = (): JSX.Element =>
  <div>No Model Exists</div>;

export const Model = (): JSX.Element =>
  <context.Consumer>
    {({ state }) => state.model ? <ModelExists /> : <NoModelExists />}
  </context.Consumer>;
