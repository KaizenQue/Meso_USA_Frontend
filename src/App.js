/* eslint-disable no-undef */
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import MesoOne from "./Components/Meso-one/MesoOne";
import Header from "./Components/Header/Header";
import MesoMain from "./Components/Meso-MainPage/MesoMain";
import HomeSix from "./Components/Home-six/HomeSix";
import Womenandmesothelioma from "./Components/Womenandmesothelioma"
import Disclaimer from "./Components/Disclaimer"
import PrivacyPolicy from "./Components/PrivacyPolicy"
import AutoMobile from "./Components/AutoMobile"
import MesoConstruction from "./Components/MesoConstruction"
import Hometwo from "./Components/Home-two/Hometwo";
import MesothMainPage from "./Components/MesotheliomaPage/MesothMainPage/MesothMainPage";
import AboutMain from "./Components/AboutMain"
import HomeEight from "./Components/Home-Eight/HomeEight"
import ClaimForm from "./Components/ClaimForm/ClaimForm"
import "leaflet/dist/leaflet.css";
import MesotheliomaLandingPage from "./Components/FigmaDesign/MesotheliomaLandingPage.jsx"
import MesoAutoMobile from "./Components/MesoAutoMobile.jsx"
import ChatInterface from "./Components/ChatPage/ChatInterface"
import Veterans from "./Components/Veterans"
import HeavyMachineryPlants from "./Components/HeavyManufacturingPlants"
import OilRefineries from "./Components/OilRefinery"
import PaperMills from "./Components/PaperMills"
import PowerPlants from "./Components/PowerPlant"
import Shipyards from "./Components/Shipyard"
import SteelMills from "./Components/SteelMills"
import USNavyPersonal from "./Components/USNavyPersonal"
import MesoConstructionLander from "./Components/MesoConstructionLander"
import LandingPage4 from "./Components/LandingPage4"
import MesotheliomaLandingPage2 from "./Components/FigmaDesign/MesotheliomaLandingPage2.jsx"
import MesotheliomaLandingPage3 from "./Components/FigmaDesign/MesotheliomaLandingPage3.jsx"
import MesotheliomaLandingPage4 from "./Components/FigmaDesign/MesotheliomaLandingPage4.jsx"
import MesotheliomaLandingPage5 from "./Components/FigmaDesign/MesotheliomaLandingPage5.jsx"
import MesotheliomaLandingPage6 from "./Components/FigmaDesign/MesotheliomaLandingPage6.jsx"
import MesotheliomaLandingPage7 from "./Components/FigmaDesign/MesotheliomaLandingPage7.jsx"
import MesotheliomaLandingPage8 from "./Components/FigmaDesign/MesotheliomaLandingPage8.jsx"
import MesotheliomaLandingPage9 from "./Components/FigmaDesign/MesotheliomaLandingPage9.jsx"
import MesotheliomaLandingPage10 from "./Components/FigmaDesign/MesotheliomaLandingPage10.jsx"
import SubLanderOne from "./Components/SubLanderOne"
import SubLanderTwo from "./Components/SublanderTwo.jsx"
import SubLanderThree from "./Components/SubLanderThree"
import SubLanderFour from "./Components/SubLanderFour"
import SubLanderFive from "./Components/SubLanderFive"
import SubLanderSix from "./Components/SubLanderSix"
import SubLanderSeven from "./Components/SubLanderSeven"
import SubLanderEight from './Components/SubLanderEight.jsx';
import MesotheliomaLandingPageNew from './FigmaDesign2/MesotheliomaLandingPageNew.jsx';
import ChatInterface2 from './Components/ChatPage/ChatInterface2.jsx';
import ChatInterface3 from './Components/ChatPage/ChatInterface3.jsx';
import MesotheliomaLandingPageNew2 from './FigmaDesign2/MesotheliomaLandingPageNew2.jsx';
import MesotheliomaLandingPageNew3 from './FigmaDesign2/MesotheliomaLandingPageNew3.jsx';
import MesotheliomaLandingPageNew7 from './FigmaDesign2/MesotheliomaLandingPageNew7.jsx';
import MesotheliomaLandingPageNew8 from './FigmaDesign2/MesotheliomaLandingPageNew8.jsx';
import MesotheliomaLandingPageNew9 from './FigmaDesign2/MesotheliomaLandingPageNew9.jsx';
import MesotheliomaLandingPageNew4 from './FigmaDesign2/MesotheliomaLandingPageNew4.jsx';
import MesotheliomaLandingPageNew5 from './FigmaDesign2/MesotheliomaLandingPageNew5.jsx';
import MesotheliomaLandingPageNew6 from './FigmaDesign2/MesotheliomaLandingPageNew6.jsx';
import LanderOne from './Components/ui/LanderOne';
import ChatInterface4 from './Components/ChatPage/ChatInterface4.jsx';
import MesotheliomaLandingPageLatest1 from './FigmaDesign2/MesotheliomaLandingPageLatest1.jsx';
import MesotheliomaLandingPageLatest2 from './FigmaDesign2/MesotheliomaLandingPageLatest2.jsx';
import MesotheliomaLandingPageLatest3 from './FigmaDesign2/MesotheliomaLandingPageLatest3.jsx';
import MesotheliomaLandingPageLatest4 from './FigmaDesign2/MesotheliomaLandingPageLatest4.jsx';
import MesotheliomaLandingPageLatest5 from './FigmaDesign2/MesotheliomaLandingPageLatest5.jsx';
import MesotheliomaLandingPageLatest6 from './FigmaDesign2/MesotheliomaLandingPageLatest6.jsx';
import MesotheliomaLandingPageLatest7 from './FigmaDesign2/MesotheliomaLandingPageLatest7.jsx';
import MesotheliomaLandingPageLatest8 from './FigmaDesign2/MesotheliomaLandingPageLatest8.jsx';
import MesotheliomaLandingPageLatest9 from './FigmaDesign2/MesotheliomaLandingPageLatest9.jsx';
import MesotheliomaLandingPageLatest10 from './FigmaDesign2/MesotheliomaLandingPageLatest10.jsx';
import MesotheliomaLandingPageLatest11 from './FigmaDesign2/MesotheliomaLandingPageLatest11.jsx';
import MesotheliomaLandingPageLatest12 from './FigmaDesign2/MesotheliomaLandingPageLatest12.jsx';
import MesotheliomaLandingPageLatest13 from './FigmaDesign2/MesotheliomaLandingPageLatest13.jsx';
import MesotheliomaLandingPageLatest14 from './FigmaDesign2/MesotheliomaLandingPageLatest14.jsx';
import MesotheliomaLandingPageLatest15 from './FigmaDesign2/MesotheliomaLandingPageLatest15.jsx';
import MesotheliomaLandingPageLatest16 from './FigmaDesign2/MesotheliomaLandingPageLatest16.jsx';
import MesotheliomaLandingPageLatest17 from './FigmaDesign2/MesotheliomaLandingPageLatest17.jsx';
import MesotheliomaLandingPageLatest18 from './FigmaDesign2/MesotheliomaLandingPageLatest18.jsx';
import MesotheliomaLandingPageLatest19 from './FigmaDesign2/MesotheliomaLandingPageLatest19.jsx';
import AudioLanderOne from './Components/AudioLanders/AudioLanderOne';
import MesotheliomaLandingPageTest from './Components/FigmaDesign/MesotheliomaLandingPageTest';
import VideoModalPlayer from './Components/FigmaDesign/VideoModalPlayer';
import VideoOne from './Components/VideoCall/VideoOne.jsx';

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MesoMain />,
    },
    {
      path: '/MesoOne',
      element: <MesoOne />,
    },
    {
      path: '/Header',
      element: <Header />,
    },
    {
      path: '/HomeSix',
      element: <HomeSix />,
    },
    {
      path: '/HomeEight',
      element: <HomeEight />,
    },
    {
      path: '/Hometwo',
      element: <Hometwo />,
    },

    {
      path: '/MesothMainPage',
      element: <MesothMainPage />,
    },
    {
      path: '/AboutMain',
      element: <AboutMain />,
    },
    {
      path: '/ClaimForm',
      element: <ClaimForm />,
    },
    {
      path: '/Disclaimer',
      element: <Disclaimer />,
    },
    {
      path: '/PrivacyPolicy',
      element: <PrivacyPolicy />,
    },
    {
      path: '/Womenandmesothelioma',
      element: <Womenandmesothelioma />,
    },
    
    {
      path: '*',
      element: <h1>404 - Page Not Found</h1>,
    },
    {
      path: '/construction-industry-mesothelioma-claims',
      element: <MesoConstruction />,
    },
    {
      path: '/automobile-industry-mesothelioma-claims',
      element: <MesoAutoMobile />,
    },
    {
      path: '/veterans-mesothelioma-claims',
      element: <Veterans />,
    },
    {
      path: '/heavy-manufacturing-plants-mesothelioma-claims',
      element: <HeavyMachineryPlants />,
    },
    {
      path: '/oil-refineries-mesothelioma-claims',
      element: <OilRefineries />,
    },
    {
      path: '/paper-mills-mesothelioma-claims',
      element: <PaperMills />,
    },
    {
      path: '/power-plants-mesothelioma-claims',
      element: <PowerPlants />,
    },
    {
      path: '/shipyards-mesothelioma-claims',
      element: <Shipyards />,
    },
    {
      path: '/steel-mills-mesothelioma-claims',
      element: <SteelMills />,
    },
    {
      path: '/USNavy-mesothelioma-asbestos-claims',
      element: <USNavyPersonal />,
    },
    {
      path: '/construction-industry-asbestos-exposure-mesothelioma-claims',
      element: <MesotheliomaLandingPage />,
    },
    {
      path: '/automobile-industry-asbestos-exposure-mesothelioma-claims',
      element: <MesotheliomaLandingPage2 />,
    },
    {
      path: '/MesotheliomaLandingPage3',
      element: <MesotheliomaLandingPage3 />,
    },
    {
      path: '/MesotheliomaLandingPage4',
      element: <MesotheliomaLandingPage4 />,
    },
    {
      path: '/MesotheliomaLandingPage5',
      element: <MesotheliomaLandingPage5 />,
    },
    {
      path: '/shipyards-asbestos-exposure-mesothelioma-claims',
      element: <MesotheliomaLandingPage6 />,
    },
    {
      path: '/veterans-asbestos-exposure-mesothelioma-claims',
      element: <MesotheliomaLandingPage7 />,
    },
    {
      path: '/steel-mills-asbestos-exposure-mesothelioma-claims',
      element: <MesotheliomaLandingPage8 />,
    },
    {
      path: '/USNavy-asbestos-exposure-mesothelioma-claims',
      element: <MesotheliomaLandingPage9 />,
    },
    {
      path: '/MesotheliomaLandingPage10',
      element: <MesotheliomaLandingPage10 />,
    },
    {
      path: '/auto-mechanic-mesothelioma-claim',
      element: <SubLanderOne />,
    },
    {
      path: '/mesothelioma-claims-pipefitters',
      element: <SubLanderTwo />,
    },
    {
      path: '/mesothelioma-claims-steamfitter',
      element: <SubLanderThree />,
    },
    {
      path: '/mesothelioma-claims-machinistmate',
      element: <SubLanderFour />,
    },
    {
      path: '/mesothelioma-claim-boilermaker',
      element: <SubLanderFive />,
    },
    {
      path: '/mesothelioma-claim-furnace-kiln',
      element: <SubLanderSix />,
    },
    {
      path: '/mesothelioma-claim-insulator',
      element: <SubLanderSeven />,
    },
    {
      path: '/mesothelioma-claim-laborer',
      element: <SubLanderEight />,
    },
    {
      path: '/mesothelioma-claims-construction-industry',
      element: <MesoConstructionLander />,
    },
    {
      path: '/mesothelioma-claim-manufacturing-workers-cc1',
      element: <MesotheliomaLandingPageNew />,
    },
    {
      path: '/mesothelioma-claim-manufacturing-workers-cc2',
      element: <MesotheliomaLandingPageNew2 />,
    },
    {
      path: '/mesothelioma-claim-manufacturing-workers-cc3',
      element: <MesotheliomaLandingPageNew3 />,
    },
    {
      path: '/mesothelioma-claim-manufacturing-workers-cc4',
      element: <MesotheliomaLandingPageNew4 />,
    },
    {
      path: '/mesothelioma-claim-contruction-workers-cc2',
      element: <MesotheliomaLandingPageNew5 />,
    },
    {
      path: '/mesothelioma-claim-automechanics-workers-cc3',
      element: <MesotheliomaLandingPageNew6 />,
    },
    {
      path: '/mesothelioma-claim-manufacturing-workers-cc5',
      element: <MesotheliomaLandingPageNew7 />,
    },
    {
      path: '/mesothelioma-claim-contruction-workers-cc6',
      element: <MesotheliomaLandingPageNew8 />,
    },
    {
      path: '/mesothelioma-claim-automechanics-workers-cc7',
      element: <MesotheliomaLandingPageNew9 />,
    },
  
    {
      path: '/mesothelioma-claims-us-navy-veterans',
      element: <MesotheliomaLandingPageLatest1 />,
    },
    {
      path: '/mesothelioma-claims-shipyard-workers',
      element: <MesotheliomaLandingPageLatest2 />,
    },
    {
      path: '/mesothelioma-claims-refinery-workers',
      element: <MesotheliomaLandingPageLatest3 />,
    },
    {
      path: '/mesothelioma-claims-steel-plant-workers',   
      element: <MesotheliomaLandingPageLatest4 />,
    },
    {
      path: '/mesothelioma-claims-power-plant-workers',
      element: <MesotheliomaLandingPageLatest5 />,
    },
    {
      path: '/mesothelioma-claims-paper-mill-workers',
      element: <MesotheliomaLandingPageLatest6 />,
    },
    {
      path: '/mesothelioma-claims-heavy-manufacturing',
      element: <MesotheliomaLandingPageLatest7 />,
    },
    {
      path: '/mesothelioma-claims-automotive',
      element: <MesotheliomaLandingPageLatest8 />,
    },
    {
      path: '/mesothelioma-auto-mechanic-lawsuit',
      element: <MesotheliomaLandingPageLatest9 />,
    },
    {
      path: '/mesothelioma-pipefitter-lawsuit',
      element: <MesotheliomaLandingPageLatest10 />,
    },
    {
      path: '/mesothelioma-machinist-navy-lawsuit',
      element: <MesotheliomaLandingPageLatest11 />,
    },
    {
      path: '/mesothelioma-boilermaker-lawsuit',
      element: <MesotheliomaLandingPageLatest12 />,
    },
    {
      path: '/mesothelioma-furnace-kiln-operator-lawsuit',
      element: <MesotheliomaLandingPageLatest13 />,
    },
    {
      path: '/mesothelioma-insulator-lawsuit',
      element: <MesotheliomaLandingPageLatest14 />,
    },
    {
      path: '/mesothelioma-laborer-lawsuit',
      element: <MesotheliomaLandingPageLatest15 />,
    },
    {
      path: '/mesothelioma-maintenance-mechanic-lawsuit',
      element: <MesotheliomaLandingPageLatest16 />,
    },
    {
      path: '/mesothelioma-steel-worker-lawsuit',
      element: <MesotheliomaLandingPageLatest17 />,
    },
    {
      path: '/mesothelioma-millwright-lawsuit',
      element: <MesotheliomaLandingPageLatest18 />,
    },
    {
      path: '/mesothelioma-construction-worker-lawsuit',
      element: <MesotheliomaLandingPageLatest19 />,
    },
    {
      path: '/mesothelioma-cb1',
      element: <ChatInterface />,
    },
    {
      path: '/mesothelioma-cb2',
      element: <ChatInterface2 />,
    },
    {
      path: '/mesothelioma-cb3',
      element: <ChatInterface3 />,
    },
    {
      path:'/VideoOne',
      element: <VideoOne />
    },
    {
      path:'/AR1',
      element: <AudioLanderOne />
    },
    {
      path:'/VR1',
      element: <MesotheliomaLandingPageTest />
    },
    {
      path:'/t',
      element: <VideoModalPlayer/>
    }
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
