const express = require("express");
const {
    getSummonerIdAPI,
    getSummonerProfileInfo,
    getMatchListAPI,
    getMatchDetailAPI,
} = require("../api/summoner");
const qs = require("querystring");

const router = express.Router();

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

router.post("/", async (req, res, next) => {
    const {
        body: { summonerName },
    } = req;
    let qsSummonerName = summonerName;
    if (summonerName.length == 2) {
        qsSummonerName = `${summonerName[0]} ${summonerName[1]}`;
    }
    qsSummonerName = qs.escape(qsSummonerName);
    try {
        const summonerProfile = {};
        const info = await getSummonerIdAPI(qsSummonerName);
        if (info.status && info.status.status_code >= 400) {
            return res.status(200).json({
                apiStatus: {
                    success: false,
                    status: info.status.status_code,
                    message: info.status.message,
                },
                summonerProfile: summonerProfile,
            });
        }
        summonerProfile["info"] = info;
        const profile = await getSummonerProfileInfo(info.id);
        summonerProfile["profile"] = profile;
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
        const summonerGameInfo = {};
        const matchlist = await getMatchListAPI(accountId);
        if (matchlist.status && matchlist.status.status_code >= 400) {
            return res.status(200).json({
                apiStatus: {
                    success: false,
                    status: matchlist.status.status_code,
                    message: matchlist.status.message,
                },
                summonerGameInfo: summonerGameInfo,
            });
        }
        summonerGameInfo["matchlist"] = matchlist;

        summonerGameInfo.matchlist.matches = matchlist.matches.slice(0, 5);
        return res
            .status(200)
            .json({ apiStatus: { success: true }, summonerGameInfo });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get("/game/:gameId", async (req, res, next) => {
    const {
        params: { gameId },
    } = req;
    try {
        const summonerDetailGameInfo = {};
        const match = await getMatchDetailAPI(gameId);
        if (match.status && match.status.status_code >= 400) {
            return res.status(200).json({
                apiStatus: {
                    success: false,
                    status: match.status.status_code,
                    message: match.status.message,
                },
                summonerDetailGameInfo: summonerDetailGameInfo,
            });
        }
        summonerDetailGameInfo["matchdata"] = match;
        return res.status(200).json(summonerDetailGameInfo);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;
