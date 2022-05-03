import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import mainContext from "./context/mainContext";
import IndexPage from "./pages/IndexPage";
import AuthenticPage from "./pages/AuthenticPage";
import Toolbar from "./components/toolbar/Toolbar";
import http from "./plugins/http";
import UserPage from "./pages/UserPage";
import CreateTopicPage from "./pages/CreateTopicPage";
import SingleTopicPage from "./pages/SingleTopicPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {

    const [user, setUser] = useState(null)
    const [topics, setTopics] = useState([])
    const [favorites, setFavorites] = useState([])
    const [favoritesIds, setFavoritesIds] = useState([])
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        async function stayLoggedIn() {
            if (localStorage.getItem("stayLoggedIn") === "true") {
                const res = await http.get("/stayLoggedIn")
                if (res.success) setUser(res.user)
            }
        }

        stayLoggedIn()
    }, [])

    useEffect(() => {
        const value = JSON.parse(localStorage.getItem('favorites'))
        if (value) {
            setFavoritesIds(JSON.parse(localStorage.getItem('favorites')))
        } else {
            localStorage.setItem('favorites', JSON.stringify([]));
            setFavoritesIds([])
        }
    }, [])

    return (
        <mainContext.Provider value={{
            user,
            setUser,
            topics,
            setTopics,
            favoritesIds,
            setFavoritesIds,
            favorites,
            setFavorites,
            notifications,
            setNotifications
        }}>
            <Router>
                <Toolbar/>
                <hr/>
                <Routes>
                    <Route path='/' element={<IndexPage/>}/>
                    <Route path='/authentic/:signup' element={<AuthenticPage/>}/>
                    <Route path='/user-profile' element={<UserPage/>}/>
                    <Route path='/create-topic' element={<CreateTopicPage/>}/>
                    <Route path='/topic/:id' element={<SingleTopicPage/>}/>
                    <Route path='/favorites' element={<FavoritesPage/>}/>
                    <Route path='/notifications' element={<NotificationsPage/>}/>
                </Routes>
            </Router>
        </mainContext.Provider>
    );
}

export default App;
