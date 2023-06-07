import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const profiles = [
    {
      name: 'Jason Bourg',
      about: 'Full Stack Developer',
      // image: require('../images/profile1.jpg').default,
      linkedin: 'https://www.linkedin.com/in/jason-bourg/',
      github: 'https://github.com/jbourg4364',
    },
    {
      name: 'Aparna Priyavadan',
      about: 'Software Engineer',
      // image: require('../images/profile2.jpg').default,
      linkedin: 'https://www.linkedin.com/in/aparna-priyavadan-33989a211/',
      github: 'https://github.com/aparnas12',
    },
    {
      name: 'Aubrey Little',    
      about: 'I.T. Project Manager / Full Stack Developer',
      // about: 'I.T. Workflow and Process Improvement Project Manager / Full Stack Developer',
      // image: require('../images/profile4.jpg').default,
      linkedin: 'https://www.linkedin.com/in/aubrey-little/',
      github: 'https://github.com/Aubrey042',
    },
    {
      name: 'Maisha Khan',
      about: 'Full Stack Developer',
      // image: require('../images/profile3.jpg').default,
      linkedin: 'http://www.linkedin.com/in/',
      github: 'https://github.com/maishasaiyara',
      
    },
  ];

  return (
    <div className="profile-container">
       <div className="title-container">
        <h1>Meet The Creators Of JAAM!</h1>
      </div>
      {profiles.map((profile, index) => (
        <div className="profile-card" key={index}>
          {/* <img className="profile-image" src={profile.image} alt={profile.name} /> */}
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-about">{profile.about}</p>
          <div className="profile-buttons">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="profile-linkedin">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="profile-github">
              GitHub
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;


