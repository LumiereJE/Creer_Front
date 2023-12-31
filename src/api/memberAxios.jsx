import memberAxios from "axios";
import { KH_DOMAIN } from "../utils/Common";

const memberAxiosApi = {
  // 로그인
  memberLogin: async (userEmail, password) => {
    console.log("로그인 : ", userEmail, password);
    const login = {
      userEmail: userEmail,
      password: password,
    };
    return await memberAxios.post(KH_DOMAIN + "/auth/login", login);
  },
  //회원 전체 조회
  memberGet: async () => {
    const token = localStorage.getItem("accessToken");
    return await memberAxios.get(KH_DOMAIN + `/users/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
   // 회원 조회
   memberGetOne: async () => {
    const token = localStorage.getItem("accessToken");
    console.log("회원 조회 : ", token);
    return await memberAxios.get(KH_DOMAIN + `/users/detail`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
   },

 // 회원 가입
 memberReg: async (userEmail, password, name, image, address, phoneNum, nickName) => {
  const member = {
    userEmail: userEmail,
    password: password,
    name: name,
    image: image,
    address: address,
    phoneNum: phoneNum,
    nickName: nickName
  };
  return await memberAxios.post(KH_DOMAIN + "/auth/signup", member);
},
    // 회원 가입 여부 확인
    memberRegCheck: async (userEmail) => {
      console.log("가입 가능 여부 확인 : ", userEmail);
      return await memberAxios.get(KH_DOMAIN + `/auth/exists/${userEmail}`);
    },
  // 회원 정보 수정
  memberUpdate: async (userEmail, name, image) => {
    const token = localStorage.getItem("accessToken");
    console.log("회원 정보 수정 : ", userEmail, name, image);
    const member = {
      userEmail: userEmail,
      name: name,
      image: image,
    };
    return await memberAxios.put(KH_DOMAIN + `/users/modify`, member, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },

  // 회원 탈퇴
  memberDel: async (userEmail) => {
    const del = {
      userEmaild: userEmail,
    };
    return await memberAxios.post(KH_DOMAIN + "/user/delete", del);
  },
};

export default memberAxiosApi;
