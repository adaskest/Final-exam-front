import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import mainContext from "./context/mainContext";
import IndexPage from "./pages/IndexPage";
import AuthenticPage from "./pages/AuthenticPage";
import Toolbar from "./components/toolbar/Toolbar";
import http from "./plugins/http";

function App() {

    const [user, setUser] = useState(null)

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
        }}>
            <Router>
                <Toolbar/>
                <Routes>
                    <Route path='/' element={<IndexPage/>}/>
                    <Route path='/authentic/:signup' element={<AuthenticPage/>}/>
                </Routes>
            </Router>
        </mainContext.Provider>
    );
}

export default App;
