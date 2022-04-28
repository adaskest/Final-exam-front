import React, {useContext, useEffect, useRef, useState} from 'react';
import mainContext from "../../context/mainContext";
import "./style.css"
import http from "../../plugins/http";
import {FaExclamationCircle} from "react-icons/fa";

const Header = () => {

    const {user} = useContext(mainContext)
    const [getState, setState] = useState(1);
    const [userUploadedProducts, setUserUploadedProducts] = useState([])
    const [userReviews, setUserReviews] = useState([])
    const [getUserBids, setUserBids] = useState([])
    const [getWonBids, setWonBids] = useState([])
    const [showSpinner1, setShowSpinner1] = useState(true)
    const [showSpinner2, setShowSpinner2] = useState(true)
    const [showSpinner3, setShowSpinner3] = useState(true)
    const [showSpinner4, setShowSpinner4] = useState(true)
    const [toggleActive, setToggleActive] = useState(false)
    const [toggleInactive, setToggleInactive] = useState(false)

    function selectedTab(x) {
        setState(x)
    }


    // useEffect(async () => {
    //     if (user?._id) {
    //         const uploadedProducts = await http.get("/getUploadedProducts/" + user?._id)
    //         if (uploadedProducts.success) {
    //             setUserUploadedProducts(uploadedProducts.uploadedProducts)
    //             if (uploadedProducts.uploadedProducts.filter(el => el.endTime > Date.now()).length) {
    //                 setToggleActive(true)
    //             }
    //             if (uploadedProducts.uploadedProducts.filter(el => el.endTime < Date.now()).length) {
    //                 setToggleInactive(true)
    //             }
    //             setShowSpinner1(false)
    //         }
    //         const getReviews = await http.get("/getReviews/" + user?._id)
    //         if (uploadedProducts.success) {
    //             setUserReviews(getReviews.userReviews)
    //             setShowSpinner3(false)
    //         }
    //         const getBids = await http.post('/get-user-bids', {userId: user?._id})
    //         if (getBids.success) {
    //             setUserBids(getBids.userBids)
    //             setShowSpinner2(false)
    //         }
    //         const getWon = await http.post('/get-user-winnings', {userId: user?._id})
    //         if (getWon.success) {
    //             setWonBids(getWon.winnings)
    //             setShowSpinner4(false)
    //         }
    //     }
    //
    // }, [user])


    return (
        <div className="header-container_ ">
            <div className="header-toolbar mx-10 d-flex justify-content-between column-responsive-medium">
                <div
                    className={getState === 1 ? "header-tabs color" : "header-tabs"}
                    onClick={() => selectedTab(1)}>
                    <p>Įkeltos prekės<span className='hide'>&nbsp;</span></p>
                    <p className='break-word'>({userUploadedProducts.length})</p>
                </div>
                <div
                    className={getState === 2 ? "header-tabs color" : "header-tabs"}
                    onClick={() => selectedTab(2)}>
                    <p>Stebimi aukcionai<span className='hide'>&nbsp;</span></p>
                    <p className='break-word'>({getUserBids.length})</p>
                </div>
                <div
                    className={getState === 4 ? "header-tabs color" : "header-tabs"}
                    onClick={() => selectedTab(4)}>
                    <p>Laimėti <span className='break-word'>aukcionai</span><span className='hide'>&nbsp;</span></p>
                    <p className='break-word'>({getWonBids?.length})</p>
                </div>
                <div
                    className={getState === 3 ? "header-tabs color" : "header-tabs"}
                    onClick={() => selectedTab(3)}>
                    <p>Atsiliepimai<span className='hide'>&nbsp;</span></p>
                    <p className='break-word'>({userReviews?.length})</p>
                </div>

            </div>
        </div>
    );
};

export default Header;