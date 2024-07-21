import React, { useState, useEffect } from 'react';

export default function NoRoute() {
  const [isDancing, setIsDancing] = useState(false);
  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A1']; // Add more colors if you'd like

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDancing((prev) => !prev);
    }, 1000); // Change the interval (in milliseconds) to control the dancing speed

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const textStyle = {
    fontSize: '24px',
    animation: isDancing ? 'dance 2s infinite' : 'none',
    color: getRandomColor(),
  };

  return (
    <div className='flex flex-col bg-green-800 text-white text-4xl items-center justify-center h-screen' style={{ marginTop: '-25%' }}>
      <h1 style={textStyle}>404</h1>
      <h2>{isDancing ? 'Page Not Found' : ''}</h2>
    </div>
  );
}
