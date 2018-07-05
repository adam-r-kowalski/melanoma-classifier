export default (prefix: string): () => string => {
  let counter = 0;
  return () => prefix + counter++;
};
