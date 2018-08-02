// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

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
