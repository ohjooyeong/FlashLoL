import React from 'react';

import styled from 'styled-components';
import { SummonerInfo, SummonerProfile } from '../api/summoner';

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
      <React.Fragment key={p.leagueId + p.queueType + i}>
        <RankImgContainer>
          <img
            style={{
              width: '60px',
              height: '60px',
              verticalAlign: 'middle',
              borderStyle: 'none',
            }}
            src={`/images/ranked-emblems/${p.tier}.png`}
          ></img>
        </RankImgContainer>
        <RankInfo>
          <RankTitle>{p.queueType}</RankTitle>
          <RankTier>
            {p.tier} {p.rank}
          </RankTier>
          <RankScore>
            {p.winning_rate}% {p.leaguePoints}LP
          </RankScore>
          <span>
            <RankWin>{p.wins}승</RankWin> <RankLose>{p.losses}패</RankLose>
          </span>
        </RankInfo>
      </React.Fragment>
    );
  });

  function renderRankCard() {
    if (profileData.length == 2) {
      return rankCard;
    }
    if (profileData.length == 0) {
      const rankArray: Array<string> = ['솔로랭크', '자유랭크'];
      const emptyRank = rankArray.map((p, i) => {
        return (
          <React.Fragment key={p + i + profileInfo.id}>
            <RankImgContainer>
              <img
                style={{
                  width: '60px',
                  height: '60px',
                  verticalAlign: 'middle',
                  borderStyle: 'none',
                }}
                src="/images/ranked-emblems/Unranked.png"
              ></img>
            </RankImgContainer>
            <RankInfo>
              <RankTitle>{p}</RankTitle>
              <RankTier>Unranked</RankTier>
              <RankScore>0% 0LP</RankScore>
              <span>
                <RankWin>0승</RankWin> <RankLose>0패</RankLose>
              </span>
            </RankInfo>
          </React.Fragment>
        );
      });
      return emptyRank;
    }

    if (profileData[0].queueType === '솔로랭크') {
      const emptyRank = (
        <React.Fragment
          key={profileData[0].queueType + profileData[0].leagueId + 1}
        >
          <RankImgContainer>
            <img
              style={{
                width: '60px',
                height: '60px',
                verticalAlign: 'middle',
                borderStyle: 'none',
              }}
              src="/images/ranked-emblems/Unranked.png"
            ></img>
          </RankImgContainer>
          <RankInfo>
            <RankTitle>자유랭크</RankTitle>
            <RankTier>Unranked</RankTier>
            <RankScore>0% 0LP</RankScore>
            <span>
              <RankWin>0승</RankWin> <RankLose>0패</RankLose>
            </span>
          </RankInfo>
        </React.Fragment>
      );
      rankCard.push(emptyRank);
      return rankCard;
    } else {
      const emptyRank = (
        <React.Fragment
          key={profileData[0].queueType + profileData[0].leagueId + 1}
        >
          <RankImgContainer>
            <img
              style={{
                width: '60px',
                height: '60px',
                verticalAlign: 'middle',
                borderStyle: 'none',
              }}
              src="/images/ranked-emblems/Unranked.png"
            ></img>
          </RankImgContainer>
          <RankInfo>
            <RankTitle>솔로랭크</RankTitle>
            <RankTier>Unranked</RankTier>
            <RankScore>0% 0LP</RankScore>
            <span>
              <RankWin>0승</RankWin> <RankLose>0패</RankLose>
            </span>
          </RankInfo>
        </React.Fragment>
      );
      rankCard.push(emptyRank);
      return rankCard.reverse();
    }
  }

  return (
    <ProfileCardContainer>
      <CardBody>
        <CardContent>
          <LeftCard>
            <ImgCenter>
              <a>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/11.14.1/img/profileicon/${profileInfo.profileIconId}.png`}
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
  justify-content: space-between;
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
`;

const RankImgContainer = styled.div`
  display: flex;
  margin-left: 1.5rem;
  align-items: center;
`;

const RankImg = styled.img`
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border-style: none;
`;

const RankInfo = styled.div`
  width: 100px;
  margin-left: 1rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  line-height: 1.5;
  font-weight: initial;
  color: #e4eaec;
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
