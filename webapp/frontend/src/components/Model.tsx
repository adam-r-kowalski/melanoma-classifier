// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

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
