function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function rankInfoAdd(profile) {
  const rankQueueType = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR"];
  const tmpData = {
    summonerId: "",
    leagueId: "",
    queueType: "",
    tier: "Unranked",
    rank: "",
    leaguePoints: 0,
    wins: 0,
    losses: 0,
  };

  if (profile.length === 0) {
    tmpData["queueType"] = rankQueueType[0];
    profile.push(cloneObject(tmpData));
  }

  if (profile.length < 2) {
    if (profile.length !== 0 && profile[0].queueType === "RANKED_SOLO_5x5") {
      tmpData["queueType"] = rankQueueType[1];
    } else {
      tmpData["queueType"] = rankQueueType[0];
    }
    profile.push(cloneObject(tmpData));
  }

  profile.sort(function (a, b) {
    let o1 = 0;
    let o2 = 1;
    if (a.queueType === "RANKED_SOLO_5x5") {
      o1 = 2;
    }

    if (o1 < o2) return 1;
    if (o1 > o2) return -1;

    return 0;
  });

  return profile;
}

function rankInfoChange(v) {
  if (v["queueType"] === "RANKED_SOLO_5x5") {
    v["queueType"] = "솔로랭크";
  } else {
    v["queueType"] = "자유랭크";
  }

  if (v["wins"] === 0) {
    return (v["winning_rate"] = 0);
  }

  let fixed =
    Math.round(v["wins"] / (v["wins"] + v["losses"]) / 0.0001) * 0.001 * 10;
  v["winning_rate"] = parseFloat(fixed.toFixed(1), 10);
  return v;
}

module.exports = {
  rankInfoAdd,
  rankInfoChange,
};
