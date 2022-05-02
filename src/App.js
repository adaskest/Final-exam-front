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

function App() {

    const [user, setUser] = useState(null)
    const [topics, setTopics] = useState([])

    useEffect(() => {
        async function stayLoggedIn() {
            if (localStorage.getItem("stayLoggedIn") === "true") {
                const res = await http.get("/stayLoggedIn")
                if (res.success) {
                    setUser(res.user)
                }
            }
        }

        stayLoggedIn()
    }, [])

    return (
        <mainContext.Provider value={{
            user,
            setUser,
            topics,
            setTopics
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
                </Routes>
            </Router>
        </mainContext.Provider>
    );
}

export default App;
