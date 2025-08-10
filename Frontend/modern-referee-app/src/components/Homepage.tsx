'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NavItem, TrainingModuleProps } from '@/types';
import EnhancedTrainingModule from './EnhancedTrainingModule';
import AchievementNotification from './AchievementNotification';

const navigationItems: NavItem[] = [
  { label: 'Center Referee', href: '#crAssistance' },
  { label: 'Assistant Referee', href: '#arAssistance' },
  { label: 'Rule Book', href: 'https://www.ncaa.org/sports/2013/12/2/soccer-rules-of-the-game.aspx', external: true },
  { label: 'Gear Store', href: 'https://officialsports.com', external: true },
];

const centerRefereeModules: TrainingModuleProps[] = [
  {
    title: 'Hand Signals',
    description: 'Learn and practice proper referee hand signals',
    detailedDescription: 'The role of a center referee in soccer is of paramount importance, as they are responsible for maintaining order and ensuring fair play on the field. Their authority is conveyed through precise hand signals, which serve as a universal language, effectively communicating decisions to players and spectators alike. These signals not only enhance the flow of the game but also foster an atmosphere of trust and respect between all parties involved. Without the center referee\'s guidance, the game\'s integrity and safety could be compromised, making their presence and hand signals indispensable components of a successful and enjoyable soccer match.',
    href: '/handSignals/handSignals.html',
    imageSrc: '/images/handSignals.png',
    imageAlt: 'Hand Signals Training',
  },
  {
    title: 'Whistle Techniques',
    description: 'Master different whistle patterns and techniques',
    detailedDescription: 'The center referee\'s whistle fluctuations hold immense significance, acting as a catalyst for action and decision-making. Each whistle blow commands attention, signifying the start, stop, or modification of play. The sound of the whistle creates a moment of pause and reflection, allowing players to understand the referee\'s call and respond accordingly. The whistle\'s symbolic power instills a sense of order and authority, shaping the dynamics of the game. The center referee\'s ability to control the match\'s tempo and maintain fair play through their whistle fluctuations exemplifies their pivotal role in ensuring the game\'s smooth progression and adherence to the rules.',
    href: '/whistle/whistle.html',
    imageSrc: '/images/whistleFlunctuations.png',
    imageAlt: 'Whistle Training',
  },
];

const assistantRefereeModules: TrainingModuleProps[] = [
  {
    title: 'AR Hand Signals',
    description: 'Assistant referee specific hand signals',
    detailedDescription: 'Flag signals from an assistant soccer referee are vital for effective communication and decision-making on the field. These signals facilitate coordination with the center referee, ensuring accurate calls on offside, fouls, and corner kicks, among other crucial aspects of the game. Their clear and timely gestures enhance match flow and fairness, while also contributing to player safety. As key members of the officiating team, assistant referees\' flag signals play a pivotal role in upholding the game\'s integrity and promoting a sense of trust among players and spectators. Without these signals, the match\'s dynamics and overall experience could be compromised, underscoring the significance of the assistant referee\'s role in soccer officiating. Skillful flag signals are an indispensable aspect of their contribution to a successful and enjoyable soccer match.',
    href: '/refereeAr/refereeAR.html',
    imageSrc: '/images/arWebsiteImage.png',
    imageAlt: 'AR Hand Signals',
  },
  {
    title: 'Offside Simulation',
    description: 'Practice offside decision making',
    detailedDescription: 'Practicing simulations of offside decisions is of paramount importance for assistant referees in soccer. These exercises hone their ability to make accurate and split-second judgments on offside calls during intense match situations. By repeatedly analyzing and reacting to offside scenarios, assistant referees develop a keen sense of positioning, timing, and visual acuity. This rigorous preparation ensures they can confidently raise their flag to signal an offside infraction with precision and confidence. Through practice, assistant referees also enhance their collaboration with the center referee, contributing to seamless officiating teamwork. Such dedicated training instills the confidence required to maintain the integrity of the game, making simulations an indispensable and influential aspect of an assistant referee\'s preparation and performance.',
    href: '/gameSimulation/gameSimulation.html',
    imageSrc: '/images/gameSimulation.png',
    imageAlt: 'Game Simulation',
  },
];

export default function Homepage() {
  const [showMenu, setShowMenu] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleNavClick = (item: NavItem) => {
    if (item.external) {
      window.open(item.href, '_blank');
    } else if (item.href.startsWith('/')) {
      // Handle internal page navigation
      window.location.href = item.href;
    } else {
      // Handle anchor links (like #crAssistance)
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9F8]">
      <AchievementNotification />
      {/* Header */}
      <header className="bg-[#F8F9F8] shadow-sm sticky top-0 z-30 border-b border-[#D9DED9]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/images/ussf-logo.png"
                alt="USSF Referee Logo"
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="text-[#1B1B1B] hover:text-[#4FA37E] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}

              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-[#1B1B1B] hover:text-[#4FA37E] p-2"
              >
                <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMenu && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#F8F9F8] border-t border-[#D9DED9]">
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="text-[#1B1B1B] hover:text-[#4FA37E] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}

              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2F6B4F] to-[#4FA37E] text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Ready to Be a Great Referee?
          </h1>
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
            <p className="text-lg sm:text-xl leading-relaxed px-2 sm:px-0">
              Master the skills, build your confidence, and lead with authority! 
              Whether you&apos;re just starting or looking to improve, our interactive training 
              modules will help you become the referee you want to be.
            </p>
          </div>
          
          <a
            href="https://www.ussoccer.com/referee-program"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FFFFFF] text-[#1B1B1B] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#F8F9F8] transition-colors text-sm sm:text-base"
          >
            Join the Referee Team
          </a>
        </div>
      </section>

      {/* Center Referee Section */}
      <section id="crAssistance" className="py-12 sm:py-16 bg-[#F8F9F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-3 sm:mb-4">
              Be the Center Referee
            </h2>
            <p className="text-lg sm:text-xl text-[#5F6E65] max-w-3xl mx-auto px-2 sm:px-0">
              Lead the game with confidence and authority. Master positioning, communication, 
              and decision-making skills that make great center referees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {centerRefereeModules.map((module) => (
              <EnhancedTrainingModule key={module.title} {...module} />
            ))}
          </div>
        </div>
      </section>

      {/* Assistant Referee Section */}
      <section id="arAssistance" className="py-12 sm:py-16 bg-[#F8F9F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-3 sm:mb-4">
              Support the Game
            </h2>
            <p className="text-lg sm:text-xl text-[#5F6E65] max-w-3xl mx-auto px-2 sm:px-0">
              Master the art of assistant refereeing. Learn positioning, flag signals, and 
              teamwork skills that support the center referee and ensure fair play.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {assistantRefereeModules.map((module) => (
              <EnhancedTrainingModule key={module.title} {...module} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F6B4F] text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-[#E5EDE9] text-sm mb-4">
                Soccer Referee Assistant Platform - Helping referees improve their skills and knowledge.
              </p>
              <button
                onClick={() => setShowAbout(true)}
                className="text-[#4FA37E] hover:text-[#F4B400] text-sm transition-colors"
              >
                Learn more about me →
              </button>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                                              <a href="#crAssistance" className="text-[#E5EDE9] hover:text-white transition-colors">
                    Center Referee Training
                  </a>
                </li>
                <li>
                                              <a href="#arAssistance" className="text-[#E5EDE9] hover:text-white transition-colors">
                    Assistant Referee Training
                  </a>
                </li>
                <li>
                                              <a href="https://www.ussoccer.com/referee-program" target="_blank" rel="noopener noreferrer" className="text-[#E5EDE9] hover:text-white transition-colors">
                    Register as Referee
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex flex-wrap w-24 gap-2">
                <a
                  href="https://www.venmo.com/u/Krishaan-Bhagat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E5EDE9] hover:text-white transition-colors inline-block"
                  aria-label="Venmo"
                >
                  <img 
                    src="https://img.icons8.com/?size=100&id=102678&format=png&color=000000" 
                    alt="Venmo" 
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </a>
                <a
                  href="mailto:krishaanb@gmail.com"
                  className="text-[#E5EDE9] hover:text-white transition-colors text-2xl inline-block"
                  aria-label="Email"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a
                  href="https://www.instagram.com/krishaan.bhagat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E5EDE9] hover:text-white transition-colors text-2xl inline-block"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.linkedin.com/in/krishaan-bhagat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E5EDE9] hover:text-white transition-colors text-2xl inline-block"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#1F4633] mt-8 pt-8 text-center">
            <p className="text-[#E5EDE9] text-sm">
              © 2022 Krishaan Bhagat. All rights reserved. | Soccer Referee Assistant Platform
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom About Panel */}
      {showAbout && (
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
          {/* Bottom Panel */}
          <div className="h-[80vh] sm:h-96 bg-[#F8F9F8] shadow-xl transform transition-transform duration-300 ease-in-out pointer-events-auto border-t border-[#D9DED9] rounded-t-lg">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#D9DED9] bg-[#2F6B4F] text-white rounded-t-lg">
                <h2 className="text-lg font-semibold">About Me</h2>
                <button
                  onClick={() => setShowAbout(false)}
                  className="text-white hover:text-[#E5EDE9] transition-colors p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto bg-[#F8F9F8]">
                <div className="p-4 sm:p-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#2F6B4F] mb-2">Krishaan Bhagat</h3>
                      <p className="text-[#5F6E65] text-sm">Student at University of Wisconsin Madison</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <p className="text-[#5F6E65] text-sm leading-relaxed mb-4">
                          My journey started after playing <strong>4 years of varsity soccer</strong>. 
                          As I transitioned from playing to officiating, I have now been a part of prestigious 
                          leagues such as <strong>USL</strong>, <strong>MLS NEXT</strong>, and <strong>NISOA </strong> 
                          along with groups such as <strong>ECSR</strong>.
                        </p>
                        <p className="text-[#5F6E65] text-sm leading-relaxed">
                          This Soccer Referee Assistant Platform is designed to help referees at all levels 
                          improve their skills through interactive training modules, rule clarification, and 
                          practical guidance.
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-[#2F6B4F] to-[#4FA37E] rounded-lg p-4 text-white border border-[#1F4633]">
                          <p className="font-semibold mb-2">Support My Work</p>
                          <p className="text-sm mb-3 opacity-90">
                            Anything would be greatly appreciated!
                          </p>
                          <a
                            href="https://www.venmo.com/u/Krishaan-Bhagat/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#F4B400] text-[#1B1B1B] px-4 py-2 rounded-lg font-semibold hover:bg-[#F26B38] hover:text-white transition-colors text-sm"
                          >
                            @Krishaan-Bhagat
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
