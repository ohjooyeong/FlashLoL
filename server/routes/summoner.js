const express = require("express");
const {
  getSummonerIdAPI,
  getSummonerProfileInfo,
  getMatchListAPI,
  getMatchDetailAPI,
} = require("../api/summoner");
const qs = require("querystring");
const { rankInfoAdd, rankInfoChange } = require("../util/summonerUtil");
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
    body: { puuid },
  } = req;
  try {
    const gameInfo = {};
    const matchlist = await getMatchListAPI(puuid);
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

    // await은 Promise 객체를 실행하고 기다려주지만, Promise 배열로는 그렇게 할 수 없기 때문이라는 사실을 알게됨
    // 처음에 구현했던 arr.map을 통해 Promise 배열을 리턴하게 구현했기때문에 await은 의미가 없다.
    const matchDetailList = await Promise.all(
      gameInfo.matchlist.map((m) => {
        return getMatchDetailAPI(m);
      })
    );
    console.log(matchDetailList);
    gameInfo["matchDetailList"] = matchDetailList;

    return res.status(200).json({ apiStatus: { success: true }, gameInfo });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/ranking", async (req, res, next) => {
  let { page } = req.body;
  try {
    if (!page || Number(page) <= 1) {
      page = 1;
    }
    page = Number(page);
    const start = (page - 1) * 50;
    const end = page * 50;
    let summonerRankData = await SummonerRank.find({})
      .sort({
        leaguePoints: -1,
        tier: 1,
      })
      .skip(start)
      .limit(end - start);

    if (summonerRankData && summonerRankData.length < 50) {
      for (let i = 0; i < 50 - summonerRankData.length; i++) {
        tmp = {
          summonerId: `empty${i}`,
          summonerName: "-",
          leaguePoints: 0,
          rank: "-",
          wins: 0,
          losses: 0,
          veteran: false,
          inactive: false,
          freshBlood: false,
          hotStreak: false,
          tier: "-",
          queue: "RANKED_SOLO_5x5",
          uptodate: "empty",
        };
        summonerRankData.push(tmp);
      }
    }

    return res
      .status(200)
      .json({ apiStatus: { success: true }, summonerRankData, page });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
