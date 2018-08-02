// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import * as React from 'react';

import DeleteModel from './DeleteModel';
import RenameModel from './RenameModel';

export default (): JSX.Element =>
  <>
    <RenameModel />
    <DeleteModel />
  </>;
