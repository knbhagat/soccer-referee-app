import React, { useState } from "react";
import './Homepage.css';
import soccerLogo from '../resources/images/ussf-logo.png';
import arWeb from '../resources/images/arWebsiteImage.png';
import gameSimulationWeb from '../resources/images/gameSimulation.png';
import whistleFlunctuationsImg from '../resources/images/whistleFlunctuations.png';
import handSignalsWeb from '../resources/images/handSignals.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faBars } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

function Homepage () {
    const [showAbout, setAbout] = useState(false);
    const [showMenu, setMenu] = useState(false);

    return (
        <>
            <section id = "header">
                <nav>
                    <a href = "refereeHomePage.html">
                        <img src={soccerLogo} alt = "referee-logo" />
                    </a>
                    <div className = {showMenu ? "nav-links show": "nav-links"} id='topLinks' >
                        <FontAwesomeIcon icon={faX} id="close" onClick={(() => setMenu(false))}/>
                        <ul>
                        <li><a href="#crAssistance">CENTER</a></li>
                        <li><a href = "#arAssistance">ASSISTANT</a></li>
                        <li><a href = "https://www.ncaa.org/sports/2013/12/2/soccer-rules-of-the-game.aspx" >RULES</a></li>
                        <li><a href = "https://officialsports.com" >SHOP</a></li>
                        <li><a onClick={() => setAbout(true)}>ABOUT</a></li>
                        </ul>
                    </div>
                    <div id = "popUpBox" className = {showAbout ? 'show' : 'hide'}>
                        <div id = "closeContainer">
                            <FontAwesomeIcon icon={faX} id = "x" onClick={() => setAbout(false)}/>
                        </div>
                        <h3>
                        About Me
                        </h3>
                        <p>
                        Welcome to my refereeing page! 🏆
                        </p>
                        <p>
                        My name is Krishaan Bhagat. I am a student at the University of Wisconsin Madison. My journey started after playing 4 years of varsity soccer.
                        </p>
                        <p>
                        As I transitioned from playing to officiating, I have now been a part of prestigous leagues such as USL, MLS NEXT, and NISOA along with groups such as ECSR.
                        </p>
                        <p>
                        Thank you for visiting my page and being a part of my journey as a soccer referee.
                        </p>
                        <p>
                        My venmo link is below. Anything would be greatly appreciated!
                        </p>
                        <p id = "venmoLink">
                            <a href = "https://www.venmo.com/u/Krishaan-Bhagat/">
                            @Krishaan-Bhagat
                            </a>
                        </p>
                    </div>
                    <FontAwesomeIcon icon={faBars} id="menu" onClick={(() => setMenu(true))} />
                </nav>
                <div className = "text-box">
                <h1>
                    Welcome To Referee Assistance!
                </h1>
                <div className = "paragraphHolder">
                    <p> 
                    Our website is your ultimate destination for all things related to soccer refereeing. Whether you're a grassroot/beginner referee or a seasoned official, we've got you covered with expert insights, visualizations, and tips to enhance your skills on the field.
                    Discover the precise hand signals that convey a universal language of authority and trust between referees, players, and spectators. Immerse yourself in the world of whistle fluctuations, where each blow commands attention, shaping the dynamics of the game.
                    Step onto the pitch with confidence and make a lasting impact as a soccer referee. Let's blow the whistle and make every game a remarkable experience! ⚽️
                    </p>
                </div>
                <a href = "https://www.ussoccer.com/referee-program" className = "register">Click To Register As A Referee</a>
                </div>
            </section>
            <section id = "crAssistance">
                <h1>
                Center Referee Assistance
                </h1>
                <div className = "condensePar">
                <p>
                    The center referee wields absolute authority, orchestrating the game with unwavering command, and ensuring the sanctity of soccer's essence.
                </p>
                </div>
                <div className = "row">
                    <div className = "centerRef-col">
                        <img src = {handSignalsWeb} alt="" />
                        <a href = "/handSignals/handSignals.html">
                        <div className = "layer">
                            <h3>
                            Hand Signals
                            </h3>
                        </div>
                        </a>
                    </div>
                    <div className = "centerRef-col">
                        <img src = {whistleFlunctuationsImg} alt = "" />
                        <a href = "/whistle/whistle.html">
                        <div className = "layer">
                            <h3>
                            Whistle Fluctuations
                            </h3>
                        </div>
                        </a>
                    </div>
                </div>
                <div className = "row2">
                <div className = "centerRef-col">
                    <div className = "textLayer" id = "handSignalText">
                    <a href = "/handSignals/handSignals.html">
                        <h3>
                        Hand Signals
                        </h3>
                    </a>
                    <p>
                        The role of a center referee in soccer is of paramount importance, as they are responsible for maintaining order and ensuring fair play on the field. Their authority is conveyed through precise hand signals, which serve as a universal language, effectively communicating decisions to players and spectators alike. These signals not only enhance the flow of the game but also foster an atmosphere of trust and respect between all parties involved. Without the center referee's guidance, the game's integrity and safety could be compromised, making their presence and hand signals indispensable components of a successful and enjoyable soccer match.
                    </p>
                    </div>
                </div>
                <div className = "centerRef-col">
                    <div className = "textLayer">
                        <a href = "/whistle/whistle.html">
                            <h3>
                            Whistle Fluctuations
                            </h3>
                        </a>
                        <p>                       
                        The center referee's whistle fluctuations hold immense significance, acting as a catalyst for action and decision-making. Each whistle blow commands attention, signifying the start, stop, or modification of play. The sound of the whistle creates a moment of pause and reflection, allowing players to understand the referee's call and respond accordingly. The whistle's symbolic power instills a sense of order and authority, shaping the dynamics of the game. The center referee's ability to control the match's tempo and maintain fair play through their whistle fluctuations exemplifies their pivotal role in ensuring the game's smooth progression and adherence to the rules.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section id = "arAssistance">
            <h1>
            Assistant Referee Assistance
            </h1>
            <div className = "condensePar">
            <p>
                The assistant referee, a vital figure on the sidelines, aids the center referee by making critical offside calls and signaling essential match decisions in soccer games.
            </p>
            </div>
            <div className = "row">
                <div className = "assistantRef-col">
                <img src = {arWeb} alt = ""/>
                <a href = "/refereeAr/refereeAR.html">
                <div className = "layer">
                    <h3>
                    Flag Signals
                    </h3>
                </div>
                </a>
                </div>
                <div className = "assistantRef-col">
                    <img src = {gameSimulationWeb} alt="" />
                    <a href = "/gameSimulation/gameSimulation.html">
                        <div className = "layer">
                            <h3>
                            Game-Like Simulation
                            </h3>
                        </div>
                    </a>
                </div>
            </div>
            <div className = "row2">
            <div className = "assistantRef-col">
                <div className = "arTextLayer">
                <a href = "/refereeAr/refereeAR.html">
                    <h3>
                    Flag Signals
                    </h3>
                </a>
                <p>           
                    Flag signals from an assistant soccer referee are vital for effective communication and decision-making on the field. These signals facilitate coordination with the center referee, ensuring accurate calls on offside, fouls, and corner kicks, among other crucial aspects of the game. Their clear and timely gestures enhance match flow and fairness, while also contributing to player safety. As key members of the officiating team, assistant referees' flag signals play a pivotal role in upholding the game's integrity and promoting a sense of trust among players and spectators. Without these signals, the match's dynamics and overall experience could be compromised, underscoring the significance of the assistant referee's role in soccer officiating. Skillful flag signals are an indispensable aspect of their contribution to a successful and enjoyable soccer match.
                </p>
                </div>
            </div>
            <div className = "assistantRef-col">
                <div className = "arTextLayer">
                    <a href = "/gameSimulation/gameSimulation.html">
                        <h3>
                        Game-Like Simulation
                        </h3>
                    </a>
                    <p>      
                        Practicing simulations of offside decisions is of paramount importance for assistant referees in soccer. These exercises hone their ability to make accurate and split-second judgments on offside calls during intense match situations. By repeatedly analyzing and reacting to offside scenarios, assistant referees develop a keen sense of positioning, timing, and visual acuity. This rigorous preparation ensures they can confidently raise their flag to signal an offside infraction with precision and confidence. Through practice, assistant referees also enhance their collaboration with the center referee, contributing to seamless officiating teamwork. Such dedicated training instills the confidence required to maintain the integrity of the game, making simulations an indispensable and influential aspect of an assistant referee's preparation and performance.
                    </p>
                </div>
            </div>
            </div>
        </section>
        <section className = "footerContainer">
            <div className = "footer">
            <div className = "icons">
                <a href = "https://www.linkedin.com/in/krishaan-bhagat" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                <a href = "https://www.instagram.com/krishaan.bhagat/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
            <div className = "footerNav">
                <a href = "#header"> Back To The Top </a>
            </div>
            </div>
            <div className = "footerBot">
            <p>
                Copyright &copy;2023; Designed by 
                <span className = "designor">
                KRISHAAN BHAGAT 
                </span> 
            </p>
            </div>
        </section>
      </>
    );
}

export default Homepage;