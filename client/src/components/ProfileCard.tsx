import React from 'react';

import styled from 'styled-components';
import { SummonerInfo, SummonerProfile } from '../api/summoner';
import { RIOT_CDN } from '../config/cdn_value';
import { setArray } from '../util/localStorage';

type ProfileCardProps = {
  profileData: Array<SummonerProfile>;
  profileInfo: SummonerInfo;
};

type ProfileDataParams = {
  summonerId: string;
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  winning_rate: number;
  leaguePoints: number;
  wins: number | null;
  losses: number | null;
};

function ProfileCard({ profileData, profileInfo }: ProfileCardProps) {
  const rankCard = profileData.map((p: ProfileDataParams, i) => {
    return (
      <RankContainer key={p.leagueId + p.queueType + i}>
        <RankImgContainer>
          <RankImg src={`/images/ranked-emblems/${p.tier}.png`}></RankImg>
        </RankImgContainer>
        <RankInfo>
          <RankTitle>{p.queueType}</RankTitle>
          <RankTier>
            {p.tier === 'Unranked' ? p.tier : `${p.tier} ${p.rank}`}
          </RankTier>
          <RankScore>
            {p.winning_rate}% {p.leaguePoints}LP
          </RankScore>
          <span>
            <RankWin>{p.wins}승</RankWin> <RankLose>{p.losses}패</RankLose>
          </span>
        </RankInfo>
      </RankContainer>
    );
  });

  function renderRankCard() {
    return rankCard;
  }

  if (profileInfo.name) {
    setArray('summoners', profileInfo.name, profileInfo.profileIconId);
  }

  return (
    <ProfileCardContainer>
      <CardBody>
        <CardContent>
          <LeftCard>
            <ImgCenter>
              <a>
                <img
                  src={`${RIOT_CDN}/img/profileicon/${profileInfo.profileIconId}.png`}
                  style={{
                    width: '90px',
                    aspectRatio: 'auto 90 / 90',
                    height: '90px',
                    borderRadius: '50%',
                    verticalAlign: 'middle',
                    borderStyle: 'none',
                  }}
                ></img>
              </a>
            </ImgCenter>
            <NameCard>
              <NameText>{profileInfo.name}</NameText>
            </NameCard>
          </LeftCard>
          <RightCard>{renderRankCard()}</RightCard>
        </CardContent>
      </CardBody>
    </ProfileCardContainer>
  );
}

const ProfileCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.125);
`;

const CardBody = styled.div`
  padding: 1.88rem 1.81rem;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  // 768px
  ${props => props.theme.device.tabletM} {
    justify-content: space-between;
    flex-direction: row;
  }
`;

const LeftCard = styled.div`
  display: flex;
  align-items: center;
`;

const ImgCenter = styled.div`
  text-align: center;
`;

const NameCard = styled.div`
  display: flex;
  margin-left: 1rem;
  flex-direction: column;
`;

const NameText = styled.a`
  font-weight: 600;
  font-size: 16px;
  line-height: normal;
  color: #e4eaec;
  text-align: center;
`;

const RightCard = styled.div`
  display: flex;
  margin-left: 0;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid gray;
  flex-direction: column;

  // 475px
  ${props => props.theme.device.mobile} {
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    margin-top: 0;
    border-top: 0;
    padding-top: 0;
  }
`;

const RankContainer = styled.div`
  display: flex;

  &:last-child {
    margin-top: 20px;
    border-top: 1px solid gray;
    padding-top: 20px;
  }

  // 475px
  ${props => props.theme.device.mobile} {
    &:last-child {
      margin-top: 0;
      margin-left: 1.5rem;
      border-top: 0;
      padding-top: 0;
    }
  }
`;

const RankImgContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RankImg = styled.img`
  width: 90px;
  height: 90px;
  vertical-align: middle;
  border-style: none;
  // 475px
  ${props => props.theme.device.mobile} {
    width: 60px;
    height: 60px;
  }
`;

const RankInfo = styled.div`
  width: 120px;
  margin-left: 2rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  line-height: 1.5;
  font-weight: initial;
  color: #e4eaec;
  // 768px
  ${props => props.theme.device.mobile} {
    margin-left: 1rem;
  }
`;

const RankTitle = styled.span`
  font-size: 0.9rem;
`;

const RankTier = styled.span`
  margin-top: 0.25rem;
  color: #228882;
  font-weight: 700;
`;

const RankScore = styled.span``;

const RankWin = styled.span`
  color: green;
`;

const RankLose = styled.span`
  color: orange;
`;

export default ProfileCard;
