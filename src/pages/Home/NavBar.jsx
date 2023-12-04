import styled from "styled-components"
import { ReactComponent as Logo } from "../../images/logo.svg"
import {useNavigate } from "react-router-dom";
const NavCss=styled.div`
    background-color: #ffffff;
    max-width:1280px ;
    height: auto;
    margin: 0 auto;
    .content1{
        background-color: #ffffff;
    width: 100%;
    height: 50px;
    position: relative;
    .content1ul{
        position: absolute;
        right: 0;
        width: 500px;  
        height: 600px;  
        li{    
            float :right ;
            margin: 0 10px; 
        list-style-type: none;
    }
    }

    }
    .content2{
        background-color: #ffffff;
    width: 100%;
    height: 50px;
    position: relative;
    .content2ul{
        position: absolute;
        left: 0;   
        li{    
            float :left ;
            margin: 0 30px;   
                list-style-type: none;
        
      
    }
    }
    .content2ul2{
        position: absolute;
        right: 0;  
        li{    
            float :left ;
            margin: 0 10px;   
        list-style-type: none;
        
      
    }
    }
}
`;


const Logobox=styled.div`
  margin: -30px;
`;


 const NavBar = () =>{
    const navigate = useNavigate();
    return(
       
        <NavCss> 
         <div className="content1">
         <div className="content1ul">
            <ul>
                <li><div onClick={()=>{navigate("/Login")}}>로그인</div></li>
                <li><div onClick={()=>{navigate("/Signup")}}>회원가입</div></li>
            </ul>
            </div>
         </div>
         <div className="content2">
         <div className="content2ul">
            <ul>
            <li><Logobox><Logo onClick={()=>{navigate("/")}}/></Logobox></li>
                <li><div onClick={()=>{navigate("/goods")}}>작품</div></li>
                <li><div onClick={()=>{navigate("/auction")}}>경매</div></li>
                <li><div onClick={()=>{navigate("/class")}}>클래스</div></li>
            </ul>
            </div>
            <div className="content2ul2">
            <ul>
                <li>검색</li>
                <li>장바구니</li>
                    </ul>
            </div>
         </div>

      
 
       
        </NavCss>
   
    )
}
export default NavBar