import React from 'react';
import styled from 'styled-components';
import { RIOT_CDN } from '../../config/cdn_value';

type MatchCardDetailProps = {
  team1: Array<teamType>;
  team2: Array<teamType>;
  aboutTeams: Array<aboutTeamsType>;
};

type teamType = {
  championData: any;
  championId: number;
  participantId: number;
  player: any;
  spell1Id: number;
  spell2Id: number;
  stats: any;
  teamId: number;
  timeline: any;
};

type aboutTeamsType = {
  bans: Array<any>;
  baronKills: number;
  dominionVictoryScore: number;
  dragonKills: number;
  firstBaron: boolean;
  firstBlood: boolean;
  firstDragon: boolean;
  firstInhibitor: boolean;
  firstRiftHerald: boolean;
  firstTower: boolean;
  inhibitorKills: number;
  riftHeraldKills: number;
  teamId: number;
  towerKills: number;
  vilemawKills: number;
  win: string;
};

function MatchCardDetail({ team1, team2, aboutTeams }: MatchCardDetailProps) {
  const teams = [team1, team2];
  const totalDamageScore = [...team1, ...team2].reduce((acc: any, cur: any) => {
    return acc > cur.stats.totalDamageDealtToChampions
      ? acc
      : cur.stats.totalDamageDealtToChampions;
  }, 0);

  const aboutTeam = aboutTeams;

  if (!teams[0][0].stats.win) {
    teams.reverse();
    aboutTeam.reverse();
  }

  const KillReducer = (acc: any, cur: any) => {
    return acc + cur.stats?.kills;
  };

  const DeathReducer = (acc: any, cur: any) => {
    return acc + cur.stats?.deaths;
  };

  const AssistReducer = (acc: any, cur: any) => {
    return acc + cur.stats?.assists;
  };

  const totalTeamScore = [
    [
      teams[0].reduce(KillReducer, 0),
      teams[0].reduce(DeathReducer, 0),
      teams[0].reduce(AssistReducer, 0),
    ],
    [
      teams[1].reduce(KillReducer, 0),
      teams[1].reduce(DeathReducer, 0),
      teams[1].reduce(AssistReducer, 0),
    ],
  ];

  return (
    <MatchHistoryDetailContainer>
      <MatchHistoryDetailHeader>
        <MatchHistoryDetailTab>종합</MatchHistoryDetailTab>
        <MatchHistoryDetailTabRight></MatchHistoryDetailTabRight>
      </MatchHistoryDetailHeader>
      <MatchHistoryDetailContent>
        <MatchDetailOverview>
          <RowContent>
            <ColContent>
              <MatchDetailOverviewTeam>
                <MatchDetailOverviewTeamStatsWin>
                  <ResultWin>승리</ResultWin>
                  <FlexGrow></FlexGrow>
                  <Objects>
                    <img
                      style={{ border: '0', verticalAlign: 'middle' }}
                      src="https://poro.gg/images/lol/gameInfo/ico-turret.png"
                    ></img>
                    <ValueSp>{aboutTeam[0].towerKills}</ValueSp>
                    <img
                      style={{ border: '0', verticalAlign: 'middle' }}
                      src="https://poro.gg/images/lol/gameInfo/ico-dragon.png"
                    ></img>
                    <ValueSp>{aboutTeam[0].dragonKills}</ValueSp>
                    <img
                      style={{ border: '0', verticalAlign: 'middle' }}
                      src="https://poro.gg/images/lol/gameInfo/ico-baron-nashor.png"
                    ></img>
                    <ValueSp>{aboutTeam[0].baronKills}</ValueSp>
                  </Objects>
                  <WinBar></WinBar>
                  <Kda>
                    <img
                      style={{ border: '0', verticalAlign: 'middle' }}
                      src="https://poro.gg/images/lol/gameInfo/ico-kda.png"
                    ></img>
                    {` ${totalTeamScore[0][0]} /`}{' '}
                    <DeathSp>{`${totalTeamScore[0][1]}`}</DeathSp>
                    {` / ${totalTeamScore[0][2]}`}
                  </Kda>
                </MatchDetailOverviewTeamStatsWin>
                <MatchDetailOverviewSummoners>
                  {teams[0] &&
                    teams[0].map((t: any, i: any) => (
                      <MatchDetailOverviewSummoner
                        key={t.championId + t.player.currentAccountId + i}
                      >
                        <MatchDetailOverviewSummonerRow>
                          <MatchDetailOverviewSummonerColChamp>
                            <div style={{ position: 'relative' }}>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`${RIOT_CDN}/img/champion/${t.championData[0].id}.png`}
                              ></img>
                              <ChampLevel>{t.stats.champLevel}</ChampLevel>
                            </div>
                          </MatchDetailOverviewSummonerColChamp>
                          <MatchDetailOverviewSummonerColSpells>
                            <Spell>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`/images/SummonerSpell/${t.spell1Id}.png`}
                              ></img>
                            </Spell>
                            <Spell>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`/images/SummonerSpell/${t.spell2Id}.png`}
                              ></img>
                            </Spell>
                          </MatchDetailOverviewSummonerColSpells>
                          <MatchDetailOverviewSummonerColRunes>
                            <Rune>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`http:////opgg-static.akamaized.net/images/lol/perk/${t.stats.perk0}.png`}
                              ></img>
                            </Rune>
                            <Rune>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`http:////opgg-static.akamaized.net/images/lol/perkStyle/${t.stats.perkSubStyle}.png`}
                              ></img>
                            </Rune>
                          </MatchDetailOverviewSummonerColRunes>
                          <MatchDetailOverviewSummonerColSummoner>
                            <Dflex>
                              <SName>
                                <SNameSub
                                  href={`/summoner/${t.player.summonerName}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t.player.summonerName}
                                </SNameSub>
                              </SName>
                            </Dflex>
                          </MatchDetailOverviewSummonerColSummoner>
                          <MatchDetailOverviewSummonerColKda>
                            <Kda>
                              {` ${t.stats.kills} /`}{' '}
                              <DeathSp>{`${t.stats.deaths}`}</DeathSp>
                              {` / ${t.stats.assists}`}
                            </Kda>
                            <KdaString>
                              {t.stats.deaths
                                ? (
                                    Math.round(
                                      ((t.stats.kills + t.stats.assists) /
                                        t.stats.deaths) *
                                        100,
                                    ) / 100
                                  ).toFixed(2)
                                : 'Perfect'}
                            </KdaString>
                          </MatchDetailOverviewSummonerColKda>
                          <MatchDetailOverviewSummonerColStats>
                            <Wards>
                              <Ward>
                                <img
                                  style={{
                                    border: '0',
                                    verticalAlign: 'middle',
                                    width: 'auto',
                                    height: 'auto',
                                  }}
                                  src="https://poro.gg/images/lol/gameInfo/ico-cs.svg"
                                ></img>
                                <StatSp>{t.stats.totalMinionsKilled}</StatSp>
                              </Ward>
                              <Ward>
                                <img
                                  style={{
                                    border: '0',
                                    verticalAlign: 'middle',
                                    width: 'auto',
                                    height: 'auto',
                                  }}
                                  src="https://poro.gg/images/lol/gameInfo/ico-gold.svg"
                                ></img>
                                <StatSp>
                                  {t.stats.goldEarned > 10000
                                    ? `${
                                        Math.round(t.stats.goldEarned / 1000) /
                                        10
                                      }만`
                                    : `${
                                        Math.round(t.stats.goldEarned / 100) /
                                        10
                                      }천`}
                                </StatSp>
                              </Ward>
                              <Ward>
                                <img
                                  style={{
                                    border: '0',
                                    verticalAlign: 'middle',
                                    width: 'auto',
                                    height: 'auto',
                                  }}
                                  src="https://poro.gg/images/lol/gameInfo/ico-ward-control.svg"
                                ></img>
                                <StatSp>
                                  {t.stats.visionWardsBoughtInGame}
                                </StatSp>
                              </Ward>
                            </Wards>
                            <Graph>
                              <GraphFill
                                fill={
                                  t.stats.totalDamageDealtToChampions /
                                  totalDamageScore
                                }
                              ></GraphFill>
                              <GraphValue>
                                {t.stats.totalDamageDealtToChampions}
                              </GraphValue>
                            </Graph>
                          </MatchDetailOverviewSummonerColStats>
                          <MatchDetailOverviewSummonerColItems>
                            <Items>
                              <Item>
                                {t.stats.item0 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item0}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item1 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item1}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item2 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item2}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                            </Items>
                            <Items>
                              <Item>
                                {t.stats.item3 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item3}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item4 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item4}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item5 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item5}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item6 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item6}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                            </Items>
                          </MatchDetailOverviewSummonerColItems>
                        </MatchDetailOverviewSummonerRow>
                      </MatchDetailOverviewSummoner>
                    ))}
                </MatchDetailOverviewSummoners>
              </MatchDetailOverviewTeam>
            </ColContent>
            <ColContent>
              <MatchDetailOverviewTeam>
                <MatchDetailOverviewTeamStatsLose>
                  <ResultLose>패배</ResultLose>
                  <FlexGrow></FlexGrow>
                  <Objects>
                    <img
                      style={{ border: '0', verticalAlign: 'middle' }}
                      src="https://poro.gg/images/lol/gameInfo/ico-turret.png"
                    ></img>
                    <ValueSp>{aboutTeam[1].towerKills}</ValueSp>
                    <img
                      style={{ border: '0', verticalAlign: 'middle' }}
                      src="https://poro.gg/images/lol/gameInfo/ico-dragon.png"
                    ></img>
                    <ValueSp>{aboutTeam[1].dragonKills}</ValueSp>
                    <img
                      style={{ border: '0', verticalAlign: 'middle' }}
                      src="https://poro.gg/images/lol/gameInfo/ico-baron-nashor.png"
                    ></img>
                    <ValueSp>{aboutTeam[1].baronKills}</ValueSp>
                  </Objects>
                  <LoseBar></LoseBar>
                  <Kda>
                    <img
                      style={{ border: '0', verticalAlign: 'middle' }}
                      src="https://poro.gg/images/lol/gameInfo/ico-kda.png"
                    ></img>
                    {` ${totalTeamScore[1][0]} /`}{' '}
                    <DeathSp>{`${totalTeamScore[1][1]}`}</DeathSp>
                    {` / ${totalTeamScore[1][2]}`}
                  </Kda>
                </MatchDetailOverviewTeamStatsLose>
                <MatchDetailOverviewSummoners>
                  {teams[1] &&
                    teams[1].map((t: any, i: any) => (
                      <MatchDetailOverviewSummoner
                        key={t.championId + t.player.currentAccountId + i}
                      >
                        <MatchDetailOverviewSummonerRow>
                          <MatchDetailOverviewSummonerColChamp>
                            <div style={{ position: 'relative' }}>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`${RIOT_CDN}/img/champion/${t.championData[0].id}.png`}
                              ></img>
                              <ChampLevel>{t.stats.champLevel}</ChampLevel>
                            </div>
                          </MatchDetailOverviewSummonerColChamp>
                          <MatchDetailOverviewSummonerColSpells>
                            <Spell>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`/images/SummonerSpell/${t.spell1Id}.png`}
                              ></img>
                            </Spell>
                            <Spell>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`/images/SummonerSpell/${t.spell2Id}.png`}
                              ></img>
                            </Spell>
                          </MatchDetailOverviewSummonerColSpells>
                          <MatchDetailOverviewSummonerColRunes>
                            <Rune>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`http:////opgg-static.akamaized.net/images/lol/perk/${t.stats.perk0}.png`}
                              ></img>
                            </Rune>
                            <Rune>
                              <img
                                style={{ width: '100%', border: '0' }}
                                src={`http:////opgg-static.akamaized.net/images/lol/perkStyle/${t.stats.perkSubStyle}.png`}
                              ></img>
                            </Rune>
                          </MatchDetailOverviewSummonerColRunes>
                          <MatchDetailOverviewSummonerColSummoner>
                            <Dflex>
                              <SName>
                                <SNameSub
                                  href={`/summoner/${t.player.summonerName}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t.player.summonerName}
                                </SNameSub>
                              </SName>
                            </Dflex>
                          </MatchDetailOverviewSummonerColSummoner>
                          <MatchDetailOverviewSummonerColKda>
                            <Kda>
                              {` ${t.stats.kills} /`}{' '}
                              <DeathSp>{`${t.stats.deaths}`}</DeathSp>
                              {` / ${t.stats.assists}`}
                            </Kda>
                            <KdaString>
                              {t.stats.deaths
                                ? (
                                    Math.round(
                                      ((t.stats.kills + t.stats.assists) /
                                        t.stats.deaths) *
                                        100,
                                    ) / 100
                                  ).toFixed(2)
                                : 'Perfect'}
                            </KdaString>
                          </MatchDetailOverviewSummonerColKda>
                          <MatchDetailOverviewSummonerColStats>
                            <Wards>
                              <Ward>
                                <img
                                  style={{
                                    border: '0',
                                    verticalAlign: 'middle',
                                    width: 'auto',
                                    height: 'auto',
                                  }}
                                  src="https://poro.gg/images/lol/gameInfo/ico-cs.svg"
                                ></img>
                                <StatSp>{t.stats.totalMinionsKilled}</StatSp>
                              </Ward>
                              <Ward>
                                <img
                                  style={{
                                    border: '0',
                                    verticalAlign: 'middle',
                                    width: 'auto',
                                    height: 'auto',
                                  }}
                                  src="https://poro.gg/images/lol/gameInfo/ico-gold.svg"
                                ></img>
                                <StatSp>
                                  {t.stats.goldEarned > 10000
                                    ? `${
                                        Math.round(t.stats.goldEarned / 1000) /
                                        10
                                      }만`
                                    : `${
                                        Math.round(t.stats.goldEarned / 100) /
                                        10
                                      }천`}
                                </StatSp>
                              </Ward>
                              <Ward>
                                <img
                                  style={{
                                    border: '0',
                                    verticalAlign: 'middle',
                                    width: 'auto',
                                    height: 'auto',
                                  }}
                                  src="https://poro.gg/images/lol/gameInfo/ico-ward-control.svg"
                                ></img>
                                <StatSp>
                                  {t.stats.visionWardsBoughtInGame}
                                </StatSp>
                              </Ward>
                            </Wards>
                            <Graph>
                              <GraphFill
                                fill={
                                  t.stats.totalDamageDealtToChampions /
                                  totalDamageScore
                                }
                              ></GraphFill>
                              <GraphValue>
                                {t.stats.totalDamageDealtToChampions}
                              </GraphValue>
                            </Graph>
                          </MatchDetailOverviewSummonerColStats>
                          <MatchDetailOverviewSummonerColItems>
                            <Items>
                              <Item>
                                {t.stats.item0 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item0}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item1 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item1}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item2 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item2}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                            </Items>
                            <Items>
                              <Item>
                                {t.stats.item3 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item3}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item4 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item4}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item5 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item5}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                              <Item>
                                {t.stats.item6 ? (
                                  <img
                                    src={`${RIOT_CDN}/img/item/${t.stats.item6}.png`}
                                    style={{ width: '100%', height: '100%' }}
                                  ></img>
                                ) : null}
                              </Item>
                            </Items>
                          </MatchDetailOverviewSummonerColItems>
                        </MatchDetailOverviewSummonerRow>
                      </MatchDetailOverviewSummoner>
                    ))}
                </MatchDetailOverviewSummoners>
              </MatchDetailOverviewTeam>
            </ColContent>
          </RowContent>
        </MatchDetailOverview>
      </MatchHistoryDetailContent>
    </MatchHistoryDetailContainer>
  );
}

const MatchHistoryDetailContainer = styled.div`
  border-bottom: 2px solid #999;
`;

const MatchHistoryDetailHeader = styled.div`
  padding-top: 9px;
  padding-bottom: 9px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 8px;
  font-size: 12px;
  background-color: #fafafa;
  border-bottom: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
`;

const MatchHistoryDetailTab = styled.div`
  color: #f1d9d9;
  display: inline-block;
  padding: 5px 16px;
  border-radius: 16px;
  cursor: pointer;
  line-height: 1.6;
  font-weight: 700;
  background-color: #4a5055;
  height: 32px;
  padding-top: 7px;
  padding-bottom: 7px;
`;

const MatchHistoryDetailTabRight = styled.div`
  display: inline-block;
  margin-left: auto;
`;

const MatchHistoryDetailContent = styled.div`
  border-right: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
`;

const MatchDetailOverview = styled.div``;

const RowContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  margin-right: 0;
`;

const ColContent = styled.div`
  position: relative;
  width: 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding-left: 0;
  padding-right: 0;
  &:last-child {
    border-left: none;
  }

  // 768px
  ${props => props.theme.device.tabletM} {
    &:last-child {
      border-left: 1px solid #e6e6e6;
    }
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const MatchDetailOverviewTeam = styled.div``;

const MatchDetailOverviewTeamStatsWin = styled.div`
  height: 32px;
  display: flex;
  padding-left: 12px;
  padding-right: 12px;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid grey;
  font-size: 12px;
  border-top-color: #5393ca;
  background-color: #d8e8f6;
  // 475px
  ${props => props.theme.device.mobile} {
    height: 40px;
  }
`;

const MatchDetailOverviewTeamStatsLose = styled.div`
  height: 32px;
  display: flex;
  padding-left: 12px;
  padding-right: 12px;
  flex-direction: row-reverse;
  align-items: center;
  border-top: 1px solid grey;
  font-size: 12px;
  border-top-color: #ed6767;
  background-color: #fdd;
  // 475px
  ${props => props.theme.device.mobile} {
    height: 40px;
  }
`;

const ResultWin = styled.div`
  font-weight: 700;
  color: #5393ca;
`;

const ResultLose = styled.div`
  font-weight: 700;
  color: #ed6767;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const Objects = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
`;

const ValueSp = styled.span`
  margin-left: 4px;
  margin-right: 4px;
`;

const DeathSp = styled.span`
  color: #ed6767;
`;

const StatSp = styled.span`
  font-size: 11px;
  margin-left: 2px;
  vertical-align: middle;
`;

const WinBar = styled.div`
  background-color: #5393ca;
  width: 1px;
  height: 12px;
  margin-left: 8px;
  margin-right: 8px;
`;

const LoseBar = styled.div`
  background-color: #ed6767;
  width: 1px;
  height: 12px;
  margin-left: 8px;
  margin-right: 8px;
`;

const MatchDetailOverviewSummoners = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
  background-color: #f9fbfd;
`;

const MatchDetailOverviewSummoner = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  position: relative;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid transparent;
  padding: 4px 8px 3px;
  font-size: 0;
`;

const MatchDetailOverviewSummonerRow = styled.div`
  display: flex;
  align-items: center;
`;

const MatchDetailOverviewSummonerColChamp = styled.div`
  position: relative;
  width: 34px;
  height: 34px;
  display: inline-block;
  vertical-align: middle;
`;

const ChampLevel = styled.div`
  pointer-events: none;
  position: absolute;

  right: 0;
  bottom: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 11px;
  line-height: 11px;
`;

const MatchDetailOverviewSummonerColSpells = styled.div`
  margin-left: 1px;
  display: inline-block;
  vertical-align: middle;
`;

const MatchDetailOverviewSummonerColRunes = styled.div`
  margin-left: 1px;
  display: inline-block;
  vertical-align: middle;
`;

const MatchDetailOverviewSummonerColSummoner = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 4px;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
  height: 16px;
`;

const MatchDetailOverviewSummonerColKda = styled.div`
  width: 70px;
  display: none;
  line-height: 1;
  text-align: center;
  font-size: 12px;
  vertical-align: middle;
  // 475px
  ${props => props.theme.device.mobile} {
    display: inline-block;
  }
  // 576px
  ${props => props.theme.device.tabletS} {
    width: 100px;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    margin-left: 32px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    margin-left: 0;
    width: 70px;
  }
`;

const MatchDetailOverviewSummonerColStats = styled.div`
  margin-left: 4px;
  width: 110px;
  display: inline-block;
  vertical-align: middle;
  // 768px
  ${props => props.theme.device.tabletM} {
    margin-left: 32px;
    width: 120px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    margin-left: 16px;
  }
`;

const MatchDetailOverviewSummonerColItems = styled.div`
  margin-left: 4px;
  vertical-align: middle;
  display: inline-block;
  // 576px
  ${props => props.theme.device.tabletS} {
    margin-left: 16px;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    margin-left: 32px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    margin-left: 16px;
  }
`;

const Spell = styled.div`
  width: 16px;
  height: 16px;
  &:last-child {
    margin-top: 2px;
  }
`;

const Rune = styled.div`
  width: 16px;
  height: 16px;
  background-color: #000;
  border-radius: 50%;
  &:last-child {
    margin-top: 2px;
    padding: 2px;
  }
`;

const Dflex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 16px;
`;

const SName = styled.div`
  flex: 1 1 0%;
  display: inline-block;
  vertical-align: middle;
  margin-left: 2px;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Helvetica Neue, Helvetica, Malgun Gothic, -apple-system, Dotum,
    sans-serif;
`;

const SNameSub = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

const Kda = styled.div`
  font-weight: 700;
`;

const KdaString = styled.div`
  font-size: 11px;
  margin-top: 6px;
`;

const Wards = styled.div`
  text-align: center;
`;

const Ward = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 6px;
  &:first-child {
    margin-left: 0px;
  }
`;

const Graph = styled.div`
  position: relative;
  height: 14px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-color: grey;
  margin-top: 4px;
  // 992px
  ${props => props.theme.device.tabletL} {
    margin-top: 6px;
    max-width: 100px;
  }
`;

const GraphFill = styled.div<{ fill: number }>`
  position: absolute;
  width: ${props => props.fill * 100}%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #ed6767;
  z-index: 1;
`;

const GraphValue = styled.span`
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  z-index: 2;
`;

const Items = styled.div`
  display: block;
  // 768px
  ${props => props.theme.device.tabletM} {
    display: inline-block;
    margin-top: 0;
    margin-left: 4px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    display: block;
    margin-top: 4px;
    margin-left: 0;
  }
  // 1200px
  ${props => props.theme.device.laptop} {
    display: inline-block;
    margin-top: 0;
    margin-left: 4px;
  }
`;

const Item = styled.div`
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.3);
  margin-left: 2px;
  // 475px
  ${props => props.theme.device.mobile} {
    width: 20px;
    height: 20px;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    margin-left: 4px;
  }
  &:first-child {
    margin-left: 0px;
  }
`;

export default MatchCardDetail;
