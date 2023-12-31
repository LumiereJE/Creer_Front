import styled from "styled-components"
import { ReactComponent as Logo } from "../../images/logo.svg"
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Common from "../../utils/Common";
import memberAxiosApi from "../../api/memberAxios";
import GlobalStyle from "../../css/home/GlobalStyle";

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
        h1 {
            font-size: 20px;
        }
        ul {
            float :right ;
            list-style-type: none;
        }
        li{    
            display: inline-block;
            margin: -10px 10px;
        }
        p {
            cursor: pointer;
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
        li {    
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
    const Login =styled.div`
        
    `;

    export const NavBar = () =>{
        const navigate = useNavigate();
        const [name, setName] = useState();
        const [member, setMember] = useState({});
        const [login, setlogin] = useState(  window.localStorage.getItem("isLogin")); 
        // const {addr, temp} = useWeather();

        const logout = () => {
            window.localStorage.setItem("isLogin", "false");
            setlogin("logout");
            navigate("/");
        }

    useEffect(()=>{ 
        if(login !=="true"){
        setlogin("false");
    }});

    useEffect(() => {
        const getMember = async () => {
        const accessToken = Common.getAccessToken();
        try {
            const rsp = await memberAxiosApi.memberGetOne();
            setMember(rsp.data);
            setName(rsp.data.name);
           
        } catch (e) {
            // 엑세스토큰 유효기간 지나면 401
            if (e.response.status === 401) {
            // 리플레쉬토큰으로 재발급 받기
            await Common.handleUnauthorized();
            const newToken = Common.getAccessToken();
            if (newToken !== accessToken) {
                const rsp = await memberAxiosApi.memberGetOne(); // 전체 조회
                setMember(rsp.data);
                setName(rsp.data.name);
        }}}};
        getMember();
    }, [name]);

    return(
        <NavCss> 
            <GlobalStyle />
            <header className="content1">
                <div className="content1ul">
                    <ul>
                        {login === "false" ? 
                        <Login>
                        <li><div onClick={()=>{navigate("/Login")}}>로그인</div></li>
                        <li><div onClick={()=>{navigate("/Signup")}}>회원가입</div></li>
                        </Login>
                        :
                        <ul>
                            <li><h1 style={{fontWeight: "bold"}}>{member.name}님 환영합니다!</h1></li>
                            <li><div onClick={()=>{logout()}}><p>로그아웃</p></div></li>
                        </ul>
                            }
                    </ul>
                </div>
            </header>

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
