import React, { useState, Component } from 'react';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { auth, provider } from './firebase';
import firestore from './firebase';

import SlackChannel from './SlackChannel'
import SlackMessage from './SlackMessage'
import AddIcon from "@material-ui/icons/Add"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import './SlackHome.css'
import Signout from './Signout'
import { Router } from "@reach/router";
import ProfilePage from './ProfilePage';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import history from "../utils/history";




function SlackHome () {
   let history = useHistory();

  const channelsRef = firestore.collection('channels');
  const query = channelsRef.orderBy('createdAt').limit(25);
  const[channels] = useCollectionData(query);
  console.log(channels)
  const [formValue, setFormValue] = useState('')

  const createChannel = async(e) => {                   ////create channels
    e.preventDefault();
    const channelName  = prompt("Enter channel name")
    const { uid, photoURL } = auth.currentUser;
    await channelsRef.add({
      topic: channelName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
 }



const[searchForm, setsearchForm] = useState('')
console.log(searchForm);
const[formValueMsg, setFormValueMsg] = useState('')
const[messages, setMessages] = useState([])
const[channelNow, setChannelNow] = useState('')
const[channelNowTopic, setChannelNowTopic] = useState('no channel selected')

const fetchMessages = function (e){              /////display messages
   e.preventDefault();

   let channelId = '';
   firestore.collection("channels").where('topic', '==', e.target.getAttribute('value')).get().then((querySnapshot) => {
     let channelNow = ''
     let channelNowTopic = ''
     querySnapshot.forEach((doc) => {
         channelId = doc.id;
         channelNow = doc.id
         channelNowTopic = doc.data().topic

         firestore.collection("channels").doc(channelId).collection('messages').orderBy('createdAt').get().then((querySnapshot) =>{
         const messages = [];
         querySnapshot.forEach((doc) => {
         messages.push(doc.data());

     })
        setMessages(messages)
        setChannelNow(channelNow);
        setChannelNowTopic(channelNowTopic)

      })
    })
  })
}
function handleSubmit(e) {
   e.preventDefault();
   console.log(formValueMsg);
   // clearing the values
   setFormValueMsg("");
 }

const createMessage = async(e) => {               ////create messages
  e.preventDefault();

  const { uid, photoURL } = auth.currentUser;

  if(channelNow === ''){
    alert('please select channel')
  }else{
  await channelsRef.doc(channelNow).collection('messages').add({
    content: formValueMsg,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    channelId: channelNow,
    uid,
    photoURL
  });

  firestore.collection('channels').doc(channelNow).collection('messages').orderBy('createdAt').get().then((querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    })
    setMessages(messages);
  }).then(handleSubmit)
 }
}

const updateMessages = () => {

    if (channelNow != ''){
      console.log('update messages')
        firestore.collection('channels').doc(channelNow).collection('messages').orderBy('createdAt').get().then((querySnapshot) => {
        const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            })
        setMessages(messages);

     })
   }
};


const getChannel = function(e){
  const topics = []
    e.preventDefault();
   channelNow.map((channel) =>
   console.log("i think this is working:",channel ,topics.push(channel.topic))

).then(topics.map((topic)=>
(topic === this.state.searchFrom) ? console.log(topic) : console.log("no match")) )
}

function handleSubmit(e) {
   console.log(formValueMsg);
   // clearing the values
   setFormValueMsg("");
 }

return (
    <div>
     <div className="headers">
        <h1><img height='30' width='30'className='titleImage' src="https://cdn.iconscout.com/icon/free/png-512/slack-226533.png" alt=""/>SlackME</h1>


        <div className="header__search">
          <div className="SearchIcon">
          <SearchIcon />
          </div>
         <div className="header_search_input">
          <form onSubmit={getChannel}>
            <input className="header_search_input" placeholder="Search..."  value={searchForm} onChange={(e) => setsearchForm(e.target.value)}/>
          </form>
          </div>
        </div>



        <div className="Signout">


          <Signout/>
          </div>
      </div>

      <div className="home__container">
        <div className="channels__container">

          <div className="add-channel">
            <AddIcon/>
                   <button onClick={createChannel}> Create channel</button>
          </div>



           <div className="working-channel">
           <div className="ExpandMoreIcon">
           <ExpandMoreIcon className="ExpandMoreIcon" />Channels
           </div>
              { channels && channels.map(channel =>
                <div className='channels' onClick={fetchMessages} value={channel.topic}> <SlackChannel key={channel.id} channel={ channel } onClick={fetchMessages} value={channel.topic} fetchMessages={fetchMessages}/>
               </div>
             )}
           </div>
         </div>



        <div className="messages__container">

           <div className='channel__indicator'>You are in channel: #{ channelNowTopic }</div>
           <div>
              { messages && messages.map(message => <div className='messages'><SlackMessage key={message.id} message={ message } updateMessages={updateMessages} /></div>)}
           </div>

        <div className="message__input">
           <form onSubmit={createMessage} className="message__field">
                   <input value={formValueMsg} onChange={(e) => setFormValueMsg(e.target.value)} className="message_field_field"/>
                   <button>Send message</button>
           </form>
        </div>
          </div>
        </div>

     </div>
  )

}

export default SlackHome
