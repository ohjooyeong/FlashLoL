import React from 'react';

import styled from 'styled-components';
import SummonerSearchForm from './SummonerSearchForm';
import logoImage from '../assets/flashlollogo2.png';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

function Header({ history }: RouteComponentProps) {
  return (
    <Sheader>
      <HeaderWrapper>
        <HeaderMainmenu>
          <LogoContainer>
            <Logo to="/">
              <LogoImg></LogoImg>
            </Logo>
          </LogoContainer>
          <MiddleContainer></MiddleContainer>
          <SearchContainer>
            <SearchContent>
              <SummonerSearchForm
                area={'Header'}
                history={history}
              ></SummonerSearchForm>
            </SearchContent>
          </SearchContainer>
        </HeaderMainmenu>
        <HeaderSubmenu>
          <SubmenuContainer>
            <SubmenuList>
              <SubmenuLi>
                <SubmenuTxt to="/ranking">소환사 랭킹</SubmenuTxt>
              </SubmenuLi>
            </SubmenuList>
          </SubmenuContainer>
        </HeaderSubmenu>
      </HeaderWrapper>
    </Sheader>
  );
}

const Sheader = styled.header`
  position: relative;
`;

const HeaderWrapper = styled.div`
  margin-top: 15px;
`;

const HeaderMainmenu = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1140px;
  margin: auto;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;

const HeaderSubmenu = styled.div`
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  margin-top: 15px;
  overflow: auto;
`;

const SubmenuContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1140px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
`;

const SubmenuList = styled.ul`
  display: flex;
  justify-content: flex-start;
  color: #fff;
  white-space: nowrap;
  margin-left: 20px;
  height: 100%;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubmenuLi = styled.li`
  display: flex;
  align-items: center;
  margin-left: 23px;
  margin-right: 23px;
  font-size: 14px;
  height: 85%;
`;

const SubmenuTxt = styled(Link)`
  height: 41px;
  padding-top: 16px;
  color: #d6d6d6;
  &:hover {
    cursor: pointer;
    border-bottom: 3px solid;
  }
`;

const LogoContainer = styled.div`
  flex: 1 0 140px;
`;

const Logo = styled(Link)`
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  cursor: pointer;
`;

const LogoImg = styled.img`
  display: block;
  max-height: 80px;
  margin: 0 auto;
  // 576px
  ${props => props.theme.device.tabletS} {
    max-height: 110px;
  }
`;

LogoImg.defaultProps = {
  src: logoImage,
};

const MiddleContainer = styled.div`
  text-align: center;
  flex: 0 1 auto;
  min-width: 0px;
  padding: 0;
  // 576px
  ${props => props.theme.device.tabletS} {
    padding: 0 24px;
  }
`;

const SearchContainer = styled.div`
  flex: 1 0 140px;
`;

const SearchContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  height: 100px;
`;

export default withRouter(Header);
