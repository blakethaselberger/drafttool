import React from 'react';
import players from '../data/players';
import '../styles/PlayerList.css';

const PlayerList = ({ onDraft }) => {
    const handleDraft = (player) => {
        onDraft(player);
    };

    return (
        <section className="player-list">
            <h2>Available Players</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.id} className="player-item">
                        <span>{player.name} - {player.position}</span>
                        <button
                            onClick={() => handleDraft(player)}
                            className="draft-button"
                        >
                            Draft
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PlayerList;