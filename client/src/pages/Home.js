import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate()

  const logOut = () => {
      localStorage.removeItem('user')
      navigate("/login")
  }
  const authHeader = () => {
      let user = localStorage.getItem('user');    
      if (user) {
          const result = JSON.parse(user)
          if (result.token) {
              return { Authorization: 'Bearer ' + result.token };
          }
      } 
      else {
          console.log({})
          navigate("/login")
          return {};
      }
    }

  const handleSearch = (e) => {
    e.preventDefault();
    
    const searchQuery = e.target[0].value;

    navigate(`/search/${searchQuery}`);
  }

  useEffect(() => {
    authHeader()
  }, [])

  return (
    <HomePageWrapper>
      <HomePageContainer>
        <HomePageTitle>Shopping Assistant</HomePageTitle>
        <SearchBarWrapper onSubmit={handleSearch}>
          <SearchBar type="text" placeholder="What type of product are you looking for?" />
          <SearchButton type='submit'>Search</SearchButton>
        </SearchBarWrapper>
        <LogoutButton onClick={logOut}>Logout</LogoutButton>
      </HomePageContainer>
    </HomePageWrapper>
  );
};

export default Home;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f1f1f1;
  height: 100%;
`;

const HomePageContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 600px;
`;

const HomePageTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 70px;
  font-size: 36px;
  color: #333;
  text-align: center;
`;

const SearchBarWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  height: 40px;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;

  &:focus {
    border-color: rgb(64 188 188);
    outline: none;
  }

  &::placeholder {
    color: #bbb;
  }
`;

const SearchButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  background-color: rgb(64 188 188);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgb(56 163 148);
  }
`;

const LogoutButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  margin: 2rem;
  padding: 0.5rem 1rem;
  font-size: 16px;
  border-radius: 0.5rem;
  border: 2px solid grey;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgb(215 78 71);
    color: #fff;
    border: 2px solid transparent;
  }
`;
