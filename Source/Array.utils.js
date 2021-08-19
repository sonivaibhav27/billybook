export function isArraySame(firstList, secondList) {
  firstList.map((_, index) => {
    if (firstList[index] !== secondList[index]) {
      return false;
    }
  });

  return true;
}
