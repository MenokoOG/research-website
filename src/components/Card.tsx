import React from 'react';

const Card: React.FC<{ link: { id: string; title: string; description: string; url: string }; onClick: (url: string) => void }> = ({ link, onClick }) => {
  return (
    <div className="card">
      <div className="card-title">{link.title}</div>
      <div className="card-description">{link.description}</div>
      <button
        className="card-button"
        onClick={(e) => {
          e.stopPropagation();
          onClick(link.url);
        }}
      >
        Open
      </button>
    </div>
  );
};

export default Card;