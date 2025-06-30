import React from 'react'

import Header from "../Header/Header";
import Navbar from "../NavBar/Navbar"
import MesoOne from "../Meso-one/MesoOne"
import HomeSix from "../Home-six/HomeSix"
import Hometwo from "../Home-two/Hometwo"
import HomeThree from "../Home-three/HomeThree"
import HomeFour from "../Home-four/HomeFour"
import Footer from "../Footer/Footer"
import HomeFive from "../Home-five/HomeFive"
import HomeSeven from '../Home-Seven/HomeSeven';
import CLAIMFORMPage2 from "../../Components/Home-Eight/HomeEight"

function MesoMain() {
    return (
        <div className='w-auto h-full overflow-hidden'>
            {/* <Header /> */}
            <Navbar />
            <MesoOne />
            <Hometwo />
            <HomeThree />
            <HomeFour />
            <HomeFive />
            <HomeSix />
            <HomeSeven />
            <CLAIMFORMPage2 />
            <Footer />
        </div>
    )
}

export default MesoMain
