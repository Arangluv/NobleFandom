import { motion } from "framer-motion";
import styled from "styled-components";

const Card = styled(motion.div)`
  width: 19.5%;
  height: 100%;
  display: flex;
  border: 0.01px solid white;
  box-shadow: ${(props) => props.theme.textShadow};
  justify-content: center;
  align-items: center;
  font-size: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  div {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
    object-fit: contain;

    & > div {
      width: 4vw;
      height: 4vw;
      top: 0.5vw;
      position: absolute;
      border-radius: 100%;
      left: 5%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  &:hover {
    cursor: pointer;
  }
`;
interface IProps {
  backgroundImg: string;
  profileImg: string;
}
function RatingCard({ backgroundImg, profileImg }: IProps) {
  return (
    <Card>
      <div>
        <img src="{backgroundImg}" alt="Daliy Hot Creator background image" />
        <div>
          <img
            src="https://blog.kakaocdn.net/dn/bJIpg4/btrWqH4vJcZ/GHWnXId18DypiQ4frdIHIk/img.png"
            alt="Daliy Hot Creator profile image"
          />
        </div>
      </div>
    </Card>
  );
}

export default RatingCard;
