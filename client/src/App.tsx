import React from 'react';
import Router from './routes/Router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
a{
		text-decoration: none;
		color: inherit;
	}
	*{
		box-sizing: border-box;
	}
  body {
    font-size:14px;
    width: 100%;
		height: 100%;
    line-height: 1.43;
    background-color: #737373;
    padding: 0;
    margin: 0;
  }
`;

export default App;
