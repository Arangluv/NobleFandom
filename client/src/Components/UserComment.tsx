import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 4vw;
  height: auto;
  display: flex;
  margin-bottom: 0.2vw;
`;
const UserProfile = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  div {
    margin-top: 0.2vw;
    width: 3vw;
    height: 3vw;
    border-radius: 100%;
    object-fit: contain;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  div:hover {
    cursor: pointer;
  }
`;
const UserCommentBox = styled.div`
  width: 90%;
  height: auto;
  padding-top: 0.2vw;
  display: flex;
  & > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    color: white;
    height: 100%;
    min-width: 15%;
    width: auto;
    padding-top: 0;
    span:nth-child(2) {
      font-size: 1vw;
      color: rgba(255, 255, 255, 0.5);
    }
    #comment_user_name {
      font-size: 1.1vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    #comment_user_name:hover {
      cursor: pointer;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    height: auto;
    width: 85%;
    p {
      color: white;
      font-size: 1vw;
    }
  }
`;
interface IProps {
  imgSrc: string;
  comment: string;
}
function UserComment(temp: IProps) {
  const [comment, setCommnet] = useState("");
  useEffect(() => {
    if (temp.comment.length > 60) {
      setCommnet(temp.comment.slice(0, 57) + "...");
    } else {
      setCommnet(temp.comment);
    }
  }, []);
  return (
    <Wrapper>
      <UserProfile>
        <div>
          <img src={temp.imgSrc} alt="" />
        </div>
      </UserProfile>
      <UserCommentBox>
        <div>
          <span id="comment_user_name">귀여운아랑씨</span>
          <span>2일전</span>
        </div>
        <div>
          <p>{temp.comment}</p>
        </div>
      </UserCommentBox>
    </Wrapper>
  );
}

export default UserComment;
