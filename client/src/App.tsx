import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Routers from "./Routers";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
