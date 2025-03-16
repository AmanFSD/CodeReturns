import React from 'react';
import HomeCard from '../components/HomeCard';

const HomePage: React.FC = () => (
  <div style={{ padding: '20px 0', background: '#f4f4f4' }}>
    <HomeCard
      title="CODE WITH Kaz"
      buttonText="Join"
      image="/src/assets/images/image1.jpg"
      reversed={false}
      bgColor="#e8a7a7"
    />
    <HomeCard
      title="PYTHON FOR BUILD GAMES, WEB APPS, DATA SCIENCE, MACHINE LEARNING"
      buttonText="Join"
      image="/src/assets/images/image2.jpg"
      reversed={true}
      bgColor="#fff"
    />
    <HomeCard
      title="Accept Coding Challenges"
      buttonText="Join"
      image="/src/assets/images/image3.jpg"
      reversed={false}
      bgColor="#fff"
    />
  </div>
);

export default HomePage;