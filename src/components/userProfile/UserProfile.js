import React, {useState, useEffect} from 'react';
import "./style.css"
import Sidebar from "./Sidebar";
import Header from "./Header";
import http from "../../plugins/http";

const UserProfile = () => {

    const [userTopics, setUserTopics] = useState({topics: [], topicsCount: 0})
    const [tab, setTab] = useState('topics');

    async function getUserTopics() {
        const res = await http.get('/get-user-topics')
        if (res.success) {
            setUserTopics({topics: res.topics, topicsCount: res.topicsCount})
        }
    }

    async function getUserPosts() {
        const res = await http.get('/get-user-posts')
        console.log(res)
    }

    useEffect(() => {
        getUserTopics()
        getUserPosts()
    }, [])

    return (
        <div className="flex stay-top column-responsive-small column-responsive-medium">
            <div className="flex grow1 ">
                <Sidebar/>
            </div>
            <div className="flex grow3 ">
                <Header userTopics={userTopics} tab={tab} setTab={setTab}/>
            </div>
        </div>

    );
};

export default UserProfile;