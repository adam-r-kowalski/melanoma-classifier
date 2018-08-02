// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

export default (prefix: string): () => string => {
  let counter = 0;
  return () => `${prefix} ${counter++}`;
};
