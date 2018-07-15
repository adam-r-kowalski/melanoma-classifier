import * as React from 'react';

import { context } from '../context';
import NoModelExists from './NoModelExists';
import Router from './Router';
import Tabs from './Tabs';

const ModelExists = (): JSX.Element =>
  <>
    <Tabs />
    <Router />
  </>;

export const Model = (): JSX.Element =>
  <context.Consumer>
    {({ state }) => state.model ? <ModelExists /> : <NoModelExists />}
  </context.Consumer>;
