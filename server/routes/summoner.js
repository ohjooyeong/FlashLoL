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
        const gameInfo = {};
        const matchlist = await getMatchListAPI(accountId);
        if (matchlist.status && matchlist.status.status_code >= 400) {
            return res.status(400).json({
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

module.exports = router;
