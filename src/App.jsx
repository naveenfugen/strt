import React from 'react';
import Hero from './components/Hero';
import WishesCards from './components/WishesCards';
import PhotoGallery from './components/PhotoGallery';
import PersonalMessage from './components/PersonalMessage';
import AgeMilestone from './components/AgeMilestone';
import Footer from './components/Footer';

function App() {
  return (
    <main className="w-full bg-deepNavy text-gray-100 overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
      <Hero />
      <WishesCards />
      <PhotoGallery />
      <PersonalMessage />
      <AgeMilestone />
      <Footer />
    </main>
  );
}

export default App;
