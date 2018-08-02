// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import * as React from 'react';

import Epochs from './Epochs';
import Optimizer from './Optimizer';
import SaveButton from './SaveButton';
import Train from './Train';

export default (): JSX.Element =>
  <>
    <Optimizer />
    <Train />
    <SaveButton />
    <Epochs />
  </>;
