import styled from "styled-components";
import { HashLoader } from "react-spinners";
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OverlayBox = styled.div`
  width: 10vw;
  height: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface IProps {
  isLoading: boolean;
}
function LoadingOverlay({ isLoading }: IProps) {
  return (
    <Overlay>
      <OverlayBox>
        <HashLoader color="#f1c40f" loading={isLoading} />
      </OverlayBox>
    </Overlay>
  );
}

export default LoadingOverlay;
