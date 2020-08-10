import react from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.div`
    min-height: 100vh;
    z-index:20;
    background-color: rgba(255, 255, 255, 1);
    
`;

const Text = styled.div`
    display:flex;
    justify-content:center;
    max-width: 100vw;
    font-style:poppins;
    font-weight:regular;
    padding: 0 auto;
    .Thank{
        font-size:69px;
        color:#6639E4;
        transform: translateY(-25px);
        margin-top: 200px;
        @media screen and (max-width: 767px){
            font-size:49px;
        }
    }
    .txtl1{
        font-size:18.67px;
        transform: translateY(-82px);
    }
    .txtl2{
        font-size:18.67px;
        transform: translateY(-118px);
    }
    .link{
        font-size:20px;
        font-weight:bold;
        color:#6639E4;
        transform: translateY(-114px);
    }
    .link:hover{
        cursor: pointer;
    }
`;

export default () => {
    return(
        <Wrapper>
            <Text>
                <p className="Thank">Blog sent to the Server!</p>
            </Text>
            <Text>
                <p className="txtl1">Your blog will be published in a minute!</p>
            </Text>
            <Text>
                <Link href="/"><p className="link" >Write Another</p></Link>
            </Text>
        </Wrapper>
    )
}