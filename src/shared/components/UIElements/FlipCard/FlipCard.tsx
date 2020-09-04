import React, { useState } from 'react';
import './FlipCard.scss';

interface props {
  front: string;
  back: string;
  color: string;
}

const FlipCard = ({ front, back, color }: props): JSX.Element => {
  const [isFront, setIsFront] = useState<boolean>(true);

  const flipHandler = () => {
    setIsFront(!isFront);
  };

  return (
    <div className="flip-card">
      <div
        className="flip-card__side flip-card__side--front"
        style={
          isFront
            ? { backgroundColor: color }
            : { backgroundColor: color, transform: 'rotateY(-180deg)' }
        }
        onClick={flipHandler}
      >
        <div className="flip-card__content">{front}</div>
      </div>
      <div
        className="flip-card__side flip-card__side--back"
        style={
          isFront
            ? { backgroundColor: color, transform: 'rotateY(180deg)' }
            : { backgroundColor: color, transform: 'rotateY(0)' }
        }
        onClick={flipHandler}
      >
        <div className="flip-card__content">{back}</div>
      </div>
    </div>
  );
};

export default FlipCard;
