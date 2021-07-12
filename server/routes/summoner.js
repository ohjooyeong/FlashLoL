const express = require("express");
const { getSummonerIdAPI, getSummonerProfileInfo } = require("../api/summoner");
const qs = require("querystring");

const router = express.Router();

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
        return res
            .status(200)
            .json({ apiStatus: { success: true }, summonerProfile });
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;
