import React from 'react'
import MesthOne from '../Mesoth-One/MesthOne'
import MesothTwo from "../Mesoth-two/MesothTwo"
import MesothThree from "../Mesoth-Three/MesothThree"
import Header from "../../Header/Header";
import Navbar from "../../NavBar/Navbar";
import MesoFAQ from "../Mesoth-faq/MesoFAQ";
import Footer from "../../Footer/Footer"
import MesothFourth from '../Mesoth-Fourth/MesothFour';
import MesothFive from '../Mesoth-Five/MesothFive';
import HomeEight from '../../Home-Eight/HomeEight';


function MesothMainPage() {
  return (
    <div>
      {/* <Header /> */}
      <Navbar />
      <MesthOne />
      <MesothTwo />
      <MesothFive />

      <MesothFourth />
      <MesothThree />
     <MesoFAQ />
     {/* <HomeEight /> */}
     <Footer />
    </div>
  )
}

export default MesothMainPage