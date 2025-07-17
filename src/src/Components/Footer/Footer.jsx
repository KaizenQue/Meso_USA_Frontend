import React, { useState } from 'react';
import facebook from '../../assets/f.svg';
import twitter from '../../assets/twitter.svg';
import linkedin from '../../assets/linkedin.svg';
import instagram from '../../assets/insta.svg';
import emailImg from '../../assets/email.svg';
import logo from '../../assets/Meso logo-01 1.png'
import { NavLink } from 'react-router-dom';
import { sendNewsletterSubscription } from '../../utils/emailService';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setSubscriptionStatus('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        // try {
        //     const result = await sendNewsletterSubscription(email, 'Footer');
            
        //     if (result.success) {
        //         setSubscriptionStatus('Thank you for subscribing!');
        //         setEmail(''); // Clear input after successful subscription
        //     } else {
        //         setSubscriptionStatus('Subscription failed. Please try again.');
        //     }
        // } catch (error) {
        //     console.error('Subscription error:', error);
        //     setSubscriptionStatus('An error occurred. Please try again.');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <div className="w-full bg-[#faf3ec] text-[#4b2c5e] font-helvetica">
            <div className="bg-[#dcc0a7] w-full pt-8 pb-4 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                        {/* Logo Section */}
                        <div className="flex justify-center md:justify-start">
                            <a href="/">
                                <img
                                    src={logo}
                                    alt="Mesotheliamo Logo"
                                    className="h-auto w-[180px] sm:w-[200px] md:mt-0 lg:mt-0"
                                />
                            </a>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col space-y-3 items-center md:items-start md:pl-8 lg:pl-12">
                            <NavLink
                                to="/"
                                style={{ textDecoration: 'none' }}
                                className={({ isActive }) =>
                                    `font-helvetica font-normal text-[18px] sm:text-[20px] lg:text-[24px] cursor-pointer ${isActive ? 'text-[#2E4A7D]' : 'text-[#4B2C5E]'
                                    }`
                                }
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/MesothMainPage"
                                style={{ textDecoration: 'none' }}
                                className={({ isActive }) =>
                                    `font-helvetica font-normal text-[18px] sm:text-[20px] lg:text-[24px] cursor-pointer ${isActive ? 'text-[#2E4A7D]' : 'text-[#4B2C5E]'
                                    }`
                                }
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Mesothelioma
                            </NavLink>
                            <NavLink
                                to="/AboutMain"
                                style={{ textDecoration: 'none' }}
                                className={({ isActive }) =>
                                    `font-helvetica font-normal text-[18px] sm:text-[20px] lg:text-[24px] cursor-pointer ${isActive ? 'text-[#2E4A7D]' : 'text-[#4B2C5E]'
                                    }`
                                }
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                About us
                            </NavLink>
                        </div>

                        {/* Newsletter Section */}
                        <div className="flex flex-col space-y-4 mt-6 md:mt-0 px-2 md:px-0 ml-0 md:ml-0 w-full max-w-[436px] mx-auto md:mx-0">
                            <form onSubmit={handleSubscribe} className="w-full">
                                <b className="block text-[16px] md:text-[17px] lg:text-[20px] xl:text-[22px] mb-4 font-bold font-helvetica text-center md:text-left">
                                    Subscribe to our newsletter
                                </b>
                                <div className="flex flex-col sm:flex-row sm:gap-0 w-full">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email id"
                                        className="flex-1 min-w-[80px] md:min-w-[120px] rounded-[10px] sm:rounded-l-[10px] sm:rounded-r-none border-2 border-[#4B2C5E] px-2 sm:px-3 md:px-3 lg:px-5 xl:px-6 py-1.5 sm:py-2 md:py-2 lg:py-3 xl:py-3.5 text-[12px] sm:text-[13px] md:text-[13px] lg:text-[15px] xl:text-[16px] outline-none bg-[#DCC0A7] placeholder-[#4B2C5E]"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`rounded-[10px] sm:rounded-l-none sm:rounded-r-[10px] bg-[#4b2c5e] px-2 sm:px-3 md:px-3 lg:px-4 xl:px-5 py-1.5 sm:py-2 md:py-2 lg:py-2.5 xl:py-3 text-[#f8f2e9] text-[12px] sm:text-[13px] md:text-[13px] lg:text-[15px] xl:text-[16px] transition-all duration-300 flex items-center justify-center min-w-[70px] sm:min-w-[80px] md:min-w-[80px] lg:min-w-[100px] xl:min-w-[120px] flex-shrink-0 ${
                                            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#3a2247]'
                                        }`}
                                        style={{maxWidth: '100%'}}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-[10px] sm:text-xs lg:text-sm">Subscribing...</span>
                                            </>
                                        ) : (
                                            <b className="text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-base">Subscribe</b>
                                        )}
                                    </button>
                                </div>
                                {subscriptionStatus && (
                                    <div className="mt-2 text-[14px] md:text-[15px] lg:text-[18px] xl:text-[20px] text-center sm:text-left">
                                        {subscriptionStatus}
                                    </div>
                                )}
                            </form>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2 sm:gap-4 mt-6 md:mt-8 w-full">
                                <img className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 mx-auto sm:mx-0 flex-shrink-0" alt="Email icon" src={emailImg} />
                                <a className="text-[13px] sm:text-[14px] md:text-[12px] lg:text-[16px] xl:text-[17px] underline leading-[22px] sm:leading-[28px] lg:leading-[32px] xl:leading-[34px] font-helvetica text-[#4B2C5E] text-center sm:text-left break-words sm:break-normal hover:text-[#3a2247] transition-colors duration-200"
                                    href="mailto:reachus@fightformesothelioma.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    reachus@fightformesothelioma.com
                                </a>
                            </div>

                            {/* Contact Info */}
                        </div>

                    </div>

                    {/* Footer Bottom */}
                    <div className="mt-8 pt-4 border-t border-[#f3e2c8] flex flex-col sm:flex-row items-center justify-between text-[rgba(75,44,94,0.66)]">
                        <div className="text-center sm:text-left mb-4 sm:mb-0 text-[12px] sm:text-[14px]">
                            <span className="text-[14px] sm:text-[16px]  font-medium font-helvetica text-[rgba(75,44,94,0.66)] mr-1">©</span>
                            <span>2025.</span> 
                            <span className="ml-1">All rights reserved &nbsp;</span>
                            <a href="/PrivacyPolicy" className="underline hover:text-blue-200">
                                privacy policy
                            </a>{' '}
                            and{' '}
                            <a href="/Disclaimer" className="underline hover:text-blue-200">
                                disclaimer
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex space-x-2 sm:space-x-4">
                                <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]">
                                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                        <img className="w-full h-full" alt="Facebook" src={facebook} />
                                    </a>
                                </div>
                                <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]">
                                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                        <img className="w-full h-full" alt="Twitter" src={twitter} />
                                    </a>
                                </div>
                                <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]">
                                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                        <img className="w-full h-full" alt="LinkedIn" src={linkedin} />
                                    </a>
                                </div>
                                <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]">
                                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                        <img className="w-full h-full" alt="Instagram" src={instagram} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;