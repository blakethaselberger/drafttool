import React, { useState } from 'react';
import TeamSelection from './components/TeamSelection';
import Header from './components/Header';
import Footer from './components/Footer';
import PlayerList from './components/PlayerList';
import DraftBoard from './components/DraftBoard';
import './App.css';

const App = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="App">
      <Header />
      {!selectedTeam ? (
        <TeamSelection onTeamSelect={handleTeamSelect} />
      ) : (
        <main>
          <PlayerList />
          <DraftBoard />
        </main>
      )}
      <Footer />
    </div>
  );
};

export default App;