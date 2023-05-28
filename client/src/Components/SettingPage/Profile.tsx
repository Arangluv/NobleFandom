import styled from "styled-components";
import { BsCardImage } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1vw;
  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
const ProfileImageBox = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  div {
    width: 8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8vw;
    border-radius: 100%;
    border: 1px solid white;
    object-fit: cover;
    svg {
      color: white;
      width: 5vw;
      height: 5vw;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  label[for="profile_setting_image"] {
    /* border: 1px solid red; */
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1.5vw;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: white;
      width: 3vw;
      height: 3vw;
      opacity: 0.7;
    }
    input[id="profile_setting_image"] {
      display: none;
    }
  }
  label[for="profile_setting_image"]:hover {
    cursor: pointer;
  }
`;
const ProfileSettingBox = styled.div`
  padding-left: 3vw;
  width: 100%;
  height: 100%;
  label {
    margin-top: 1vw;
    display: flex;
    flex-direction: column;
    input[type="text"] {
      margin-top: 0.5vw;
      width: 50%;
      background-color: black;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      border-radius: 10px;
      padding: 0.8vw;
      color: white;
    }
    input:focus {
      outline: none;
      box-shadow: ${(props) => props.theme.textRedShadow};
    }
    textarea {
      margin-top: 0.5vw;
      width: 80%;
      min-height: 20vw;
      height: auto;
      background-color: black;
      border: 1px solid white;
      border-radius: 10px;
      color: white;
      padding: 0.8vw;
      box-shadow: ${(props) => props.theme.textShadow};
    }
    textarea:focus {
      outline: none;
      box-shadow: ${(props) => props.theme.textRedShadow};
    }

    span {
      color: white;
      font-size: 1vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
  input[type="submit"] {
    width: 80%;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    background-color: black;
    color: white;
    border-radius: 10px;
    padding: 1.5vw 0;
    font-size: 1.5vw;
    font-weight: 600;
    margin-top: 1vw;
    transition: all 0.2s ease-in-out;
  }
  input[type="submit"]:hover {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
  }
`;
interface DProps {
  username: string | undefined;
  userId: string | undefined;
  userDescription: string | undefined;
  profileImg: File;
}
function Profile() {
  const userLoginState = useRecoilValue(loginState);
  const { register, watch, setValue, formState, handleSubmit } =
    useForm<DProps>();
  useEffect(() => {
    setValue("username", userLoginState?.username);
    setValue("userId", userLoginState.userType);
  }, []);
  const onValid = async (data: DProps) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <SettingSubList>
      <form onSubmit={handleSubmit(onValid)}>
        <ProfileImageBox>
          <label htmlFor="profile_setting_image">
            <BsCardImage />
            <input
              {...register("profileImg")}
              id="profile_setting_image"
              type="file"
              accept="image"
            />
          </label>
          <div>
            {/* <img src="" alt="profile setting image" /> */}
            <FaUser />
          </div>
        </ProfileImageBox>
        <ProfileSettingBox>
          <label htmlFor="profile_username">
            <span>닉네임 {<small>하하하하</small>}</span>
            <input
              {...register("username", {
                required: "닉네임을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "닉네임은 최소 두글자 이상으로 해주세요",
                },
              })}
              id="profile_username"
              type="text"
              placeholder="닉네임"
            />
          </label>
          <label htmlFor="profile_user_id">
            <span>유저 ID</span>
            <input
              {...register("userId", {
                required: "사용할 ID를 입력해주세요",
                minLength: {
                  value: 4,
                  message: "ID는 최소 4글자 이상의 영어로 적어주세요",
                },
                maxLength: {
                  value: 20,
                  message: "ID는 20글자를 넘길 수 없습니다.",
                },
              })}
              id="profile_user_id"
              type="text"
              placeholder="유저 ID"
            />
          </label>
          <label htmlFor="profile_introduction">
            <span>자기소개</span>
            <textarea
              {...register("userDescription")}
              id="profile_introduction"
              placeholder="자신의 피드에 보여줄 자기소개를 적어주세요"
            />
          </label>
          <input type="submit" value="저장" />
        </ProfileSettingBox>
      </form>
    </SettingSubList>
  );
}

export default Profile;
