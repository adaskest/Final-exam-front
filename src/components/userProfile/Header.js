import React, {useState} from 'react';
import "./style.css"

const Header = () => {

    const [getState, setState] = useState(1);
    const [userUploadedProducts, setUserUploadedProducts] = useState([])
    const [getUserBids, setUserBids] = useState([])

    function selectedTab(x) {
        setState(x)
    }


    return (
        <div className="header-container_ ">
            <div className="mx-10 d-flex justify-content-between">
                <div
                    className={getState === 1 ? "header-tabs color" : "header-tabs"}
                    onClick={() => selectedTab(1)}>
                    <p>Your Topics<span className='hide'>&nbsp;</span></p>
                    <p className='break-word'>({userUploadedProducts.length})</p>
                </div>
                <div
                    className={getState === 2 ? "header-tabs color" : "header-tabs"}
                    onClick={() => selectedTab(2)}>
                    <p>Your Posts<span className='hide'>&nbsp;</span></p>
                    <p className='break-word'>({getUserBids.length})</p>
                </div>
            </div>
        </div>
    );
};

export default Header;