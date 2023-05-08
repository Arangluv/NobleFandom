import styled from "styled-components";
import { Outlet } from "react-router-dom";
import CreatorSideBar from "../../Components/CreatorSideBar";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: black;
  display: flex;
`;

function FeedMain() {
  return (
    <Wrapper>
      <CreatorSideBar />
      <Outlet />
    </Wrapper>
  );
}

export default FeedMain;
