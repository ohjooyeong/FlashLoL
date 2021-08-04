import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useLocation, withRouter } from 'react-router';
import querystring from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { getSummonerRankingAsync } from '../../modules/ranking';
import { RootState } from '../../modules';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SummonerRankCard from '../../components/SummonerRankCard';
import PagePrevNext from '../../components/PagePrevNext';
import { Helmet } from 'react-helmet';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

function SummonerRankingPage({ history }: RouteComponentProps) {
  const location = useLocation();
  const sch = location.search;
  const querydata = querystring.parse(sch);
  const page = querydata.page;
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.ranking.summonerRanking,
  );

  useEffect(() => {
    dispatch(getSummonerRankingAsync.request(page));
  }, [page]);

  const getPageHandler = (prev: boolean, next: boolean) => {
    if (data && data.page <= 1 && prev) {
      return history.push(`/ranking?page=${data.page}`);
    }
    if (data && prev) return history.push(`/ranking?page=${data.page - 1}`);
    if (data && next) return history.push(`/ranking?page=${data.page + 1}`);
  };

  return (
    <>
      <Helmet>
        <title>소환사 랭킹</title>
      </Helmet>
      <RContainer>
        <PageHeaderWrap>
          <Menu>
            <MenuList>
              <Item>
                <ItemText to="#">랭킹</ItemText>
              </Item>
            </MenuList>
          </Menu>
          <PageDescription>
            <PageDescriptionText>
              랭킹은 마스터 이상 소환사만 표시. 랭킹은 주기적으로 갱신됩니다.
            </PageDescriptionText>
          </PageDescription>
        </PageHeaderWrap>

        <PagePrevNext paginate={getPageHandler}></PagePrevNext>

        <ContentWrap>
          <Content>
            <RankingTable>
              <RankingColGroup>
                <col width="100" />
                <col width="230" />
                <col width="140" />
                <col width="110" />
                <col width="248" />
              </RankingColGroup>
              <thead>
                <tr>
                  <RankingTableHeader></RankingTableHeader>
                  <RankingTableHeader>소환사</RankingTableHeader>
                  <RankingTableHeader>티어</RankingTableHeader>
                  <RankingTableHeader>점수</RankingTableHeader>
                  <RankingTableHeader>승률</RankingTableHeader>
                </tr>
              </thead>
              {loading ? (
                <PageHeaderWrap>
                  <Loading types={'spin'}></Loading>
                </PageHeaderWrap>
              ) : error ? (
                <PageHeaderWrap>
                  <Error error={error} />
                </PageHeaderWrap>
              ) : (
                <>
                  <tbody>
                    {data &&
                      data.summonerRankData.map((rank, i) => (
                        <tr key={rank.summonerId + i}>
                          <RankingTableCellRank>
                            {i + (data.page - 1) * 50 + 1}
                          </RankingTableCellRank>
                          <SummonerRankCard rankData={rank}></SummonerRankCard>
                        </tr>
                      ))}
                  </tbody>
                </>
              )}
            </RankingTable>
          </Content>
        </ContentWrap>
        <PagePrevNext paginate={getPageHandler}></PagePrevNext>
      </RContainer>
    </>
  );
}
//100 230 90 90 90 198

const RContainer = styled.div`
  position: relative;
  min-height: 700px;
  padding-bottom: 120px;
`;

const PageHeaderWrap = styled.div`
  padding-top: 28px;
  width: 970px;
  margin: 0 auto;
`;

const Menu = styled.div`
  position: relative;
  margin: 0 0 17px;
  border-bottom: 1px solid #000;
`;

const MenuList = styled.ol`
  width: 970px;
  margin: 0 auto;
  padding: 0;
`;

const Item = styled.div`
  display: inline-block;
  margin: 0 30px -1px 0;
  padding: 0;
  border-bottom: 1px solid transparent;
  vertical-align: middle;
  border-color: #f2f2f2;
`;

const ItemText = styled(Link)`
  font-weight: bold;
  display: block;
  color: #f2f2f2;
  font-size: 28px;
  line-height: 32px;
  text-decoration: none;
  letter-spacing: -1px;
  padding-bottom: 17px;
`;

const PageDescription = styled.div`
  height: 100%;
`;

const PageDescriptionText = styled.small`
  float: right;
  color: #f2f2f2;
  font-size: 12px;
  margin-bottom: 20px;
`;

const ContentWrap = styled.div``;

const Content = styled.div`
  width: 970px;
  margin: 0 auto;
  min-height: 2742px;
`;

const RankingTable = styled.table`
  width: 100%;
  table-layout: fixed;
  background-color: #ededed;
  border: solid 1px #cdd2d2;
  border-collapse: collapse;
  border-spacing: 0;
  min-height: 2742px;
`;

const RankingColGroup = styled.colgroup`
  display: table-column-group;
`;

const RankingTableHeader = styled.th`
  height: 41px;
  padding: 0;
  border-bottom: 1px solid #cdd2d2;
  background: #f2f2f2;
  line-height: 17px;
  font-size: 14px;
  text-align: left;
  color: #444b4b;
  font-weight: normal;
`;

const RankingTableCellRank = styled.td`
  border-bottom: 1px solid #cdd2d2;
  height: 54px;
  line-height: 16px;
  font-size: 14px;
  text-align: center;
  color: #444b4b;
`;

export default withRouter(SummonerRankingPage);
