import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  z-index: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: scroll;
  background:  linear-gradient(100deg, rgba(223,96,95,1) 5%, rgba(228,155,64,1) 19%, rgba(228,207,82,1) 35%, rgba(144,227,71,1) 50%, rgba(71,116,227,1) 74%, rgba(227,71,226,1) 93%);
  background-size: 300% 300%;
  animation: gradient 25s alternate infinite;
  transition: 1s;
  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    25% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 50% 50%;
    }
    75% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  :hover {
    transition: 1s;
    background-position: 25% 100%;
  }

  @media (max-width: 500px) {
    padding: 1%;
  }
`

const Main = styled.div`
  padding: 1%;
  transition: 1s;
  z-index: 10;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: black;
  margin: 5%;
  border-radius: 40px;
  justify-content: center;
  
  @media (max-width: 300px) {
    display: flex;
    flex-direction: column;
    padding-top: 2%;
  }
`
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Wrapper>
        <Main>{children}</Main>
      </Wrapper>
    </React.Fragment>
  )
}

export default Layout