import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { navigate } from "@reach/router";
import {auth} from "./firebase";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const channels = useContext(UserContext);
  const {photoURL, displayName, email} = user;
  const {name} = channels;
  console.log(user);
  console.log(channels);


  return (
    <div className = "Outer-div" >
    <h1> SlackME</h1>
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "100px",
            width: "100px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{displayName}</h2>
        <h3 className = "italic">{email}</h3>
        <h3 className = "italic">{name}</h3>
        </div>
      </div>
      <button className = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick = {() => {auth.signOut()}}>Sign out</button>
    </div>
  )
};

export default ProfilePage;
