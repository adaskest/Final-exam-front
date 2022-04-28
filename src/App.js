import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import mainContext from "./context/mainContext";
import IndexPage from "./pages/IndexPage";
import AuthenticPage from "./pages/AuthenticPage";
import Toolbar from "./components/toolbar/Toolbar";
import {useState} from "react";

function App() {

    const [user, setUser] = useState(null)


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
