import React from 'react';
import "./style.css"

const Header = ({userTopics, tab, setTab, userPosts}) => {

    return (
        <div className="header-container_  mb-3">
            <div className="mx-10 d-flex justify-content-between">
                <div
                    className={tab === 'topics' ? "header-tabs color" : "header-tabs"}
                    onClick={() => setTab('topics')}>
                    <p>Your Topics<span className='hide'>&nbsp;</span></p>
                    <p>({userTopics.topicsCount})</p>
                </div>
                <div
                    className={tab === 'posts' ? "header-tabs color" : "header-tabs"}
                    onClick={() => setTab('posts')}>
                    <p>Your Posts<span className='hide'>&nbsp;</span></p>
                    <p>({userPosts.postsCount})</p>
                </div>
            </div>
        </div>
    );
};

export default Header;