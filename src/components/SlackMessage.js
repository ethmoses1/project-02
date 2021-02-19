import React, { useState, Component } from 'react';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { auth, provider } from './firebase';
import firestore from './firebase';
import './SlackMessage.css'

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';





function SlackMessage(props) {

  const { channelId, content, photoURL, createdAt, uid, display_name  } = props.message;
  const [messageId, setMessageId] =  useState('')

  const deleteMessage = (e) => {
    firestore.collection('channels').doc(channelId).collection('messages').where('content', '==', e.target.getAttribute('value')).get().then((querySnapshot) => {
      let messageId = ''
      querySnapshot.forEach((doc) => {
        messageId = doc.id
        firestore.collection('channels').doc(channelId).collection('messages').doc(messageId).delete().then(() => {console.log('deleted')})
      })
      setMessageId(messageId);
      props.updateMessages();
    });
  }



  return (
    <div>
    <div className="message">
    			<img className='message__url'src={photoURL} alt="" />
    			<div className="message__info">
    				<h4>
    					{display_name}
    					<span className="message__timestamp">
    						{new Date(createdAt?.toDate()).toLocaleDateString()}
    					</span>
    				</h4>
    				<p>{content}</p> {uid === auth.currentUser.uid?(<p value = {content} onClick={deleteMessage}>Delete</p>):(null)}
    			</div>
    		</div>
        </div>
    	)
    }

export default SlackMessage;
