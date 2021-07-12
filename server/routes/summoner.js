const express = require("express");
const { getSummonerIdAPI, getSummonerProfileInfo } = require("../api/summoner");
const qs = require("querystring");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const {
        body: { summonerName },
    } = req;
    let qsSummonerName = summonerName;
    if (summonerName.length <= 2) {
        qsSummonerName = `${summonerName[0]} ${summonerName[1]}`;
    }
    try {
        const summonerInfo = await getSummonerIdAPI(qsSummonerName);
        const summonerProfile = await getSummonerProfileInfo(summonerInfo.id);
        return res.status(200).json(summonerProfile);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
