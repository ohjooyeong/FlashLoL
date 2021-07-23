import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Error({ error }: any) {
  const [ErrorText, setErrorText] = useState('소환사를 찾을 수 없습니다.');
  useEffect(() => {
    if (error.message !== 'Request failed with status code 404') {
      setErrorText('알 수 없는 오류가 발생했습니다. 다시 한번 검색해주세요');
    }
  });
  return (
    <EContainer>
      <EWrapper>
        <TextContainer>
          <img
            src="https://poro.gg/images/icon/no-data-poro.png"
            alt="PORO"
            style={{ width: '120px' }}
          ></img>
          <h2>검색 결과가 없습니다.</h2>
          <div>{ErrorText}</div>
        </TextContainer>
      </EWrapper>
    </EContainer>
  );
}

const EContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

const EWrapper = styled.div`
  width: 100%;
  padding-left: 0.46875rem;
  padding-right: 0.46875rem;
  margin-right: auto;
  margin-left: auto;
  margin: auto;
  padding: 2rem 0.445rem;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6e6;
  background-color: #171717;
  padding: 40px 0;
  flex-direction: column;
  color: #fff;
`;

export default Error;
