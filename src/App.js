import React, { useContext } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { Auth } from './component/context/AuthContext';
import Form from './component/Form';
import Products from './component/Products';
import UserFromUseFetch from "./component/User"

function App() {
  const { userData } = useContext(Auth);
  const user = useSelector(state => state.auth);

  return (
    <>
      {userData && (
        <>
          <h2>From Context Api</h2>
          <p>UserName - {userData.name} </p>
          <p>UserEmail - {userData.email} </p>
        </>
      )}

      {user?.name && (
        <div className='border-black border-t mt-4'>
          <h2>From Redux Store</h2>
          UserName: {user.name} <br />
          UserEmail: {user.email}
        </div>
      )}
      {/* Form validate and set auth Store and authContext */}
      {/* <Form /> */}
      {/* Custom Hook */}
      {/* <UserFromUseFetch /> */}
      {/* Add to Cart Products  */}
      <Products />
    </>
  );
}

export default App;
