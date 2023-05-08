import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import TopRank from "../../../Components/TopRank";
import LowerRatingCard from "../../../Components/LowerRatingCard";
const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  background-color: black;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 1.5vw;
  border-left: 1px solid white;
  margin-left: 2vw;
`;
const SubWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1vw;
`;
const MenuBar = styled.div`
  display: flex;
  width: 100%;
  height: 5vw;
  #option_box {
    display: flex;
    align-items: center;
    width: 50%;
    height: 100%;
    ul {
      display: flex;
      width: 100%;
      a {
        color: white;
        text-shadow: ${(props) => props.theme.textShadow};
        margin-right: 1vw;
        transition: all 0.1s ease-in-out;
      }
      a:hover {
        color: ${(props) => props.theme.textRedColor};
        text-shadow: ${(props) => props.theme.textRedShadow};
        cursor: pointer;
      }
    }
  }
  #search_box {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    form {
      display: flex;
      width: 100%;
      input[type="text"] {
        width: 90%;
        height: 3vw;
        background-color: black;
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadow};
        color: white;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        padding: 1vw;
      }
      input[type="text"]:focus {
        outline: none;
      }
      label[for="creator_search"] {
        width: 20%;
        background-color: black;
        border: 1px solid white;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          color: white;
          width: 2vw;
          height: 2vw;
        }
        input[type="submit"] {
          display: none;
        }
      }
      label[for="creator_search"]:hover {
        cursor: pointer;
      }
    }
  }
`;
const SearchContentBox = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
`;
function Search() {
  return (
    <Wrapper>
      <SubWrapper>
        <MenuBar>
          <div id="option_box">
            <ul>
              <Link to="total">
                <li>인기순위💋</li>
              </Link>
              <Link to="week">
                <li>주간인기👀</li>
              </Link>
              <Link to="daily">
                <li>하루인기⚡️</li>
              </Link>
              <Link to="cardpost">
                <li>실시간게시글🔥</li>
              </Link>
            </ul>
          </div>
          <div id="search_box">
            <form action="">
              <input type="text" placeholder="닉네임 혹은 사용자 아이디" />
              <label htmlFor="creator_search">
                <AiOutlineSearch />
                <input id="creator_search" type="submit" value="검색" />
              </label>
            </form>
          </div>
        </MenuBar>
        <Outlet />
      </SubWrapper>
    </Wrapper>
  );
}

export default Search;
