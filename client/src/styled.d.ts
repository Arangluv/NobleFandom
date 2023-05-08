import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    textShadow: string;
    textShadowThin: string;
    boxShadow: string;
    textRedShadow: string;
    textBlackShadow: string;
    textRedColor: string;
    small: string;
    medium: string;
    large: string;
  }
}
