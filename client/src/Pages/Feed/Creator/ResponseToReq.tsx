import styled from "styled-components";
import { FiUpload } from "react-icons/fi";
const Wrapper = styled.div`
  width: 70vw;
  min-height: 20vw;
  height: auto;
  max-height: 55vw;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 3vw;
  h2 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    padding-bottom: 0.5vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    text-align: center;
  }
`;
const CreateFeedForm = styled.form`
  width: 100%;
  height: auto;
  margin-top: 0.5vw;
  display: flex;
  flex-direction: column;
  label[for="publish_feed_btn"] {
    margin-top: 1vw;
    border: 1px solid ${(props) => props.theme.accentColor};
    padding: 1vw 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    span {
      color: ${(props) => props.theme.accentColor};
      transition: all 0.1s ease-in-out;
      font-weight: 600;
    }
    input[type="submit"] {
      display: none;
    }
  }
  label[for="publish_feed_btn"]:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.accentColor};
    span {
      color: white;
    }
  }
`;
const UploadImageContainer = styled.div`
  width: 100%;
  height: 23vw;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 2vw;
  label[for="upload_feed_image"] {
    width: 100%;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        font-size: 1.1vw;
        color: ${(props) => props.theme.accentColor};
        text-shadow: ${(props) => props.theme.textShadow};
      }
      svg {
        transition: all 0.1s ease-in-out;
        color: white;
        font-size: 4vw;
        background-color: rgba(241, 196, 15, 0.7);
        padding: 1vw;
        border-radius: 50%;
        margin-bottom: 0.5vw;
      }
    }
    div:hover {
      cursor: pointer;
      svg {
        background-color: ${(props) => props.theme.accentColor};
      }
    }
    input[type="file"] {
      display: none;
    }
  }
  #upload_image_container {
    margin-top: 1vw;
    height: 15vw;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: scroll;
    box-sizing: border-box;
    &::-webkit-scrollbar-thumb {
      background-color: rgba(241, 196, 15, 0.8);
      visibility: hidden;
      border-radius: 10px;
      transition: 0.2s ease-in-out;
    }
    &::-webkit-scrollbar {
      background-color: black;
      height: 5px;
      visibility: hidden;
      transition: 0.2s ease-in-out;
    }
    &:hover {
      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb {
        visibility: visible;
      }
    }
    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 150px;
        height: 100%;
        object-fit: cover;
      }
      img:hover {
        border: 1px solid white;
        cursor: pointer;
      }
    }
  }
`;
const MainImageSelectBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding-bottom: 1vw;
  h3 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  small {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1vw;
    padding-bottom: 0.5vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
  #selectd_img_box {
    width: 30%;
    height: 20vw;
    margin-top: 0.5vw;
    border-radius: 5px;
    img {
      border-radius: 5px;
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
`;
const FeedContent = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  small {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1vw;
    margin-bottom: 1vw;
  }
  textarea {
    background-color: black;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    border-radius: 10px;
    height: 10vw;
    color: white;
    padding: 1vw;
    margin-bottom: 1vw;
  }
  textarea:focus {
    outline: none;
  }
  span {
    color: white;
    font-size: 1vw;
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
function ResponseToReq() {
  return (
    <Wrapper>
      <h2>리퀘스트 응답하기</h2>
      <CreateFeedForm>
        <UploadImageContainer>
          <label htmlFor="upload_feed_image">
            <div>
              <FiUpload />
              <span>사진 / 영상</span>
            </div>
            <input id="upload_feed_image" type="file" />
          </label>
          <div id="upload_image_container">
            <div>
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
            </div>
          </div>
        </UploadImageContainer>
        <MainImageSelectBox>
          <h3>대표 이미지를 선택해주세요</h3>
          <small>
            업로드한 사진에서 대표 이미지를 선택해주세요. 대표이미지는{" "}
            <span>모자이크 이미지로 공개</span>됩니다
          </small>
          <div id="selectd_img_box">
            <img
              src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
              alt="test_image"
            />
          </div>
        </MainImageSelectBox>
        <FeedContent>
          <small>내용을 적어주세요 (선택)</small>
          <textarea id="feed_content_container" />
          <span>
            크리에이터는 구독자가 신청한 리퀘스트에 응답하면,{" "}
            <span>구독자가 설정한 코인을 획득</span>할 수 있습니다
          </span>
          <span>
            단, 반드시 <span> 리퀘스트 내용을 성실하게 충족</span>해주어야
            합니다
          </span>
        </FeedContent>
        <label htmlFor="publish_feed_btn">
          <span>리퀘스트 응답하기</span>
          <input id="publish_feed_btn" type="submit" />
        </label>
      </CreateFeedForm>
    </Wrapper>
  );
}

export default ResponseToReq;
