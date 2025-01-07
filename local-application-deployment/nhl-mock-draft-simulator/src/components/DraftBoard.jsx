import React from 'react';
import '../styles/DraftBoard.css';

const DraftBoard = ({ draftedPlayers = [] }) => {
    return (
        <section className="draft-board">
            <h2>Draft Board</h2>
            <ul>
                {draftedPlayers.length > 0 ? (
                    draftedPlayers.map((player, index) => (
                        <li key={index} className="drafted-player">
                            {player.name} - {player.position}
                        </li>
                    ))
                ) : (
                    <p>No players drafted yet.</p>
                )}
            </ul>
        </section>
    );
};

export default DraftBoard;