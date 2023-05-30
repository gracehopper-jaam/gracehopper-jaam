import React from 'react';
import './ProfilePage.css';
// import profile1Image from '../images/profile1.jpg';
// import profile2Image from '../images/profile2.jpg';
// import profile3Image from '../images/profile3.jpg';
// import profile4Image from '../images/profile4.jpg';

const ProfilePage = () => {
  const profiles = [
    {
      name: 'Jason Bourg',
      about: 'Full Stack Developer',
      // image: profile1Image,
      linkedin: 'https://https://www.linkedin.com/in/jason-bourg/',
      github: 'https://github.com/jbourg4364',
    },
    {
      name: 'Aparna Priyavadan',
      about: 'Full Stack Developer',
      // image: profile2Image,
      linkedin: 'https://www.linkedin.com/in/aparna-priyavadan-33989a211/',
      github: 'https://github.com/aparnas12',
    },
    {
      name: 'Maisha Khan',
      about: 'Full Stack Developer',
      // image: profile3Image,
      linkedin: 'http://www.linkedin.com/in/',
      github: 'https://github.com/maishasaiyara',
    },
    {
      name: 'Aubrey Little',
      about: 'I.T. Workflow and Process Improvement Project Manager / Consultant',
      // image: profile4Image,
      linkedin: 'https://www.linkedin.com/in/aubrey-little/',
      github: 'https://github.com/Aubrey042',
    },
  ];

  return (
    <div className="profile-container">
      <h1>Profiles</h1>
      {profiles.map((profile, index) => (
        <div className="profile-card" key={index}>
          <img className="profile-image" src={profile.image} alt={profile.name} />
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
