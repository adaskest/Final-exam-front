import React, {useState, useEffect} from 'react';
import "./style.css"
import Sidebar from "./Sidebar";
import Header from "./Header";
import http from "../../plugins/http";
import TopicPostComp from "./TopicPostComp";

const UserProfile = () => {

    const [userTopics, setUserTopics] = useState({topics: [], topicsCount: 0})
    const [userPosts, setUserPosts] = useState({posts: [], postsCount: 0})
    const [tab, setTab] = useState('topics');

    async function getUserTopics() {
        const res = await http.get('/get-user-topics')
        if (res.success) setUserTopics({topics: res.topics, topicsCount: res.topicsCount})

    }

    async function getUserPosts() {
        const res = await http.get('/get-user-posts')
        if (res.success) setUserPosts({posts: res.posts, postsCount: res.postsCount})
    }

    useEffect(() => {
        getUserTopics()
        getUserPosts()
    }, [])

    return (
        <div className="flex user-profile stay-top">
            <div className="flex grow1 user-siderbar">
                <Sidebar/>
            </div>
            <div className="flex grow3 user-header flex-column">
                <Header userTopics={userTopics} tab={tab} setTab={setTab} userPosts={userPosts}/>
                <div className='topics-toolbar'>
                    <h5 className='col-7 topic-topic ms-sm-2'>Topic</h5>
                    <h5 className='col-1 topic-replies text-center'>Replies</h5>
                    <h5 className='col-4 topic-post-info text-center'>Last post</h5>
                </div>
                {tab === 'topics' ? userTopics.topics.map((topic, i) =>
                    <TopicPostComp key={i} topic={topic}/>) : userPosts.posts.map((post, i) => <TopicPostComp key={i} topic={post}/>)}
            </div>
        </div>

    );
};

export default UserProfile;