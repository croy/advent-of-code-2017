export const ring = (collection: number[]) => (index: number) => {
  const moduloIndex = index % collection.length;
  const inboundsIndex = moduloIndex >= 0 ? moduloIndex : moduloIndex + collection.length;
  return collection[inboundsIndex];
};
