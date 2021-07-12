const axios = require("axios");

const headers = {
    "X-Riot-Token": `${process.env.API_KEY}`,
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
};

const getSummonerIdAPI = async (summonerName) => {
    try {
        const response = await axios.get(
            `${process.env.API_URL}/summoner/v4/summoners/by-name/${summonerName}`,
            { headers }
        );
        return response.data;
    } catch (e) {
        return console.log(e);
    }
};

const getSummonerProfileInfo = async (summonerId) => {
    try {
        const response = await axios.get(
            `${process.env.API_URL}/league/v4/entries/by-summoner/${summonerId}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        return console.log(e);
    }
};

module.exports = { getSummonerIdAPI, getSummonerProfileInfo };
