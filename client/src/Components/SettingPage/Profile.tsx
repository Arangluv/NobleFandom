import styled from "styled-components";
import { BsImageFill } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../../atoms/atoms";
import { useMutation } from "@tanstack/react-query";
import { postEditProfile } from "../../api/user/usesApi";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
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
const ImageModefyContainer = styled.div`
  width: 100%;
  height: 30vw;
`;
const BackgroundContainer = styled.div`
  width: 100%;
  height: 70%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  label[for="profile_background_image"] {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &:hover {
      cursor: pointer;
    }
    span {
      color: rgba(255, 255, 255, 0.3);
      font-size: 1.2vw;
      margin-top: 0.5vw;
    }
    svg {
      color: rgba(255, 255, 255, 0.3);
      font-size: 3vw;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    input {
      display: none;
    }
  }
`;
const ProfileContainer = styled.div`
  width: 100%;
  height: 20%;
  position: relative;
  display: flex;
  justify-content: center;
  label[for="profile_image"] {
    width: 7vw;
    height: 7vw;
    border: 3px solid white;
    border-radius: 100%;
    position: absolute;
    background-color: black;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -3.5vw;
    &:hover {
      cursor: pointer;
    }
    svg {
      color: rgba(255, 255, 255, 0.3);
      font-size: 3vw;
    }
    input {
      display: none;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
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
      small {
        margin-left: 1vw;
        color: ${(props) => props.theme.textRedColor};
        text-shadow: none;
      }
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
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const OverlayBox = styled.div`
  width: 10vw;
  height: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface DProps {
  username: string | undefined;
  userId: string | undefined;
  userDescription: string | undefined;
  profileImg: FileList | undefined;
  backgroundImg: FileList | undefined;
}

function Profile() {
  const [userLoginState, setUserLoginState] = useRecoilState(loginState);
  const navigator = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: postEditProfile,
    onSuccess: (data) => {
      const newLoginState = {
        userType: userLoginState.userType,
        email: userLoginState.email,
        username: data.data.username,
        userId: data.data.userId,
        backGroundImg: data.data.backgroundImg,
        profileImg: data.data.profileImg,
        profileDescription: data.data.profileDescription,
        socialOnly: data.data.socialOnly,
      };
      setUserLoginState({ ...newLoginState });
      toast.success("프로필 수정을 완료하였습니다");
      navigator("/main");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const [profileImgPreview, setProfileImgPreview] = useState<
    null | string | undefined
  >(null);
  const [backgroundImgPreview, setBackgroundImgPreview] = useState<
    null | string | undefined
  >(null);
  const { register, watch, setValue, formState, handleSubmit } =
    useForm<DProps>();
  useEffect(() => {
    setValue("username", userLoginState?.username);
    setValue("userId", userLoginState.userId);
    setValue("userDescription", userLoginState.profileDescription);
    setProfileImgPreview(userLoginState.profileImg);
    setBackgroundImgPreview(userLoginState.backGroundImg);
  }, []);
  // Background Img preview handdling
  useEffect(() => {
    const backgroundFile = watch("backgroundImg");
    if (backgroundFile?.length === 0) {
      return;
    }

    if (!backgroundFile) {
      return;
    }
    const backgroundUrl = URL.createObjectURL(backgroundFile[0]);
    setBackgroundImgPreview(backgroundUrl);
    return () => URL.revokeObjectURL(backgroundUrl);
  }, [watch("backgroundImg")]);
  // Profile Img Preview handling
  useEffect(() => {
    const profileFile = watch("profileImg");
    if (profileFile?.length === 0) {
      return;
    }
    if (!profileFile) {
      return;
    }
    const profileUrl = URL.createObjectURL(profileFile[0]);
    setProfileImgPreview(profileUrl);

    return () => URL.revokeObjectURL(profileUrl);
  }, [watch("profileImg")]);
  const onValid = async (data: DProps) => {
    const formData = new FormData();
    let isDirty = false;
    if (data.username !== userLoginState.username) {
      isDirty = true;
    }

    if (data.userId !== userLoginState.userId) {
      isDirty = true;
    }
    let deleteProfileImage = null;
    let deleteBackgroundImage = null;

    if (profileImgPreview !== userLoginState.profileImg) {
      deleteProfileImage = userLoginState.profileImg;
    }

    if (backgroundImgPreview !== userLoginState.backGroundImg) {
      deleteBackgroundImage = userLoginState.backGroundImg;
    }
    const editData = {
      username: data.username,
      userId: data.userId,
      userDescription: data.userDescription,
      userType: userLoginState.userType,
      email: userLoginState.email,
      isDirty,
      deleteProfileImage,
      deleteBackgroundImage,
    };
    formData.append("data", JSON.stringify(editData));

    if (data.profileImg?.length !== 0 && data.profileImg !== undefined) {
      formData.append("user_profile", data.profileImg[0]);
    }

    if (data.backgroundImg?.length !== 0 && data.backgroundImg !== undefined) {
      formData.append("user_background", data.backgroundImg[0]);
    }
    mutate(formData);
  };
  return (
    <>
      <SettingSubList>
        <form onSubmit={handleSubmit(onValid)}>
          <ImageModefyContainer>
            <BackgroundContainer>
              <label htmlFor="profile_background_image">
                <input
                  {...register("backgroundImg")}
                  id="profile_background_image"
                  type="file"
                  accept="image/*"
                />
                {backgroundImgPreview ? (
                  <img
                    src={backgroundImgPreview}
                    alt="profile background image"
                  />
                ) : (
                  <>
                    <BsImageFill />
                    <span>배경사진을 올려주세요</span>
                  </>
                )}
              </label>
            </BackgroundContainer>
            <ProfileContainer>
              <label htmlFor="profile_image">
                <input
                  {...register("profileImg")}
                  id="profile_image"
                  type="file"
                  accept="image/*"
                />
                {profileImgPreview ? (
                  <img src={profileImgPreview} alt="profile image" />
                ) : (
                  <AiOutlineUserAdd />
                )}
              </label>
            </ProfileContainer>
          </ImageModefyContainer>
          <ProfileSettingBox>
            <label htmlFor="profile_username">
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
                id="profile_username"
                type="text"
                placeholder="닉네임"
              />
            </label>
            <label htmlFor="profile_user_id">
              <span>
                유저 ID
                {formState.errors?.userId ? (
                  <small>{formState.errors.userId.message}</small>
                ) : null}
              </span>
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
      {isLoading ? (
        <Overlay>
          <OverlayBox>
            <HashLoader color="#f1c40f" loading={isLoading} />
          </OverlayBox>
        </Overlay>
      ) : null}
    </>
  );
}

export default Profile;
