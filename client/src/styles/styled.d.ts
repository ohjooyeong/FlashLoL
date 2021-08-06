import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    device: {
      mobile: string;
      tabletS: string;
      tabletM: string;
      tabletL: string;
      laptop: string;
    };
  }
}
