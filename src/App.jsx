import React from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import Hero from './components/Hero';
import WishesCards from './components/WishesCards';
import PhotoGallery from './components/PhotoGallery';
import PersonalMessage from './components/PersonalMessage';
import AgeMilestone from './components/AgeMilestone';
import Footer from './components/Footer';

function App() {
  return (
    <main className="relative w-full bg-[#030209] text-gray-100 overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
      <InteractiveBackground />
      <div className="relative z-10 w-full">
        <Hero />
        <WishesCards />
        <PhotoGallery />
        <PersonalMessage />
        <AgeMilestone />
        <Footer />
      </div>
    </main>
  );
}

export default App;
