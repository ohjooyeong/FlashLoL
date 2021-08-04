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
      type: Number,
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
      type: Number,
    },
    losses: {
      type: Number,
    },
    veteran: {
      type: Boolean,
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

module.exports = { SummonerRank };
