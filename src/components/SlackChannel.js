import React, { useState, Component } from 'react';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { auth, provider } from './firebase';
import firestore from './firebase';
import './SlackChannel.css'
import DeleteIcon from '@material-ui/icons/Delete';

const deleteChannel = (e) => {
      firestore.collection('channels').where('topic', '==', e.target.getAttribute('value')).get().then((querySnapshot) => {
        let channelId = ''
        querySnapshot.forEach((doc) => {
          channelId = doc.id
          firestore.collection('channels').doc(channelId).delete().then(() => {console.log('deleted')})
        })
      });
}




function SlackChannel(props) {
  const { topic, uid, photoURL, documentId, createdAt, id } = props.channel;

  const fetchMessages2 = (e) => {
    props.fetchMessages(e);
  }


    return (
      <div onClick={fetchMessages2} value={topic} className="channel-box">
       <div onClick={fetchMessages2} value={topic} className="sidebar">
          <h3 onClick={fetchMessages2} value={topic} className='sidebarOption__channel'>
             <span  className='sidebarOption__hash'>#</span>{ topic } {uid === auth.currentUser.uid ? (<button className='delCha' onClick={deleteChannel} value = {topic} >✘</button>):(null)}
         </h3>

       </div>
    </div>

  )
}

export default SlackChannel
