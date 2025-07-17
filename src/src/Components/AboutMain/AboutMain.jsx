import React from 'react';
import About from "../Components/About/About"
import AboutUs2 from "../Components/About2/AboutUs2"
import AboutUs3 from "../Components/About3/AboutUs3"
import AboutUs4 from "../Components/About4/AboutUs4"
import AboutUs5 from "../Components/About5/AboutUs5"
import AboutUs6 from "../Components/About6/AboutUs6"
import AboutUs7 from "../Components/About7/AboutUs7"
import Navbar from './NavBar/Navbar';
import Footer from "../Components/Footer/Footer"
import Header from './Header/Header';

const AboutMain = () => {
  return (
    <div>
      {/* <Header /> */}
      <Navbar />
      <About/>
      <AboutUs2/>
      <AboutUs3/>
      <AboutUs4/>
      <AboutUs5/>
      <AboutUs6/>
      <AboutUs7/>
      <Footer/>
      {/* <Mesousa2/> */}
    </div>
  );
};

export default AboutMain;
