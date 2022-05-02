import React, {useContext, useEffect, useRef, useState} from 'react';import '../toolbar/toolbarStyle.css'import logo from '../../logo/TS4 forum-logos.jpeg'import {Link, useNavigate} from "react-router-dom";import http from "../../plugins/http";import {BsSearch} from "react-icons/bs";import mainContext from "../../context/mainContext";import {MdOutlineFavorite, MdOutlinePostAdd} from "react-icons/md";import {BiUserCircle} from "react-icons/bi";import {HiOutlineLogout} from "react-icons/hi";const Toolbar = () => {    const nav = useNavigate()    const searchRef = useRef()    const [search, setSearch] = useState('')    const [error, setError] = useState(false)    const [favoritesCount, setFavoriteCount] = useState(0)    const {user, setUser, favoritesIds} = useContext(mainContext)    async function validateSearch() {        if (4 > search.length || search.length > 80) {            searchRef.current.value = ''            return setError(true)        }        await titleSearch()    }    async function titleSearch() {        nav('/search/' + search.replaceAll(' ', '-'))        const data = await http.get('/post-search/' + search.toLowerCase())        console.log(data)        if (data.success) {            setError(false)            setSearch('')            searchRef.current.value = ''        }    }    async function logout() {        const res = await http.get("/logout")        if (res.success) {            localStorage.removeItem("stayLoggedIn");            setUser(null);            nav('/')        }    }    useEffect(() => {        const values = JSON.parse(localStorage.getItem("favorites"));        if (values) {            setFavoriteCount(values.length);        }    }, [favoritesIds]);    return (<div className='toolbar'>        <div className='logo'>            <Link to='/'>                <img src={logo} alt="Logo"/>            </Link>        </div>        <div className="searchbar">            <input ref={searchRef} type="text"                   placeholder={!error ? "Search..." : "Search phrase should be from 4 to 80 symbols"}                   onKeyDown={e => e.key === 'Enter' ? validateSearch() : null}                   onChange={e => setSearch(e.target.value)}/>            <div className="searchIcon-wrap">                <div className="search-icon" onClick={validateSearch}>                    <BsSearch/>                </div>            </div>        </div>        <div className="toolbar-signup-login-wrap">            <div>                <Link to="/favorites">                    <p className="toolbar-auth-btn m-0">                        <MdOutlineFavorite/>                        Favorites ({favoritesCount})                    </p>                </Link>            </div>            {!user ? <div className="toolbar-signup-login-wrap">                    <Link to="/authentic/login">                        <p className="toolbar-auth-btn">Login</p>                    </Link>                    <Link to="/authentic/register">                        <p className="toolbar-auth-btn">Register</p>                    </Link>                </div> :                <div className="toolbar-signup-login-wrap">                    <div>                        <Link to="/create-topic">                            <p className="toolbar-auth-btn m-0">                                <MdOutlinePostAdd/>                                Create Topic                            </p>                        </Link>                    </div>                    <div className="toolbar-signup-login-wrap">                        <Link to="/user-profile">                            <p className="toolbar-auth-btn m-0">                                <BiUserCircle/>                                User Profile                            </p>                        </Link>                    </div>                    <div className="toolbar-signup-login-wrap">                        <p className="toolbar-auth-btn m-0" onClick={logout}>                            <HiOutlineLogout/>                            Logout                        </p>                    </div>                </div>}        </div>    </div>);};export default Toolbar;