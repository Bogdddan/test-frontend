import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(scale * 1.2); // Збільшення масштабу на 20%
  };

  const handleZoomOut = () => {
    setScale(scale / 1.2); // Зменшення масштабу на 20%
  };

  const handleGoToCenter = () => {
    setScale(1); // Повернення до масштабу 100%
  };

  // Обробка подій клавіші "+" та "-" для зміни масштабу
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '+') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${scale * 100}%`;
  }, [scale]);

  return (
    <div className='header'>
      <div className='servic'>Services</div>
      <div>
      <button onClick={handleZoomIn}>+</button>
      <button onClick={handleZoomOut}>-</button>
      <button onClick={handleGoToCenter}>В центр</button>
    </div>
    </div>
  );
};

export default Header;
