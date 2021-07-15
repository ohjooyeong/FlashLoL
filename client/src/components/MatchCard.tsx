import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MatchlistDto, MatchReferenceDto } from '../api/game';
import { getGameDetailInfoAsync } from '../modules/game';
import { RootState } from '../modules';
import styled from 'styled-components';
type MatchCardProps = {
  matchlist: MatchlistDto;
};

function MatchCard({ matchlist }: MatchCardProps) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.game.summonerDetailGameInfo,
  );
  useEffect(() => {
    if (matchlist.matches) {
      matchlist.matches.map(game => {
        const { gameId } = game;
        dispatch(getGameDetailInfoAsync.request(gameId));
      });
    }
  }, []);
  return (
    <MatchHistory>
      <MatchHistoryResult></MatchHistoryResult>
      <MatchHistoryContent>
        <MatchHistoryRowStatus>
          <MatchHistoryColStatus>
            <ResultMatchText>승리</ResultMatchText>
            <ResultMatchType>솔로 랭크</ResultMatchType>
            <ResultMatchDuration>시간</ResultMatchDuration>
            <ResultMatchDate>날짜</ResultMatchDate>
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
                ></img>
              </Rune>
            </Runes>
          </MatchHistoryColParticipant>
        </MatchHistoryRowStats>
      </MatchHistoryContent>
    </MatchHistory>
  );
}

const MatchHistory = styled.div`
  position: relative;
  border: 1px solid #e6e6e6;
  flex-direction: row;
`;

const MatchHistoryResult = styled.div`
  background-color: #5393ca;
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

const ResultMatchText = styled.span`
  color: #5393ca;
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

export default MatchCard;
