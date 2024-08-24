import React, { useRef, useState, useEffect } from 'react';

function App() {
  const soundSrcArray = [
    { name: 'Heater 1', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3', key: 'Q' },
    { name: 'Heater 2', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3', key: 'W' },
    { name: 'Heater 3', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3', key: 'E' },
    { name: 'Heater 4', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3', key: 'A' },
    { name: 'Clap', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3', key: 'S' },
    { name: 'Open-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3', key: 'D' },
    { name: 'Kick-n-Hat', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3', key: 'Z' },
    { name: 'Kick', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3', key: 'X' },
    { name: 'Closed-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3', key: 'C' },
  ];

  const audioRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [soundInfo, setSoundInfo] = useState('');

  useEffect(()=>{
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      const soundIndex = soundSrcArray.findIndex((obj) => obj.key === key);

      if(soundIndex !== -1) {
        playCurrentTrack(soundIndex);
        setSoundInfo(soundSrcArray[soundIndex].name);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const playAudio = (index) => {
    setCurrentIndex(index);
    if (audioRefs.current[index]) {
      audioRefs.current[index].currentTime = 0;
      audioRefs.current[index].play();
    }
  };

  const stopAudio = () => {
    if (currentIndex !== null && audioRefs.current[currentIndex]) {
      audioRefs.current[currentIndex].pause();
      audioRefs.current[currentIndex].currentTime = 0; // Reset the audio to the beginning
    }
  };

  const playCurrentTrack = (index) => {
    stopAudio();
    playAudio(index);
  };

  return (
    <div>
      <div id="drum-machine">
        <div id="display">
          {soundInfo}
        </div>
        {soundSrcArray.map((obj, index) => (
          <div
            key={obj.key}
            className="drum-pad"
            id={obj.name}
            onClick={() => {
              playCurrentTrack(index);
              setSoundInfo(obj.name);
            }}
          >
            {obj.key}
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={obj.src}
              className="clip"
              id={obj.key}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
