import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Routers from "./Routers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routers />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
