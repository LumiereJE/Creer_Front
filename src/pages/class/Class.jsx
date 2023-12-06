import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import ClassAxiosApi from "../../api/ClassAxios";
import { storage } from "../../api/FireBase";
const CommunityCss = styled.div`
width: 80%;
margin: 0 auto;
max-width: 1200px;
`;
const Item1=styled.div`
width: 10%;
`;
const Itemp=styled.div`
width: 20%;
`;
const Item2=styled.div`
width: 60%;
`;
const Content1=styled.input`
 margin-top: 10px;
  width: 100%;
  height: 25px;
  color:black;
  border:1px solid black;
border-radius: 5px;
  font-size: 15px;

p{
  margin-top: 5px;
  border-right: 1px solid blue;
}
  
`;
const Content2=styled.div`
  width: 100%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 16px;
  height: 300px;
  margin-top: 10px;
`;
const StyledTextarea = styled.textarea`
width: 100%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
padding: 10px;
border: none;
border-radius: 4px;
font-size: 16px;
height: 100%;
`;



const Content3=styled.div`

  width: 100%;
  height: 50px;
  border-radius: 10px;
  text-align: center; 
  padding: 7px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

`;
const Item3=styled.button`
  width: 10%;
  height: 30px; 
  margin: 10px 10px;
    /* border:1px solid red; */
    background-color:#dfdfdf;
    border-radius: 10px;
     &:active{   
      background:rgba(72, 100, 224, 1);
    }
`;
const Content4=styled.div`
display: flex;
   margin-top: 10px;
  width: 100%;
  height: 50px;
  color:black;
  border:1px solid black;
border-radius: 5px;
input{

  width: 90%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}
`
const Item4=styled.button`
  width: 80%;
  height: 50px; 
  margin: 10px 10px;
    /* border:1px solid red; */
    background-color:#dfdfdf;
    border-radius: 10px;
     &:active{   
      background: #F4CE14;;
    }
`;
const Menu=styled.div`
  width: 100%;
  height: 50px;
  margin-top: 50px;
  font-size: 25px;
  p{
    width: 180px;
    border-bottom: 3px solid  #F4CE14;
  }
`;

const UserImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 5px;
padding: 10px;
border: 1px solid black;
  margin-top: 20px;
`;





export const Class = () =>{
    const navigate = useNavigate();
    const [File, setFile] = useState(""); 
    const [urllist, setUrllist] = useState([]);
    //개설 클래스 타이틀
    const [title, setTitle] = useState(""); 
    //카테고리
    const [category, setCategory] = useState(""); 
    //지역
    const [area, setArea] = useState(""); 
    //대표 이미지
    const [classImg, setClassImg] = useState(""); 
    //클래스 수업 정보
    const [info, setInfo] = useState(""); 
    //가격
    const [price, setPrice] = useState(""); 
    //난이도
    const [level, setLevel] = useState(""); 
    //수업 시간
    const [runnigTime, setRunnigTime] = useState(""); 
    //참여 가능 인원
    const [maxPeople, setMaxPeople] = useState(""); 

    //       const infoChage = (e) => {
    //     setInfo(e.target.value);
    //   };
    


    //파이어베이스 이미지 업로드
    const fileChage = (e) => {
        setFile(e.target.files[0]);
      };
    const fileuploade = async () => {   
     
        try {  
        
          const storageRef = storage.ref();
          const fileRef = storageRef.child(File.name);
         
          // 파일을 업로드하고 기다립니다.
          await fileRef.put(File);
          console.log("File uploaded successfully!");
        
          // 다운로드 URL을 가져오고 기다립니다.
          const url = await fileRef.getDownloadURL();
          console.log("저장경로 확인 : " + url);
          
          // 상태를 업데이트합니다.
            
          setClassImg(url);
          setUrllist([...urllist, url]);
         console.log("urllist리스트")
         console.log(urllist)
      
        } catch (error) {
          // 에러를 처리합니다.
     
          console.error("Upload failed", error);
        }
      };
    const Submit=()=>{
   
    }
    useEffect(()=>{},[])
    return(
        <>
       <Menu>  <h1>클라스 메인</h1></Menu>
        <CommunityCss>      

       <Content1 placeholder={"제목"}  value={title}
          onChange={(e)=>{  setTitle(e.target.value);}} />


<Content1 placeholder={"카테고리"}  value={category}
          onChange={(e)=>{  setCategory(e.target.value);}} />


<Content1 placeholder={"지역"}  value={area}
          onChange={(e)=>{  setArea(e.target.value);}} />


<Content1 placeholder={"이미지//파이어로 변경"}  value={classImg}
          onChange={(e)=>{  setClassImg(e.target.value);}} />
      
      <div>
      {urllist&& urllist.map((ur) => (
        <UserImage key={ur} src={ur}  />
      ))}
    </div>
            <Content4>     
            <input type="file" onChange={fileChage} />
            
       
       </Content4> 
       <Item3 onClick={fileuploade}>업 로 드  </Item3>  
<Content1 placeholder={"가격"}  value={price}
          onChange={(e)=>{  setPrice(e.target.value);}} />


<Content1 placeholder={"난이도"}  value={level}
          onChange={(e)=>{  setLevel(e.target.value);}} />


<Content1 placeholder={"수업 시간"}  value={runnigTime}
          onChange={(e)=>{  setRunnigTime(e.target.value);}} />

<Content1 placeholder={"수업 인원"}  value={maxPeople}
          onChange={(e)=>{  setMaxPeople(e.target.value);}} />


             
            <Content2>
     
        <StyledTextarea
          id="content"
          name="content"
          value={info}
          onChange={(e)=>{  setInfo(e.target.value);}} placeholder="내용"
        /> 
      </Content2>
      <Item4 onClick={Submit}>확 인 </Item4>    
         <Item4 onClick={()=>{ navigate("/Community")}}>취 소 </Item4>    
    
    </CommunityCss>
        </>
    )
}
