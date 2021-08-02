const express = require("express");
const {
  getSummonerIdAPI,
  getSummonerProfileInfo,
  getMatchListAPI,
  getMatchDetailAPI,
  getChallengerRank,
  getGrandmasterRank,
  getMasterRank,
} = require("../api/summoner");
const qs = require("querystring");
const {
  rankInfoAdd,
  rankInfoChange,
  getTierList,
} = require("../util/summonerUtil");
const { SummonerRank } = require("../models/SummonerRank");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const {
    body: { summonerName },
  } = req;
  let qsSummonerName = summonerName;
  if (summonerName.length == 2) {
    // 소환사명이 2글자인 경우 중간에 띄어쓰기를 안하면 오류가 발생해서 수정
    qsSummonerName = `${summonerName[0]} ${summonerName[1]}`;
  }
  qsSummonerName = qs.escape(qsSummonerName); // 한글 소환사명은 인코딩해야 검색이 가능함.
  try {
    const summonerProfile = {};
    const info = await getSummonerIdAPI(qsSummonerName); // 소환사 명으로 소환사 고유 ID 호출 API

    // 실패시 호출
    if (info.status && info.status.status_code >= 400) {
      return res.status(info.status.status_code).json({
        apiStatus: {
          success: false,
          status: info.status.status_code,
          message: info.status.message,
        },
        summonerProfile: summonerProfile,
      });
    }
    summonerProfile["info"] = info;
    const profile = await getSummonerProfileInfo(info.id); // 소환사 고유 ID로 소환사 정보 호출 API
    summonerProfile["profile"] = profile;
    rankInfoAdd(summonerProfile.profile);

    // 각각의 큐 타입 한글화 및 승률 데이터 추가
    summonerProfile.profile.forEach((v) => {
      rankInfoChange(v);
    });

    return res
      .status(200)
      .json({ apiStatus: { success: true }, summonerProfile });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/game", async (req, res, next) => {
  const {
    body: { accountId },
  } = req;
  try {
    const gameInfo = {};
    const matchlist = await getMatchListAPI(accountId);
    if (matchlist.status && matchlist.status.status_code >= 400) {
      return res.status(matchlist.status.status_code).json({
        apiStatus: {
          success: false,
          status: matchlist.status.status_code,
          message: matchlist.status.message,
        },
        gameInfo: gameInfo,
      });
    }
    gameInfo["matchlist"] = matchlist;

    gameInfo.matchlist.matches = matchlist.matches.slice(0, 5);
    // await은 Promise 객체를 실행하고 기다려주지만, Promise 배열로는 그렇게 할 수 없기 때문이라는 사실을 알게됨
    // 처음에 구현했던 arr.map을 통해 Promise 배열을 리턴하게 구현했기때문에 await은 의미가 없다.
    const matchDetailList = await Promise.all(
      gameInfo.matchlist.matches.map((m) => {
        return getMatchDetailAPI(m.gameId);
      })
    );
    gameInfo["matchDetailList"] = matchDetailList;

    return res.status(200).json({ apiStatus: { success: true }, gameInfo });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// router.get("/game/:gameId", async (req, res, next) => {
//     const {
//         params: { gameId },
//     } = req;
//     try {
//         const summonerDetailGameInfo = {};
//         const match = await getMatchDetailAPI(gameId);
//         if (match.status && match.status.status_code >= 400) {
//             return res.status(200).json({
//                 apiStatus: {
//                     success: false,
//                     status: match.status.status_code,
//                     message: match.status.message,
//                 },
//                 summonerDetailGameInfo: summonerDetailGameInfo,
//             });
//         }
//         summonerDetailGameInfo["matchdata"] = match;
//         return res.status(200).json(summonerDetailGameInfo);
//     } catch (e) {
//         console.log(e);
//         next(e);
//     }
// });

router.post("/rank", async (req, res, next) => {
  try {
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/rank/refresh", async (req, res, next) => {
  try {
    const summonerRankList = [];
    let chList;
    let gmList;
    let mrList;
    const challengerleagues = await getChallengerRank();
    chList = getTierList(challengerleagues);
    summonerRankList.push(...chList);
    const grandmasterleagues = await getGrandmasterRank();
    gmList = getTierList(grandmasterleagues);
    summonerRankList.push(...gmList);
    const masterleagues = await getMasterRank();
    mrList = getTierList(masterleagues);
    summonerRankList.push(...mrList);
    summonerRankList.map((s) => {
      const filter = { summonerId: s.summonerId };
      const update = {
        summonerName: s.summonerName,
        leaguePoints: s.leaguePoints,
        rank: s.rank,
        wins: s.wins,
        losses: s.losses,
        veteran: s.veteran,
        inactive: s.inactive,
        freshBlood: s.freshBlood,
        hotStreak: s.hotStreak,
        tier: s.tier,
        queue: s.queue,
      };
      SummonerRank.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      }).exec((err, updateSummoner) => {
        if (err) return res.status(400).send(err);
        return updateSummoner;
      });
    });

    return res.status(200).json({ apiStatus: { success: true } });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
