import React,{useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Modal from "../../utils/Modal";
import imgLogo from "../../images/logo.svg";
import memberAxiosApi from "../../api/memberAxios";
import {
  Input,
  Button,
  Container,
  Items,
} from "../../css/home/LoginCss";

const Login = () => {
  const navigate = useNavigate();

  // 키보드 입력
  const [inputUserEmail, setInputUserEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  // 오류 메시지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState("");
  const [isPassWord, setIsPassWord] = useState("");

  // 모달 내용 변경
  const [modalContent, setModalContent] = useState("");

  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputUserEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };

  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPassWord(false);
    } else {
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPassWord(true);
    }
  };
  const onClickLogin = async () => {
    //로그인을 위한 axios 호출
    try{
    const res = await memberAxiosApi.memberLogin(inputUserEmail, inputPw);
    console.log(res.data);
    if (res.data.grantType === "Bearer") {
      console.log("accessToken : ", res.data.accessToken);
      console.log("refreshToken : ", res.data.refreshToken);
      window.localStorage.setItem("accessToken", res.data.accessToken); // 브라우저에서 임시로 값을 저장하는 기술
      window.localStorage.setItem("refreshToken", res.data.refreshToken);
      window.localStorage.setItem("isLogin", "true");
      navigate("/");
    } else {
      setModalOpen(true);
      setModalContent("아이디 및 패스워드를 재확인해 주세요.^^");
    }
  } catch(error) {
    console.log(error);
    setModalOpen(true);
    setModalContent("아이디 및 패스워드를 재확인해 주세요.^^");
  }
};

  return (
    <Container>
      <Items className="item1">
        <img src={imgLogo} alt="Logo" />
      </Items>

      <Items className="item2">
        <Input
          placeholder="이메일"
          value={inputUserEmail}
          onChange={onChangeEmail}
        />
      </Items>
      <Items className="hint">
        {inputUserEmail.length > 0 && (
          <span className={`${isId ? "success" : "error"}`}>{idMessage}</span>
        )}
      </Items>

      <Items className="item2">
        <Input placeholder="패스워드" value={inputPw} onChange={onChangePw} />
      </Items>
      <Items className="hint">
        {inputPw.length > 0 && (
          <span className={`${isPassWord ? "success" : "error"}`}>{pwMessage}</span>
        )}
      </Items>
      <Items className="item2">
        {isId && isPassWord ? (
          <Button enabled onClick={onClickLogin}>
            SIGN IN
          </Button>
        ) : (
          <Button disabled>SIGN IN</Button>
        )}
      </Items>
      <Modal open={modalOpen} close={closeModal} header="오류">
        {modalContent}
      </Modal>
      <Items className="signup">
        <Link to="/Signup" className="link_style">
          <span>Sign Up</span>
        </Link>
      </Items>
    </Container>
  );
};
export default Login;
