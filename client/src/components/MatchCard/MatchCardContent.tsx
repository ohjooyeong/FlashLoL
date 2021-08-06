import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../modules';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import { RIOT_CDN } from '../../config/cdn_value';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import MatchCardDetail from './MatchCardDetail';

type MatchCardContentProps = {
  gamedata: GamedataType;
  champions: ChampionsType;
};

type GamedataType = {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participantIdentities: Array<any>;
  participants: Array<any>;
  platformId: string;
  queueId: number;
  seasonId: number;
  teams: Array<any>;
};

type ChampionsType = {
  data: any;
  format: string;
  type: string;
  version: string;
};

function MatchCardContent({ gamedata, champions }: MatchCardContentProps) {
  const { data: summonerData } = useSelector(
    (state: RootState) => state.summoners.summonerProfile,
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(isOpen => !isOpen); // on, off 개념 boolean
  };

  const myName = summonerData?.summonerProfile.info.name;
  const participantSummoner = gamedata.participantIdentities;
  const participantSummonerStat = gamedata.participants;
  const teams = [...gamedata.teams];

  const team1 = [];
  const team2 = [];

  for (const j in participantSummonerStat) {
    const championData = [];
    for (const i in champions.data) {
      if (champions.data[i].key == participantSummonerStat[j].championId) {
        championData.push(champions.data[i]);
        break;
      }
    }
    if (participantSummonerStat[j].teamId === 100) {
      team1.push({
        ...participantSummoner[j],
        ...participantSummonerStat[j],
        championData,
      });
    } else {
      team2.push({
        ...participantSummoner[j],
        ...participantSummonerStat[j],
        championData,
      });
    }
  }

  const participant =
    gamedata &&
    gamedata.participantIdentities.filter((user: any) => {
      if (myName === user.player.summonerName) {
        return user;
      }
    });

  team1.sort(function (a, b): number {
    const o1 = a.timeline.lane;
    const o2 = b.timeline.lane;
    const r1 = a.timeline.role;
    const r2 = b.timeline.role;
    if (o1 < o2) return 1;
    if (o1 > o2) return -1;
    if (r1 < r2) return -1;
    if (r1 > r2) return 1;
    return 0;
  });

  const summoner1 = team1.splice(1, 1);
  team1.splice(2, 0, summoner1[0]);

  team2.sort(function (a, b): number {
    const o1 = a.timeline.lane;
    const o2 = b.timeline.lane;
    const r1 = a.timeline.role;
    const r2 = b.timeline.role;
    if (o1 < o2) return 1;
    if (o1 > o2) return -1;
    if (r1 < r2) return -1;
    if (r1 > r2) return 1;
    return 0;
  });

  const summoner2 = team2.splice(1, 1);
  team2.splice(2, 0, summoner2[0]);

  const userInfo = gamedata.participants.filter((user: any) => {
    if (participant[0]?.participantId === user.participantId) {
      return user;
    }
  });

  const championData = [];
  for (const i in champions.data) {
    if (champions.data[i]?.key == userInfo[0]?.championId) {
      championData.push(champions.data[i]);
    }
  }

  const win = userInfo[0]?.stats.win ? '승리' : '패배';
  const queue =
    gamedata?.queueId === 440
      ? '자유 랭크'
      : gamedata?.queueId === 420
      ? '솔로랭크'
      : gamedata?.queueId === 430
      ? '일반'
      : '칼바람 나락';

  return (
    <>
      {userInfo[0] && (
        <>
          <MatchHistory>
            <MatchHistoryResult
              winlose={userInfo[0].stats.win}
            ></MatchHistoryResult>
            <MatchHistoryContent>
              <MatchHistoryRowStatus>
                <MatchHistoryColStatus>
                  <ResultMatchText winlose={userInfo[0].stats.win}>
                    {win}{' '}
                  </ResultMatchText>
                  <ResultMatchType>{queue} </ResultMatchType>
                  <ResultMatchDuration>{`${moment(0)
                    .seconds(gamedata.gameDuration)
                    .format('mm:ss')} `}</ResultMatchDuration>
                  <ResultMatchDate>{`${moment(
                    gamedata.gameCreation,
                  ).fromNow()} `}</ResultMatchDate>
                </MatchHistoryColStatus>
              </MatchHistoryRowStatus>
              <MatchHistoryRowStats>
                <MatchHistoryColParticipant>
                  <Champion>
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        border: '0',
                        verticalAlign: 'middle',
                      }}
                      src={`${RIOT_CDN}/img/champion/${championData[0].id}.png`}
                    ></img>
                    <ChampionLevel></ChampionLevel>
                  </Champion>
                  <Spells>
                    <Spell>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          border: '0',
                          verticalAlign: 'middle',
                        }}
                        src={`/images/SummonerSpell/${userInfo[0].spell1Id}.png`}
                      ></img>
                    </Spell>
                    <Spell>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          border: '0',
                          verticalAlign: 'middle',
                        }}
                        src={`/images/SummonerSpell/${userInfo[0].spell2Id}.png`}
                      ></img>
                    </Spell>
                  </Spells>
                  <Runes>
                    <Rune>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          border: '0',
                          verticalAlign: 'middle',
                        }}
                        src={`http:////opgg-static.akamaized.net/images/lol/perk/${userInfo[0].stats.perk0}.png`}
                      ></img>
                    </Rune>
                    <Rune>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          border: '0',
                          verticalAlign: 'middle',
                        }}
                        src={`http:////opgg-static.akamaized.net/images/lol/perkStyle/${userInfo[0].stats.perkSubStyle}.png`}
                      ></img>
                    </Rune>
                  </Runes>
                </MatchHistoryColParticipant>
                <MatchHistoryColKda>
                  <Kda>
                    <span>{userInfo[0].stats.kills} /</span>
                    <span style={{ color: '#ed6767' }}>
                      {' '}
                      {userInfo[0].stats.deaths}
                    </span>
                    <span> / {userInfo[0].stats.assists}</span>
                  </Kda>
                  <KdaString>
                    {userInfo[0].stats.deaths
                      ? (
                          Math.round(
                            ((userInfo[0].stats.kills +
                              userInfo[0].stats.assists) /
                              userInfo[0].stats.deaths) *
                              100,
                          ) / 100
                        ).toFixed(2)
                      : 'Perfect'}{' '}
                    평점
                  </KdaString>
                </MatchHistoryColKda>
                <MatchHistoryColStats>
                  <StatInfo>
                    <span> CS </span>
                    <span style={{ fontWeight: 'bold' }}>
                      {userInfo[0].stats.totalMinionsKilled}
                    </span>
                    <br />
                    <span>시야점수 </span>
                    <span style={{ fontWeight: 'bold' }}>
                      {userInfo[0].stats.visionScore}
                    </span>
                    <br />
                    <span>레벨 </span>
                    <span style={{ fontWeight: 'bold' }}>
                      {userInfo[0].stats.champLevel}
                    </span>
                  </StatInfo>
                  <StatWards></StatWards>
                </MatchHistoryColStats>
                <MatchHistoryColSmallSummoner>
                  <Summoners>
                    {team1 &&
                      team1.map((t, i) => (
                        <Summoner
                          key={
                            t.player.accountId +
                            t.championId +
                            t.participantId +
                            i
                          }
                        >
                          <MLink to={`/summoner/${t.player.summonerName}`}>
                            <SummonerImg
                              src={`${RIOT_CDN}/img/champion/${t.championData[0].id}.png`}
                            ></SummonerImg>
                          </MLink>
                        </Summoner>
                      ))}
                  </Summoners>
                  <Summoners>
                    {team2 &&
                      team2.map((t, i) => (
                        <Summoner
                          key={
                            t.player.accountId +
                            t.championId +
                            t.participantId +
                            i
                          }
                        >
                          <MLink to={`/summoner/${t.player.summonerName}`}>
                            <SummonerImg
                              src={`${RIOT_CDN}/img/champion/${t.championData[0].id}.png`}
                            ></SummonerImg>
                          </MLink>
                        </Summoner>
                      ))}
                  </Summoners>
                </MatchHistoryColSmallSummoner>
              </MatchHistoryRowStats>
              <MatchHistoryRowItmes>
                <MatchHistoryColItmes>
                  <Items>
                    <Item>
                      {userInfo[0].stats.item0 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item0}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </Item>
                    <Item>
                      {userInfo[0].stats.item1 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item1}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </Item>
                    <Item>
                      {userInfo[0].stats.item2 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item2}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </Item>
                    <ItemWard>
                      {userInfo[0].stats.item6 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item6}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </ItemWard>
                  </Items>
                  <Items>
                    <Item>
                      {userInfo[0].stats.item3 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item3}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </Item>
                    <Item>
                      {userInfo[0].stats.item4 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item4}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </Item>
                    <Item>
                      {userInfo[0].stats.item5 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item5}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </Item>
                    <ItemWard2>
                      {userInfo[0].stats.item6 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item6}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </ItemWard2>
                  </Items>
                </MatchHistoryColItmes>
                <MatchHistoryColSummoners>
                  <Summoners>
                    {team1 &&
                      team1.map((t, i) => (
                        <Summoner
                          key={
                            t.player.accountId +
                            t.championId +
                            t.participantId +
                            i
                          }
                        >
                          <MLink to={`/summoner/${t.player.summonerName}`}>
                            <SummonerImg
                              src={`${RIOT_CDN}/img/champion/${t.championData[0].id}.png`}
                            ></SummonerImg>
                            <SummonerName>{t.player.summonerName}</SummonerName>
                          </MLink>
                        </Summoner>
                      ))}
                  </Summoners>
                  <Summoners>
                    {team2 &&
                      team2.map((t, i) => (
                        <Summoner
                          key={
                            t.player.accountId +
                            t.championId +
                            t.participantId +
                            i
                          }
                        >
                          <MLink to={`/summoner/${t.player.summonerName}`}>
                            <SummonerImg
                              src={`${RIOT_CDN}/img/champion/${t.championData[0].id}.png`}
                            ></SummonerImg>
                            <SummonerName>{t.player.summonerName}</SummonerName>
                          </MLink>
                        </Summoner>
                      ))}
                  </Summoners>
                </MatchHistoryColSummoners>
              </MatchHistoryRowItmes>
            </MatchHistoryContent>
            <MatchHistoryExpandToggle
              winlose={userInfo[0].stats.win}
              onClick={toggleMenu}
            >
              <CusFontAwesome
                icon={isOpen ? faChevronUp : faChevronDown}
              ></CusFontAwesome>
            </MatchHistoryExpandToggle>
          </MatchHistory>
          {isOpen ? (
            <MatchCardDetail
              team1={team1}
              team2={team2}
              aboutTeams={teams}
            ></MatchCardDetail>
          ) : null}
        </>
      )}
    </>
  );
}

const MatchHistory = styled.div`
  display: flex;
  position: relative;
  border: 1px solid #e6e6e6;
  flex-direction: row;
  margin-bottom: 10px;
  background-color: rgba(250, 250, 250, 0.7);

  // 768px
  ${props => props.theme.device.tabletM} {
    display: block;
  }
`;

const MatchHistoryResult = styled.div<{ winlose: boolean }>`
  background-color: ${props => (props.winlose ? '#5393ca' : '#ed6767')};
  display: flex;
  flex-basis: 32px;
  flex-shrink: 0;
  height: 130px;
  font-size: 12px;
  color: #fff;
  line-height: 1.2;
  align-items: center;
  font-weight: 700;
  justify-content: center;

  // 768px
  ${props => props.theme.device.tabletM} {
    display: inline-block;
    width: 8px;
    height: 100px;
    font-size: 0;
    vertical-align: middle;
  }
`;

const MatchHistoryContent = styled.div`
  flex-grow: 1;
  padding: 12px 16px 0 8px;

  // 768px
  ${props => props.theme.device.tabletM} {
    display: inline-block;
    vertical-align: middle;
    padding: 0;
  }
`;

const MatchHistoryRowStatus = styled.div`
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  line-height: 1;
  margin-bottom: 16px;

  // 768px
  ${props => props.theme.device.tabletM} {
    margin-bottom: 0;
  }
`;

const MatchHistoryColStatus = styled.div`
  font-size: 12px;
  line-height: 1;
  text-align: center;
  display: inline-block;
  vertical-align: middle;

  // 768px
  ${props => props.theme.device.tabletM} {
    width: 100px;
  }
  // 1200px
  ${props => props.theme.device.laptop} {
    width: 110px;
  }
`;

const ResultMatchText = styled.span<{ winlose: boolean }>`
  color: ${props => (props.winlose ? '#5393ca' : '#ed6767')};
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0.5rem;

  // 768px
  ${props => props.theme.device.tabletM} {
    display: block;
  }
`;

const ResultMatchType = styled.span`
  // 768px
  ${props => props.theme.device.tabletM} {
    display: block;
  }
`;

const ResultMatchDuration = styled.span`
  margin-top: 0.25rem;

  // 768px
  ${props => props.theme.device.tabletM} {
    display: block;
  }
`;

const ResultMatchDate = styled.span`
  display: grey;
  margin-top: 0.25rem;

  // 768px
  ${props => props.theme.device.tabletM} {
    display: block;
  }
`;

const MatchHistoryRowStats = styled.div`
  font-size: 0;
  line-height: 1;

  // 768px
  ${props => props.theme.device.tabletM} {
    display: inline-block;
    vertical-align: middle;
  }
`;

const MatchHistoryColParticipant = styled.div`
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  line-height: 1;

  // 768px
  ${props => props.theme.device.tabletM} {
    width: 90px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 120px;
  }
  // 1200px
  ${props => props.theme.device.laptop} {
    width: 140px;
  }
`;

const Champion = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: 42px;
  height: 42px;
  text-align: center;

  // 992px
  ${props => props.theme.device.tabletL} {
    width: 52px;
    height: 52px;
  }
`;

const ChampionLevel = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Spells = styled.div`
  margin-left: 2px;
  display: inline-block;
  vertical-align: middle;
  // 992px
  ${props => props.theme.device.tabletL} {
    margin-left: 4px;
  }
`;

const Spell = styled.div`
  display: block;
  width: 20px;
  &:last-child {
    margin-top: 2px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 24px;
    height: 24px;
    &:last-child {
      margin-top: 4px;
    }
  }
`;

const Runes = styled.div`
  margin-left: 2px;
  display: inline-block;
  vertical-align: middle;
  // 992px
  ${props => props.theme.device.tabletL} {
    margin-left: 4px;
  }
`;

const Rune = styled.div`
  width: 20px;
  border-radius: 50%;
  padding: 2px;
  display: block;
  background-color: #000;

  &:last-child {
    margin-top: 2px;
    padding: 4px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 24px;
    height: 24px;
    &:last-child {
      margin-top: 4px;
    }
  }
`;

const MatchHistoryColKda = styled.div`
  font-size: 12px;
  line-height: 1;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  width: 90px;

  // 475px
  ${props => props.theme.device.mobile} {
    width: 140px;
  }
  // 576px
  ${props => props.theme.device.tabletS} {
    width: 110px;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    width: 100px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 130px;
  }
  // 1200px
  ${props => props.theme.device.laptop} {
    width: 140px;
  }
`;

const Kda = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const KdaString = styled.div`
  font-size: 12px;
  margin-top: 4px;
`;

const MatchHistoryColStats = styled.div`
  width: 70px;
  font-size: 12px;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
  // 475px
  ${props => props.theme.device.mobile} {
    width: 120px;
  }
  // 576px
  ${props => props.theme.device.tabletS} {
    width: 90px;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    width: 115px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 130px;
    font-size: 14px;
  }
  // 1200px
  ${props => props.theme.device.laptop} {
    width: 150px;
  }
`;

const StatInfo = styled.div`
  font-size: 11px;
  line-height: 14px;
  display: block;
  // 768px
  ${props => props.theme.device.tabletM} {
    font-size: 12px;
    line-height: 18px;
  }
`;

const StatWards = styled.div`
  display: block;
  margin-top: 0.25rem;
`;

const MatchHistoryColSmallSummoner = styled.div`
  display: none;
  vertical-align: middle;
  font-size: 0;
  line-height: 1;
  // 576px
  ${props => props.theme.device.tabletS} {
    display: inline-block;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    display: none;
    width: 130px;
  }
`;

const MatchHistoryRowItmes = styled.div`
  margin-top: 0;
  display: block;
  line-height: 1;
  margin-top: 12px;

  // 576px
  ${props => props.theme.device.tabletS} {
    margin-top: 8px;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    margin-top: 0;
    display: inline-block;
    vertical-align: middle;
  }
`;

const MatchHistoryColItmes = styled.div`
  font-size: 0;
  display: inline-block;
  vertical-align: middle;
  // 768px
  ${props => props.theme.device.tabletM} {
    width: 116px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 140px;
  }
  // 1200px
  ${props => props.theme.device.laptop} {
    width: 220px;
  }
`;

const Items = styled.div`
  display: inline-block;
  &:last-child {
    margin-left: 2px;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    display: block;
    &:last-child {
      margin-left: 0;
      margin-top: 2px;
    }
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    &:last-child {
      margin-top: 4px;
    }
  }
`;

const Item = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-left: 2px;
  &:first-child {
    margin-left: 0px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 28px;
    height: 28px;
    margin-left: 4px;
    &:first-child {
      margin-left: 0px;
    }
  }
`;

const ItemWard = styled.div`
  display: none;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-left: 2px;
  // 768px
  ${props => props.theme.device.tabletM} {
    display: inline-block;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 28px;
    height: 28px;
    margin-left: 4px;
  }
`;

const ItemWard2 = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-left: 2px;
  // 768px
  ${props => props.theme.device.tabletM} {
    display: none;
  }
`;

const MatchHistoryColSummoners = styled.div`
  display: none;
  vertical-align: middle;
  // 768px
  ${props => props.theme.device.tabletM} {
    display: inline-block;
    width: 130px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 280px;
  }
  // 1200px
  ${props => props.theme.device.laptop} {
    width: 320px;
  }
`;

const Summoners = styled.div`
  font-weight: 400;
  color: #341f97;
  &:last-child {
    color: #b71540;
    margin-top: 2px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    display: inline-block;
    width: 50%;
    &:last-child {
      margin-top: 0;
    }
  }
`;

const Summoner = styled.div`
  display: inline-block;
  line-height: 1;
  margin-left: 2px;
  &:first-child {
    margin-left: 0;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    display: block;
    margin-left: 0;
    margin-top: 2px;
    &:first-child {
      margin-top: 0;
      margin-left: 0;
    }
  }
`;

const SummonerImg = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
  border: 0;
  // 992px
  ${props => props.theme.device.tabletL} {
    width: 14px;
    height: 14px;
  }
`;

const SummonerName = styled.span`
  display: none;
  max-width: 140px;
  margin-left: 4px;
  font-size: 12px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    font-weight: 1000;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    display: inline-block;
    max-width: 110px;
  }
`;

const MLink = styled(Link)`
  color: inherit;
`;

const MatchHistoryExpandToggle = styled.div<{ winlose: boolean }>`
  background-color: ${props => (props.winlose ? '#5393ca' : '#ed6767')};
  display: flex;
  width: 30px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 16px;
  font-size: 12px;
`;

const CusFontAwesome = styled(FontAwesomeIcon)`
  font-weight: 900;
  color: white;
`;

export default MatchCardContent;
