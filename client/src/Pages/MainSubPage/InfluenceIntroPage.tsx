import styled from "styled-components";
import { motion } from "framer-motion";
const InfluencerIntroBox = styled.div`
  width: 90%;
  margin-top: 10vw;
`;
const InfluencerIntroSubBox = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 80vh;
  margin-bottom: 5vw;
`;
const InfluencerContent = styled(motion.div)`
  width: 45%;
  position: relative;
  border: 1px solid white;
  box-shadow: #fbc531 0px 0px 10px;
  padding: 1vw;
  border-radius: 30px;
  & .influ_content_img {
    object-fit: contain;
    width: 100%;
    height: 60vh;
  }
  & .influ_content_img > img {
    width: 100%;
    border-radius: 20px;
    height: 100%;
  }
  & > .influ_content_description {
    height: 30vh;
    background-color: white;
    position: relative;
    bottom: 6vw;
    border-top-left-radius: 30%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 2vw;
    h4 {
      margin-top: 3vw;
      font-weight: 700;
      font-size: 2vw;
    }
    p {
      margin-top: 2vw;
      font-size: 1.5vw;
    }
  }
`;
const elVarients = {
  start: {
    y: 20,
    opacity: 0,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      // delay: 0.5,
      duration: 1,
    },
  },
};
function InfluenceIntroPage() {
  return (
    <InfluencerIntroBox>
      <InfluencerIntroSubBox
        variants={elVarients}
        whileInView="end"
        initial="start"
        viewport={{ once: true }}
      >
        <InfluencerContent>
          <div className="influ_content_img">
            <img
              src="https://png.pngtree.com/png-vector/20210618/ourlarge/pngtree-attractive-subscribe-button-png-image_3463051.jpg"
              alt=""
            />
          </div>
          <div className="influ_content_description">
            <h4>Blur Blur</h4>
            <p>
              국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
              형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서
              진술할 수 있다.
            </p>
          </div>
        </InfluencerContent>
        <InfluencerContent>
          <div className="influ_content_img">
            <img
              src="https://png.pngtree.com/png-vector/20210618/ourlarge/pngtree-attractive-subscribe-button-png-image_3463051.jpg"
              alt=""
            />
          </div>
          <div className="influ_content_description">
            <h4>Blur Blur</h4>
            <p>
              국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
              형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서
              진술할 수 있다.
            </p>
          </div>
        </InfluencerContent>
      </InfluencerIntroSubBox>

      <InfluencerIntroSubBox
        variants={elVarients}
        whileInView="end"
        initial="start"
        viewport={{ once: true }}
      >
        <InfluencerContent>
          <div className="influ_content_img">
            <img
              src="https://png.pngtree.com/png-vector/20210618/ourlarge/pngtree-attractive-subscribe-button-png-image_3463051.jpg"
              alt=""
            />
          </div>
          <div className="influ_content_description">
            <h4>Blur Blur</h4>
            <p>
              국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
              형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서
              진술할 수 있다.
            </p>
          </div>
        </InfluencerContent>
        <InfluencerContent>
          <div className="influ_content_img">
            <img
              src="https://png.pngtree.com/png-vector/20210618/ourlarge/pngtree-attractive-subscribe-button-png-image_3463051.jpg"
              alt=""
            />
          </div>
          <div className="influ_content_description">
            <h4>Blur Blur</h4>
            <p>
              국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
              형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서
              진술할 수 있다.
            </p>
          </div>
        </InfluencerContent>
      </InfluencerIntroSubBox>

      <InfluencerIntroSubBox
        variants={elVarients}
        whileInView="end"
        initial="start"
        viewport={{ once: true }}
      >
        <InfluencerContent>
          <div className="influ_content_img">
            <img
              src="https://png.pngtree.com/png-vector/20210618/ourlarge/pngtree-attractive-subscribe-button-png-image_3463051.jpg"
              alt=""
            />
          </div>
          <div className="influ_content_description">
            <h4>Blur Blur</h4>
            <p>
              국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
              형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서
              진술할 수 있다.
            </p>
          </div>
        </InfluencerContent>
        <InfluencerContent>
          <div className="influ_content_img">
            <img
              src="https://png.pngtree.com/png-vector/20210618/ourlarge/pngtree-attractive-subscribe-button-png-image_3463051.jpg"
              alt=""
            />
          </div>
          <div className="influ_content_description">
            <h4>Blur Blur</h4>
            <p>
              국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
              형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서
              진술할 수 있다.
            </p>
          </div>
        </InfluencerContent>
      </InfluencerIntroSubBox>

      <InfluencerIntroSubBox
        variants={elVarients}
        whileInView="end"
        initial="start"
        viewport={{ once: true }}
      >
        <InfluencerContent>
          <div className="influ_content_img">
            <img
              src="https://png.pngtree.com/png-vector/20210618/ourlarge/pngtree-attractive-subscribe-button-png-image_3463051.jpg"
              alt=""
            />
          </div>
          <div className="influ_content_description">
            <h4>Blur Blur</h4>
            <p>
              국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
              형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서
              진술할 수 있다.
            </p>
          </div>
        </InfluencerContent>
        <InfluencerContent>
          <div className="influ_content_img">
            <img
              src="https://png.pngtree.com/png-vector/20210618/ourlarge/pngtree-attractive-subscribe-button-png-image_3463051.jpg"
              alt=""
            />
          </div>
          <div className="influ_content_description">
            <h4>Blur Blur</h4>
            <p>
              국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
              형사피해자는 법률이 정하는 바에 의하여 당해 사건의 재판절차에서
              진술할 수 있다.
            </p>
          </div>
        </InfluencerContent>
      </InfluencerIntroSubBox>
    </InfluencerIntroBox>
  );
}

export default InfluenceIntroPage;
