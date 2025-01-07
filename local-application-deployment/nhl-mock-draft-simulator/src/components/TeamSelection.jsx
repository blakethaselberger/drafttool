import React from 'react';
import teams from '../data/teams'; // Import the teams array
import '../styles/TeamSelection.css';

const TeamSelection = ({ onTeamSelect }) => {
    return (
        <div className="team-selection">
            <h1>Select Your Team</h1>
            <div className="team-grid">
                {teams.map((team, index) => (
                    <div
                        key={index}
                        className="team-card"
                        onClick={() => onTeamSelect(team.abbreviation)}
                    >
                        <div className="abbreviation">{team.abbreviation}</div>
                        <div className="name">{team.name}</div>
                        <div className="city">{team.city}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSelection;