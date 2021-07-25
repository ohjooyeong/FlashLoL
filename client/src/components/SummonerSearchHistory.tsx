import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getArray } from '../util/localStorage';
import { RIOT_CDN } from '../config/cdn_value';

function SummonerSearchHistory() {
  const [summoners, setsummoners] = useState([]);
  useEffect(() => {
    setsummoners(getArray('summoners', true));
  }, []);

  const handleRemove = (name: string) => {
    // 익명함수 타입any한 이유 summoners.filter로 바로 받아오면 never라는 타입으로 되서 객체에 값을 못넣음
    // any로 강제 변환하기 위해 했음.
    const summoner = function (): any {
      return summoners.filter(elem => elem[0] !== name).reverse();
    };
    setsummoners(summoners.filter(elem => elem[0] !== name));
    const key = {
      summoners: summoner(),
    };
    localStorage.setItem('summoners', JSON.stringify(key));
  };

  const renderHistory = summoners.map((s: string, i: number) => {
    return (
      <SummonerHistory key={s[0] + s[1] + i}>
        <SLink to={`/summoner/${s[0]}`}>
          <img
            src={`${RIOT_CDN}/img/profileicon/${s[1]}.png`}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              verticalAlign: 'middle',
              borderStyle: 'none',
            }}
          ></img>
        </SLink>
        <SummonerHistoryName>
          <SLink to={`/summoner/${s[0]}`}>{s[0]}</SLink>
        </SummonerHistoryName>
        <HistoryX onClick={() => handleRemove(s[0])}>
          <XBadge>X</XBadge>
        </HistoryX>
      </SummonerHistory>
    );
  });

  return (
    <SummonerSearchHistoryContainer>
      <SummonerSearchHistoryWrap>{renderHistory}</SummonerSearchHistoryWrap>
    </SummonerSearchHistoryContainer>
  );
}

const SummonerSearchHistoryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  margin-top: 1rem;
`;

const SummonerSearchHistoryWrap = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
`;

const SummonerHistory = styled.div`
  width: 18%;
  display: flex;
  margin-top: 1rem;
  align-items: center;
  flex-direction: column;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const SummonerHistoryName = styled.div`
  width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  margin-top: 0.8rem;
`;

const SLink = styled(Link)``;

const HistoryX = styled.div`
  left: 20%;
  top: -90px;
  position: relative;
`;

const XBadge = styled.div`
  color: red;
  border: 1px solid red;
  padding: 0.25rem 0.375rem;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 70%;
  cursor: pointer;
`;

export default SummonerSearchHistory;
