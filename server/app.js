const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const summonerRouter = require("./routes/summoner");
const mongoose = require("mongoose");
const config = require("./config/key");

const app = express();
const cron = require("node-cron");
const { SummonerRank } = require("./models/SummonerRank");
const {
  getChallengerRankAPI,
  getGrandmasterRankAPI,
  getMasterRankAPI,
} = require("./api/summoner");
const { getTierList } = require("./util/summonerUtil");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// second minute hour day-of-month month day-of-week
cron.schedule("0 */1 * * *", async () => {
  try {
    const summonerRankList = [];
    let chList;
    let gmList;
    let mrList;
    const challengerleagues = await getChallengerRankAPI();
    chList = getTierList(challengerleagues);
    summonerRankList.push(...chList);
    const grandmasterleagues = await getGrandmasterRankAPI();
    gmList = getTierList(grandmasterleagues);
    summonerRankList.push(...gmList);
    const masterleagues = await getMasterRankAPI();
    mrList = getTierList(masterleagues);
    summonerRankList.push(...mrList);
    let currentDate = new Date().toISOString();
    summonerRankList.map((s) => {
      const filter = { summonerId: s.summonerId };
      const update = {
        summonerName: s.summonerName,
        leaguePoints: Number(s.leaguePoints),
        rank: s.rank,
        wins: s.wins,
        losses: s.losses,
        veteran: s.veteran,
        inactive: s.inactive,
        freshBlood: s.freshBlood,
        hotStreak: s.hotStreak,
        tier: s.tier,
        queue: s.queue,
        uptodate: currentDate,
      };
      SummonerRank.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      }).exec((err, updateSummoner) => {
        if (err) return console.log(err);
        return updateSummoner;
      });
    });

    let prevDate = new Date();
    prevDate.setHours(prevDate.getHours() - 1);
    prevDate.toISOString();
    find_query = { uptodate: { $lt: prevDate } };
    await SummonerRank.deleteMany(find_query);

    console.log("SummonerRank DB Update");
  } catch (e) {
    console.log(e);
  }
});

app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://35.216.89.56",
      "http://35.216.89.56",
      "https://flashlol.site",
    ],
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/summoner", summonerRouter);

module.exports = app;
