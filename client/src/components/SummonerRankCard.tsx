import React from 'react';
import styled from 'styled-components';
import { SummonerRakingDTO } from '../api/ranking';
import { rankRateAdd } from '../util/rankRate';

type RankProfileProps = {
  rankData: SummonerRakingDTO;
};

function SummonerRankCard({ rankData }: RankProfileProps) {
  return (
    <>
      <RankingTableCellSumoner>{rankData.summonerName}</RankingTableCellSumoner>
      <RankingTableCellTier>{rankData.tier}</RankingTableCellTier>
      <RankingTableCellLp>{rankData.leaguePoints} LP</RankingTableCellLp>
      <RankingTableCellWinRate>
        <RankingWinRatio>
          <RankingWinRatioGraph>
            <RankingWinRatioGraphFillLeft
              fill={rankRateAdd(rankData)}
            ></RankingWinRatioGraphFillLeft>
            <RankingWinRatioGraphTextLeft>
              {rankData.wins}
            </RankingWinRatioGraphTextLeft>
            <RankingWinRatioGraphFillRight></RankingWinRatioGraphFillRight>
            <RankingWinRatioGraphTextRight>
              {rankData.losses}
            </RankingWinRatioGraphTextRight>
          </RankingWinRatioGraph>
          <WinratioText>{rankRateAdd(rankData)}%</WinratioText>
        </RankingWinRatio>
      </RankingTableCellWinRate>
    </>
  );
}

const RankingTableCellSumoner = styled.td`
  border-bottom: 1px solid #cdd2d2;
  height: 54px;
  line-height: 16px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
`;

const RankingTableCellTier = styled.td`
  border-bottom: 1px solid #cdd2d2;
  height: 54px;
  line-height: 16px;
  font-size: 14px;
  color: #787878;
`;

const RankingTableCellLp = styled.td`
  border-bottom: 1px solid #cdd2d2;
  height: 54px;
  line-height: 16px;
  font-size: 14px;
  color: black;
  font-weight: 500;
`;

const RankingTableCellWinRate = styled.td`
  border-bottom: 1px solid #cdd2d2;
  height: 54px;
  line-height: 16px;
  font-size: 14px;
  color: #787878;
  text-align: center;
`;

const RankingWinRatio = styled.div``;

const RankingWinRatioGraph = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 20px;
  vertical-align: middle;
`;

const RankingWinRatioGraphFillLeft = styled.div<{ fill: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${props => props.fill}%;
  height: 100%;
  border-radius: 4px;
  background: #3d95e5;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 1;
`;

const RankingWinRatioGraphTextLeft = styled.div`
  position: absolute;
  top: 3px;
  height: 100%;
  line-height: 15px;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  left: 9px;
  text-align: left;
  z-index: 1;
`;

const RankingWinRatioGraphFillRight = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #ee5a52;
`;

const RankingWinRatioGraphTextRight = styled.div`
  position: absolute;
  top: 3px;
  height: 100%;
  line-height: 15px;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  right: 8px;
  text-align: right;
  z-index: 1;
`;

const WinratioText = styled.span`
  vertical-align: middle;
  margin-left: 10px;
  line-height: 16px;
  font-size: 14px;
  color: #4a4a4a;
`;

export default SummonerRankCard;
