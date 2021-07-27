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

function MatchCardContent({ gamedata, champions }: any) {
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
                    {win}
                  </ResultMatchText>
                  <ResultMatchType>{queue}</ResultMatchType>
                  <ResultMatchDuration>{`${moment(0)
                    .seconds(gamedata.gameDuration)
                    .format('mm:ss')}`}</ResultMatchDuration>
                  <ResultMatchDate>{`${moment(
                    gamedata.gameCreation,
                  ).fromNow()}`}</ResultMatchDate>
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
                    <Item>
                      {userInfo[0].stats.item6 ? (
                        <img
                          src={`${RIOT_CDN}/img/item/${userInfo[0].stats.item6}.png`}
                          style={{ width: '100%', height: '100%' }}
                        ></img>
                      ) : null}
                    </Item>
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
                            <img
                              style={{
                                width: '14px',
                                height: '14px',
                                verticalAlign: 'middle',
                              }}
                              src={`${RIOT_CDN}/img/champion/${t.championData[0].id}.png`}
                            ></img>
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
                            <img
                              style={{
                                width: '14px',
                                height: '14px',
                                verticalAlign: 'middle',
                              }}
                              src={`${RIOT_CDN}/img/champion/${t.championData[0].id}.png`}
                            ></img>
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
  position: relative;
  border: 1px solid #e6e6e6;
  flex-direction: row;
  margin-bottom: 10px;
`;

const MatchHistoryResult = styled.div<{ winlose: boolean }>`
  background-color: ${props => (props.winlose ? '#5393ca' : '#ed6767')};
  display: inline-block;
  width: 8px;
  height: 100px;
  font-size: 0;
  vertical-align: middle;
  flex-basis: 32px;
  flex-shrink: 0;
  color: #fff;
  line-height: 1.2;
  align-items: center;
  font-weight: 700;
  justify-content: center;
`;

const MatchHistoryContent = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  flex-grow: 1;
`;

const MatchHistoryRowStatus = styled.div`
  margin-bottom: 0;
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
  line-height: 1;
`;

const MatchHistoryColStatus = styled.div`
  font-size: 12px;
  line-height: 1;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  width: 110px;
`;

const ResultMatchText = styled.span<{ winlose: boolean }>`
  color: ${props => (props.winlose ? '#5393ca' : '#ed6767')};
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: block;
`;

const ResultMatchType = styled.span`
  display: block;
`;

const ResultMatchDuration = styled.span`
  display: block;
  margin-top: 0.25rem;
`;

const ResultMatchDate = styled.span`
  display: grey;
  margin-top: 0.25rem;
`;

const MatchHistoryRowStats = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const MatchHistoryColParticipant = styled.div`
  width: 140px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
`;

const Champion = styled.div`
  display: inline-block;
  width: 52px;
  height: 52px;
  position: relative;
  vertical-align: middle;
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
  margin-left: 4px;
  display: inline-block;
  vertical-align: middle;
`;

const Spell = styled.div`
  width: 24px;
  height: 24px;
  &:last-child {
    margin-top: 4px;
  }
`;

const Runes = styled.div`
  margin-left: 4px;
  display: inline-block;
  vertical-align: middle;
`;

const Rune = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 2px;
  display: block;
  background-color: #000;
  &:last-child {
    margin-top: 4px;
    padding: 4px;
  }
`;

const MatchHistoryColKda = styled.div`
  width: 140px;
  font-size: 12px;
  line-height: 1;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
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
  width: 150px;
  font-size: 14px;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
`;

const StatInfo = styled.div`
  font-size: 12px;
  line-height: 18px;
`;

const StatWards = styled.div`
  display: block;
  margin-top: 0.25rem;
`;

const MatchHistoryRowItmes = styled.div`
  margin-top: 0;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
`;

const MatchHistoryColItmes = styled.div`
  width: 220px;
  display: inline-block;
  vertical-align: middle;
`;

const Items = styled.div`
  display: block;
  &:last-child {
    margin-top: 4px;
  }
`;

const Item = styled.div`
  width: 28px;
  height: 28px;
  display: inline-block;
  vertical-align: middle;
  background-color: rgba(255, 255, 255, 0.3);
  margin-left: 4px;
  &:first-child {
    margin-left: 0px;
  }
`;

const MatchHistoryColSummoners = styled.div`
  width: 320px;
  display: inline-block;
  vertical-align: middle;
`;

const Summoners = styled.div`
  display: inline-block;
  width: 50%;
  font-weight: 400;
  color: #341f97;
  &:last-child {
    color: #b71540;
  }
`;

const Summoner = styled.div`
  display: block;
  line-height: 1;
  margin-top: 3px;
  &:first-child {
    margin-top: 0px;
  }
`;

const SummonerName = styled.span`
  display: inline-block;
  max-width: 110px;
  margin-left: 4px;
  font-size: 12px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    font-weight: 1000;
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
