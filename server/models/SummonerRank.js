const mongoose = require("mongoose");

const summonerRankSchema = mongoose.Schema(
  {
    summonerId: {
      type: String,
      unique: 1,
    },
    summonerName: {
      type: String,
    },
    leaguePoints: {
      type: String,
    },
    queue: {
      type: String,
    },
    tier: {
      type: String,
    },
    rank: {
      type: String,
    },
    wins: {
      type: String,
    },
    losses: {
      type: String,
    },
    veteran: {
      type: String,
    },
    inactive: {
      type: Boolean,
    },
    freshBlood: {
      type: Boolean,
    },
    hotStreak: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const SummonerRank = mongoose.model("SummonerRank", summonerRankSchema);

export default SummonerRank;
