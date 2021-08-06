import { DefaultTheme } from 'styled-components';

const size = {
  mobile: '475px',
  tabletS: '576px',
  tabletM: '768px',
  tabletL: '992px',
  laptop: '1200px',
};

const device = {
  mobile: `@media (min-width: ${size.mobile})`,
  tabletS: `@media (min-width: ${size.tabletS})`,
  tabletM: `@media (min-width: ${size.tabletM})`,
  tabletL: `@media (min-width: ${size.tabletL})`,
  laptop: `@media (min-width: ${size.laptop})`,
};

const theme: DefaultTheme = {
  device,
};

export default theme;
