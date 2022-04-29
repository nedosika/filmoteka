export const generateSkeletonsArray = (count) => {
  const skeletons = [];
  for (let i = 0; i < count; i++) skeletons.push({ id: i });

  return skeletons;
};
