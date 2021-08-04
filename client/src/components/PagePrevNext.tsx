import React from 'react';
import styled from 'styled-components';

function PagePrevNext({ paginate }: any) {
  return (
    <RankingPaginationContainer>
      <RankingPagination>
        <RankingPaginationList>
          <RankingPaginationItem onClick={() => paginate(true, false)}>
            <RankingPaginationText>◀</RankingPaginationText>
          </RankingPaginationItem>
          <RankingPaginationItem onClick={() => paginate(false, true)}>
            <RankingPaginationText>▶</RankingPaginationText>
          </RankingPaginationItem>
        </RankingPaginationList>
      </RankingPagination>
    </RankingPaginationContainer>
  );
}
const RankingPaginationContainer = styled.div`
  width: 970px;
  margin: 0 auto;
`;

const RankingPagination = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const RankingPaginationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const RankingPaginationItem = styled.li`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 10px;

  &:first-child {
    margin-left: 0;
  }
`;

const RankingPaginationText = styled.button`
  display: block;
  cursor: pointer;
  width: 90px;
  padding: 4px 0 8px;
  border: solid 1px #cdd2d2;
  line-height: 16px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  color: #444b4b;
`;

export default PagePrevNext;
