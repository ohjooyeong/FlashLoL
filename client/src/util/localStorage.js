function getArray(key, reverse) {
  const value = localStorage.getItem(key);
  let summonerObj = {};
  try {
    summonerObj = JSON.parse(value);
  } catch {
    summonerObj = {};
  }
  if (!summonerObj) {
    summonerObj = {};
    summonerObj[key] = [];
  }
  return reverse ? summonerObj[key].reverse() : summonerObj[key];
}

function setArray(key, value, imgId = 0, limitLength = 10) {
  const summonerNames = localStorage.getItem(key);
  let summonerObj = {};
  try {
    summonerObj = JSON.parse(summonerNames);
  } catch {
    summonerObj = {};
  }
  if (!summonerObj) {
    summonerObj = {};
    summonerObj[key] = [];
  }
  for (let i = 0; i < summonerObj[key].length; i++) {
    if (summonerObj[key][i][0] === value) {
      summonerObj[key].splice(i, 1);
      break;
    }
  }

  summonerObj[key].push([value, imgId]);
  if (limitLength < summonerObj[key].length) {
    summonerObj[key].shift();
  }
  localStorage.setItem(key, JSON.stringify(summonerObj));
}

export { getArray, setArray };
