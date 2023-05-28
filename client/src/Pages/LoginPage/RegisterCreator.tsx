import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import SideBar from "../../Components/SideBar";
import {
  AiFillPlusCircle,
  AiOutlineCheck,
  AiFillMinusCircle,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import BASE_URL from "../../url";
import uuid from "react-uuid";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  height: 250vh;
  width: 100%;
  background-color: black;
  display: flex;
`;
const SubWrapper = styled.div`
  width: 75%;
  border-left: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) => props.theme.textShadow};
  div {
    margin-top: 5vw;
    width: 80%;
    h2 {
      font-size: 2vw;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 2vw;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      #extra_error {
        margin-top: 4vw;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        small {
          font-weight: 600;
          font-size: 1.2vw;
          color: ${(props) => props.theme.textRedColor};
        }
      }
      label {
        margin-top: 1vw;
        color: white;
        text-shadow: ${(props) => props.theme.textShadow};
        display: flex;
        flex-direction: column;
        span {
          display: flex;
          align-items: center;
          small {
            text-shadow: none;
            margin-left: 2vw;
            color: ${(props) => props.theme.textRedColor};
            font-size: 1.1vw;
          }
        }
        input {
          border: 1px solid white;
          background-color: black;
          color: white;
          box-shadow: ${(props) => props.theme.textShadow};
          margin-top: 1vw;
          padding: 1vw 1.2vw;
          border-radius: 10px;
        }
        input::placeholder {
          color: white;
          text-shadow: ${(props) => props.theme.textShadow};
        }

        input:focus {
          outline: none;
          border-color: ${(props) => props.theme.accentColor};
        }
      }

      hr {
        border: 0.1px solid rgba(255, 255, 255, 0.4);
        margin-top: 4vw;
        box-shadow: ${(props) => props.theme.textShadow};
      }
      input[id="creator_phoneNumber_verification"] {
        width: 80%;
      }

      label[for="creator_phoneNumber_verification"] {
        div {
          margin-top: 1vw;
          width: 100%;
          display: flex;
          align-items: center;
          input {
            margin-top: 0;
            padding: 2vw;
            border-right: none;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
          }
        }
        button {
          width: 20%;
          color: white;
          box-sizing: border-box;
          font-weight: 600;
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadow};
          padding: 2vw 0;
          background-color: rgba(85, 239, 196, 0.9);
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
      label[for="creator_sns"] {
        div {
          height: 60px;
          margin-top: 1vw;
          width: 100%;
          display: flex;
          align-items: center;
        }
        select {
          height: 100%;
          width: 50%;
          background-color: black;
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadow};
          color: white;
          padding: 1.5vw;
          /* border-right: none; */
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        select:hover {
          cursor: pointer;
        }
        select:focus {
          outline: none;
        }
        input {
          height: 100%;
          width: 40%;
          margin-top: 0;
          padding: 1.5vw;
          border-radius: 0;
          border-left: none;
        }
        button {
          width: 10%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5vw;
          background-color: black;
          border: 1px solid white;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          box-shadow: ${(props) => props.theme.textShadow};
          box-sizing: border-box;
          svg {
            color: rgba(85, 239, 196, 0.9);
            font-size: 2vw;
          }
          #minus_circle {
            color: ${(props) => props.theme.textRedColor};
          }
        }
        button:hover {
          cursor: pointer;
        }
      }
      label[for="creator_evidence"] {
        div {
          display: flex;
          margin-top: 0;
          align-items: center;
          span {
            #evidence_require_notice {
              color: ${(props) => props.theme.textRedColor};
              font-size: 1.1vw;
              text-shadow: none;
            }
          }
        }
        #upload_span {
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadow};
          border-radius: 10px;
          width: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1vw;
          transition: 0.1s ease-in-out;
        }
        #upload_span:hover {
          box-shadow: #fbc531 0px 0px 15px;
        }
        #upload_description {
          color: white;
          font-size: 1.1vw;
          margin-top: 1vw;
          text-shadow: ${(props) => props.theme.textShadow};
        }
      }
      .image_container {
        width: 100%;
        margin-top: 1vw;
        display: flex;
        justify-content: center;
        overflow-x: scroll;
        article {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid white;
          box-shadow: ${(props) => props.theme.textShadow};
          border-radius: 10px;
          overflow-x: scroll;
          #evidence_image_box {
            margin-top: 0;
            width: 300px;
            height: 100%;
            display: flex;
            position: relative;
            svg {
              position: absolute;
              top: 0.5vw;
              right: 0.5vw;
              z-index: 999;
              color: ${(props) => props.theme.textRedColor};
              font-size: 1.5vw;
            }
            img {
              object-fit: cover;
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
        }
      }
      input[type="submit"] {
        width: 100%;
        margin-top: 5vw;
        background-color: white;
        box-shadow: #fbc531 0px 0px 10px;
        background-color: black;
        color: white;
        padding: 1.5vw;
        font-size: 1.5vw;
        font-weight: 600;
        border: 1px solid white;
        border-radius: 20px;
        text-shadow: 0 4px 4px #000;
        transition: 0.1s ease-in-out;
      }
      input[type="submit"]:hover {
        box-shadow: #fbc531 0px 0px 15px;
      }
    }
  }
`;
const ImageContainer = styled.div`
  height: 50vh;
`;
const TermsContainer = styled.div<ITerms>`
  &.termsContiner {
    display: flex;
    margin-top: 2vw;
    flex-direction: column;
    width: 100%;
    height: 10vh;
  }
  .checkbox_container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 5vh;
    margin-top: 0;
    padding-top: 0;
    span {
      display: flex;
      align-items: center;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    label {
      display: flex;
      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 2vw 1vw;
      border-radius: 10px;
      margin-top: 0;
      transition: all 0.2s ease-in-out;
      background-color: rgba(255, 255, 255, 0.1);
      border: ${(props) =>
        props.termsCheck ? `1px solid ${props.theme.accentColor}` : "none"};
      span {
        color: ${(props) =>
          props.termsCheck ? props.theme.accentColor : "white"};
      }
      svg {
        font-size: 1.8vw;
        color: ${(props) =>
          props.termsCheck ? props.theme.accentColor : "white"};
      }
      input[type="checkbox"] {
        display: none;
      }
    }
    label:hover {
      cursor: pointer;
    }
  }
  .service_terms_descrition {
    width: 100%;
    margin-top: 2vw;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    padding: 1vw;
    border-radius: 10px;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
`;
const OverlayBox = styled.div`
  width: 15vw;
  height: 15vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface ITerms {
  termsCheck: boolean;
}
interface IData {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  certification: boolean;
  snsInfo: SnsProps[];
  terms: boolean;
  evidence_file: FileList;
  extraError?: string;
}
interface SnsProps {
  sns_account: string;
  sns_id: string;
}
function RegisterCreator() {
  const [loading, setLoading] = useState(false);
  const [snsInfoKey, setSnsInfoKey] = useState<[] | string[]>([]);
  const [termsCheck, setTermsCheck] = useState(false);
  const [imagesFiles, setImagesFile] = useState<null | FileList | File[]>(null);
  const [imagesUrl, setImagesUrl] = useState<[] | string[]>([]);
  const {
    register,
    watch,
    setValue,
    formState,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<IData>();
  const location = useLocation();
  useEffect(() => {
    const filesLength = imagesFiles?.length;
    if (!imagesFiles) {
      return;
    }
    if (filesLength) {
      let previews = [];
      for (let i = 0; i < filesLength; i++) {
        previews.push(URL.createObjectURL(imagesFiles[i]));
      }
      setImagesUrl([...previews]);
      clearErrors("evidence_file");
    }
    return () => {
      for (let i = 0; i < imagesUrl.length; i++) {
        URL.revokeObjectURL(imagesUrl[i]);
      }
    };
  }, [imagesFiles]);
  const navigator = useNavigate();
  const onVaild = async (data: IData) => {
    setLoading(true);
    if (data.password !== data.passwordConfirm) {
      setError(
        "password",
        { message: "비밀번호가 다릅니다" },
        { shouldFocus: true }
      );
      setLoading(false);
      return;
    }
    if (data.username.trim() === "") {
      setError(
        "username",
        { message: "공백으로만 이뤄질 수 없습니다" },
        { shouldFocus: true }
      );
      setLoading(false);
      return;
    }
    if (!imagesFiles || imagesFiles.length === 0) {
      setError("evidence_file", {
        message: "반드시 하나 이상의 증빙자료를 제출해주세요",
      });
      setLoading(false);
      return;
    }
    data.snsInfo.forEach((info, idx) => {
      if (!info.sns_id) {
        setError(`snsInfo.${idx}.sns_id`, {
          message: "누락된 SNS id가 있습니다",
        });
        setLoading(false);
        return;
      }
    });
    const formData = new FormData();
    let postData = null;
    if (location.state === null) {
      postData = {
        email: data.email,
        password: data.password,
        username: data.username,
        userId: uuid().split("-")[0],
        snsInfo: data.snsInfo,
      };
    } else {
      postData = {
        email: data.email,
        password: data.password,
        username: data.username,
        userId: location.state.userId,
        snsInfo: data.snsInfo,
      };
    }

    formData.append("data", JSON.stringify(postData));
    for (let i = 0; i < imagesFiles.length; i++) {
      formData.append("evidence_file", imagesFiles[i]);
    }
    try {
      await axios({
        method: "POST",
        url: `${BASE_URL}/creator-register`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        withCredentials: true,
      });
      navigator("/", { replace: true });
      setLoading(false);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      setError("extraError", {
        message: error?.response?.data?.message,
      });
      setLoading(false);
    }
  };
  const handleImageDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetDeleteIndexNumber = Number(event.currentTarget.dataset.idx);
    if (!imagesFiles) {
      return;
    }
    const fileArray = Array.from(imagesFiles); // FileList는 유사 배열이기에 filter 불가
    setImagesFile([
      ...fileArray.filter((file, idx) => idx !== targetDeleteIndexNumber),
    ]);
    URL.revokeObjectURL(imagesUrl[targetDeleteIndexNumber]);
    setImagesUrl(
      imagesUrl.filter((url) => url !== event.currentTarget.dataset.url)
    );
  };
  useEffect(() => {
    // sns Infomation handling part
    if (snsInfoKey.length === 0) {
      // 초기 랜러딩시 빈 배열이므로 uuid값을 하나 푸쉬한다
      setSnsInfoKey([uuid().split("-")[0]]);
    }
  }, [snsInfoKey]);
  const handlePlusClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const newInfo = [...snsInfoKey, uuid().split("-")[0]];
    setSnsInfoKey([...newInfo]);
  };
  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const deleteTargetKey = event.currentTarget.dataset.key;
    const targetKeyIndex = snsInfoKey.findIndex(
      (key) => key === deleteTargetKey
    );
    const newSnsInfoKey = snsInfoKey.filter(
      (value, idx) => idx !== targetKeyIndex
    );
    watch("snsInfo").splice(targetKeyIndex, 1);
    setSnsInfoKey([...newSnsInfoKey]);
  };
  useEffect(() => {
    if (location.state === null) {
      return;
    }
    setValue("email", location.state.email);
    setValue("username", location.state.username);
    setValue("password", "********");
    setValue("passwordConfirm", "********");
  }, []);
  return (
    <>
      <Wrapper>
        <SideBar />
        <SubWrapper>
          <div>
            <h2>크리에이터 신청하기</h2>
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(onVaild)}
            >
              <label htmlFor="creator_email">
                <span>
                  이메일
                  {formState.errors?.email ? (
                    <small>{formState.errors.email.message}</small>
                  ) : null}
                </span>
                <input
                  {...register("email", {
                    required: "이메일을 입력해주세요",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "이메일 형식이어야 합니다",
                    },
                  })}
                  onFocus={() => clearErrors("extraError")}
                  id="creator_email"
                  type="text"
                  placeholder="이메일"
                  disabled={location.state !== null}
                />
              </label>
              <label htmlFor="creator_username">
                <span>
                  닉네임
                  {formState.errors?.username ? (
                    <small>{formState.errors.username.message}</small>
                  ) : null}
                </span>
                <input
                  {...register("username", {
                    required: "닉네임을 입력해주세요",
                    minLength: {
                      value: 2,
                      message: "닉네임은 최소 두글자 이상으로 해주세요",
                    },
                  })}
                  onFocus={() => clearErrors("extraError")}
                  id="creator_username"
                  type="text"
                  placeholder="닉네임"
                  disabled={location.state !== null}
                />
              </label>
              <label htmlFor="creator_password">
                <span>
                  비밀번호
                  {formState.errors?.password ? (
                    <small>{formState.errors.password.message}</small>
                  ) : null}
                </span>
                <input
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    minLength: {
                      value: 5,
                      message: "비밀번호는 최소 5자리 이상입니다",
                    },
                  })}
                  id="creator_password"
                  type="password"
                  placeholder="비밀번호"
                  disabled={location.state !== null}
                />
              </label>
              <label htmlFor="creator_password_verification">
                <span>
                  비밀번호 확인
                  {formState.errors?.passwordConfirm ? (
                    <small>{formState.errors.passwordConfirm.message}</small>
                  ) : null}
                </span>
                <input
                  {...register("passwordConfirm", {
                    required: "비밀번호 확인란을 입력해주세요",
                    minLength: {
                      value: 5,
                      message: "비밀번호는 최소 5자리 이상입니다",
                    },
                  })}
                  id="creator_password_verification"
                  type="password"
                  placeholder="비밀번호 확인"
                  disabled={location.state !== null}
                />
              </label>
              <hr />
              <label htmlFor="creator_phoneNumber_verification">
                <span>
                  본인인증
                  {formState.errors?.certification ? (
                    <small>{formState.errors.certification.message}</small>
                  ) : null}
                </span>
                <div>
                  <input
                    {...register("certification", {
                      required: "본인인증을 해주세요",
                    })}
                    id="creator_phoneNumber_verification"
                    type="text"
                    placeholder="이름"
                  />
                  <button>Verify</button>
                </div>
              </label>
              <label htmlFor="creator_sns">
                <span>
                  사용중인 SNS 계정
                  {formState.errors?.snsInfo ? (
                    <small>
                      {formState.errors?.snsInfo[0]?.sns_id?.message}
                    </small>
                  ) : null}
                </span>
                {snsInfoKey.map((keyValue, idx) => {
                  return (
                    <div key={keyValue}>
                      <select
                        {...register(`snsInfo.${idx}.sns_account`, {
                          required: "사용중인 sns계정을 골라주세요",
                        })}
                        id="seleted_sns"
                      >
                        <option value="insta">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="Twitter">Twitter</option>
                        <option value="youtube">Youtube</option>
                        <option value="tictok">Tictok</option>
                        <option value="Twitch">Twitch</option>
                        <option value="etc">기타</option>
                      </select>
                      <input
                        {...register(`snsInfo.${idx}.sns_id`, {
                          required: "이용중인 sns계정 id를 입력해주세요",
                        })}
                        id="creator_sns"
                        type="text"
                        placeholder="ID"
                      />
                      {snsInfoKey.length === 1 ? (
                        <button onClick={handlePlusClick}>
                          <AiFillPlusCircle />
                        </button>
                      ) : snsInfoKey.length === idx + 1 ? (
                        <button onClick={handlePlusClick}>
                          <AiFillPlusCircle />
                        </button>
                      ) : (
                        <button onClick={handleDeleteClick} data-key={keyValue}>
                          <AiFillMinusCircle id="minus_circle" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </label>
              <label htmlFor="creator_evidence">
                <div>
                  <span id="upload_span">증빙자료 업로드</span>
                  <span id="evidence_require_notice">
                    {formState.errors?.evidence_file ? (
                      <small>{formState.errors?.evidence_file?.message}</small>
                    ) : null}
                  </span>
                </div>
                <input
                  {...register("evidence_file", {
                    required: "증빙자료를 한개이상 업로드해주세요",
                  })}
                  onChange={(event) => setImagesFile(event.currentTarget.files)}
                  id="creator_evidence"
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <small id="upload_description">
                  해당 계정의 소유자임을 증빙할 수 있는 스크린샷을 첨부해주세요.
                  (ex. 설정 화면)
                </small>
              </label>
              <ImageContainer className="image_container">
                <article>
                  {imagesUrl
                    ? imagesUrl.map((url, idx) => (
                        <div
                          key={url}
                          id="evidence_image_box"
                          data-url={url}
                          data-idx={idx}
                          onClick={handleImageDelete}
                        >
                          <TiDeleteOutline />
                          <img src={url} alt="evidence image" />
                        </div>
                      ))
                    : null}
                </article>
              </ImageContainer>
              <TermsContainer className="termsContiner" termsCheck={termsCheck}>
                <div className="checkbox_container">
                  <label htmlFor="service_terms">
                    <span>
                      이용약관
                      {formState.errors?.terms ? (
                        <small>{formState.errors?.terms?.message}</small>
                      ) : null}
                    </span>
                    <AiOutlineCheck />
                    <input
                      {...register("terms", {
                        required: "이용약관에 동의해주세요",
                      })}
                      id="service_terms"
                      type="checkbox"
                      onClick={() => setTermsCheck((pre) => !pre)}
                    />
                  </label>
                </div>
                <div className="service_terms_descrition">
                  <span>
                    서비스의 이용약관 및 개인정보처리방침을 확인 후 동의하며,
                    19세 이상입니다.
                  </span>
                </div>
              </TermsContainer>
              {formState.errors.extraError ? (
                <div id="extra_error">
                  <small>{formState.errors.extraError.message}</small>
                </div>
              ) : null}
              <input
                type="submit"
                value="크리에이터 신청하기"
                disabled={loading}
              />
            </form>
          </div>
        </SubWrapper>
      </Wrapper>
      {loading ? (
        <Overlay>
          <OverlayBox>
            <HashLoader color="#f1c40f" loading={loading} />
          </OverlayBox>
        </Overlay>
      ) : null}
    </>
  );
}

export default RegisterCreator;
