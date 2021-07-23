import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Loading = ({ types }: any) => (
  <Container>
    <LoadingBar color={'#ffffff'} type={types} height={500} width={200} />
  </Container>
);

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

const LoadingBar = styled(ReactLoading)`
  margin: 0 auto;
  margin-top: 8rem;
`;

export default Loading;
