import React, {useContext, useEffect, useRef, useState} from 'react';import './singlePostStyle.css'import ReactPlayer from "react-player";import {BsReply} from "react-icons/bs";import mainContext from "../../context/mainContext";import AddPost from "../addPost/AddPost";import SinglePost from "./SinglePost";import Pagination from "../pagination/Pagination";const SingleTopic = ({topic, setTopic, totalPages}) => {    const pageRef = useRef()    const {user} = useContext(mainContext)    const [showAddPost, setShowAddPost] = useState(false)    const [activePage, setActivePage] = useState(1)    function getTime(day) {        const date = new Date(day)        const days = `${date.getFullYear()}:${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}:${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}`        const hours = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`        return {days, hours}    }    useEffect(() => {        setActivePage(totalPages)        // eslint-disable-next-line    }, [totalPages])    useEffect(() => {        scrollToBottom()    }, [activePage, topic]);    const scrollToBottom = () => {        pageRef.current?.scrollIntoView({behavior: "smooth"})    }    return (        <div className='single-post'>            <div className='topics-toolbar'>                <div className='w-25 me-3 text-center'>{topic.topicOwner}</div>                <div                    className='w-75'>{getTime(topic.uploadedTopic).days + ' ' + getTime(topic.uploadedTopic).hours}                </div>            </div>            <div className='topic'>                <div className='w-25 me-3'>                    <div className='profile-photo-username-wrap'>                        <img className='userPhoto border-radius0' src={topic.topicOwnerInfo.photo} alt=""/>                        <div className="user-info">                            <p className='registered' style={{fontSize: 12}}>User from: {getTime(topic.topicOwnerInfo.registered).days}</p>                            <p style={{fontSize: 12}}>Posts: {topic.topicOwnerInfo.posts}</p>                        </div>                    </div>                </div>                <div className='w-75' style={{width: "fit-content", wordBreak: "break-word"}}>                    <h3>{topic.title}</h3>                    <p>{topic.description}</p>                    <p className='line-break'>--------------------------------------------------------------------------------------------</p>                    <div className='pb-4'>                        {topic.photos.map((photo, i) => photo.includes('youtube') ?                            <div key={i} className='d-flex'>                                <div>                                    <ReactPlayer key={i} width={400} height={250} url={photo}/>                                </div>                            </div> :                            <div key={i} className='d-flex'>                                <div>                                    <img className='upload-picture' src={photo} alt=""/>                                </div>                            </div>)}                    </div>                </div>            </div>            { // eslint-disable-next-line                topic.posts.map((post, i) => {                if (i >= (activePage - 1) * 10 && i < (activePage) * 10)                    return <SinglePost key={i} index={i} post={post}/>            })}            <div className='d-flex justify-content-between'>                {user ? <div className='d-flex flex-row-reverse justify-content-between align-items-center'>                    <div className="toolbar-signup-login-wrap" style={{display: "flex"}}>                        <p className="toolbar-auth-btn m-0" onClick={() => setShowAddPost(true)}>                            <BsReply/>                            Add Post                        </p>                    </div>                </div>: <div/>}                {(totalPages !== 1) ?                    <Pagination activePage={activePage} setActivePage={setActivePage} totalPages={totalPages}/> : <div/>}            </div>            <AddPost showAddPost={showAddPost} setShowAddPost={setShowAddPost} topicID={topic._id} setTopic={setTopic}/>            <div ref={pageRef}/>        </div>    );};export default SingleTopic;