import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

function Footer() {
  return (
    <FlashFooter>
      <Container>
        <div>
          <CopyRight>
            @ Flash LoL. 2021 ~ {moment().format('YYYY')} Made By OhJooYeong.
            All Rights Reserved.
          </CopyRight>
        </div>
        <div>
          <CopyRight>이메일 brb1111@naver.com</CopyRight>
        </div>
        <div>
          <CopyRightLink>
            <a
              href="https://github.com/ohjooyeong"
              target="_blank"
              rel="noreferrer"
            >
              깃허브 ohjooyeong
            </a>
          </CopyRightLink>
        </div>
      </Container>
    </FlashFooter>
  );
}

const FlashFooter = styled.footer`
  margin-top: 60px;
  padding: 24px;
`;

const Container = styled.section`
  max-width: 960px;
  width: 100%;
  padding: 20px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`;

const CopyRight = styled.span`
  font-weight: 600;
  color: white;
`;

const CopyRightLink = styled.span`
  font-weight: 600;
  color: white;
  &:hover {
    border-bottom: 1px solid white;
  }
`;

export default Footer;
