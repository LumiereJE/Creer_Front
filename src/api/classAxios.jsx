import axios from "axios";
import Common from "../utils/Common";

const ClassAxiosApi = {
    
  // 클래스 생성  
  boardWrite: async (title, category, area, classImg,info,price,level,runnigTime,maxPeople) => {
    const accessToken = Common.getAccessToken();
    const board = {
        classTitle: title,
        classCategory: category,
        classArea: area,
        classImg: classImg,
        classInfo: info,
        classPrice: price,
        classLevel: level,
        classRunningTime: runnigTime,
        classPeople: maxPeople, 
    };
    return await axios.post(Common.KH_DOMAIN + "/api/board/new", board, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

}
export default ClassAxiosApi;
