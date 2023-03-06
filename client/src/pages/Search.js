import axios from '../axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ResultItem from '../components/ResultsItem';
import '../styles/Search.css';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    navigate(`/search/${query}`);
  };

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

  useEffect(() => {
    authHeader()
  }, [])

  useEffect(() => {
    const query = location.pathname.split('/').pop();
    console.log(query)
    if (query) {
      setQuery(query);

      const options = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
        params: {
          country: 'us',
          lang: 'en',
          currentpage: '0',
          pagesize: '30',
          productTypes: query
        },
        headers: {
          'X-RapidAPI-Key': 'd5f7e9d872msh0ad9aeabb3ba219p1c2b27jsn81b494004041',
          'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
      };
  
      axios.request(options).then(function (response) {
        console.log(response.data.results);
        if (response.data.results) {
          setResults(response.data.results);
        }
        else {
          throw new Error('No results found');
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
    else {
      navigate('/');
    }
  }, [location]);


  return (
    <ProductSearchWrapper>
      <SearchTitle>Search for Products</SearchTitle>
      <SearchForm onSubmit={handleSearch}>
        <FormGroup>
          <Input
            type="text"
            id="query"
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter a product type..."
          />
          <Button type="submit">Search</Button>
        </FormGroup>
      </SearchForm>
      {!results.length ? <div className="lds-ripple"><div></div><div></div></div> : <ResultWrapper>
        {results.map((result) => (
          <ResultItem title={result.name} price={result.price.formattedValue} image={result.images[0].url} key={result.code} />
        ))}
      </ResultWrapper>}
      <LogoutButton onClick={logOut}>Logout</LogoutButton>
    </ProductSearchWrapper>
  );
}

export default Search;

const ProductSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchTitle = styled.h1`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SearchForm = styled.form`
  width: 100%;
  max-width: 800px;
  margin: 30px 0px 50px;
`;

const FormGroup = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  height: 40px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border 0.2s ease-in-out;

  &:focus {
    outline: none;
    border: 2px solid rgb(64 188 188);
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  margin: 0px 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  background-color: rgb(64 188 188);
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    background-color: rgb(56 163 148);
  }
`;

const ResultWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 1rem;
`;

// const ResultItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin: 10px;
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
//   background-color: #f9f9f9;
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: #f1f1f1;
//   }

//   & > img {
//     height: 100px;
//     margin-right: 20px;
//   }

//   & > div {
//     flex-grow: 1;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     color: #333;

//     & > h2 {
//       font-size: 18px;
//       font-weight: bold;
//       margin-bottom: 5px;
//     }

//     & > span {
//       font-size: 16px;
//       font-weight: bold;
//       color: #007bff;
//     }
//   }
// `;

const ResultImage = styled.img`
  height: 100px;
  margin-right: 10px;
`;

const ResultInfo = styled.div`
  flex-grow: 1;
`;

const ResultTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ResultPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  margin: 2rem;
  padding: 0.5rem 1rem;
  font-size: 16px;
  border-radius: 0.5rem;
  border: 1px solid grey;
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