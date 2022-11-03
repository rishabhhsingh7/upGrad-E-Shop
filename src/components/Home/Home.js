import React from "react";
import Header from "../../common/header/Header";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

//creating a Home Component
function Home(props) {
  const history = useHistory();

  // useEffect(()=>{
  //     debugger;
  //     if(window.sessionStorage.getItem('isLoggedIn')==undefined){
  //        history.baseURL = props.baseURL;
  //        history.push('/login');

  //     }
  // },[])

  return (
    <div className="main-container">
      <Header baseURL={props.baseURL} />
      <div classname="Content"></div>
    </div>
  );
}

export default Home;
