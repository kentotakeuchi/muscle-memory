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
        <p className="flip-card__content">{front}</p>
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
        <p className="flip-card__content">{back}</p>
      </div>
    </div>
  );
};

export default FlipCard;
