import { useState, useEffect } from 'react';
import axios from 'axios';

const Level = () => {
  const [level, setlevel] = useState(1);
  const [totalExperience, setTotalExperience] = useState(100);

  const updateLevelAndExperience = (experiencePercentage) => {
    if (experiencePercentage >= 100) {
      setlevel(level + 1);
      setTotalExperience(totalExperience * 1.5);
    }
  };
  
  //GET level & totalExperience
  useEffect(() => {
    axios.get('http://172.20.10.4:3000/experiencebar')
      .then(response => {
        const { totalExperience, level } = response.data[0];
        setlevel(level);
        setTotalExperience(totalExperience);
      })
      .catch(error => {
        console.error('获取参数时出错:', error);
      });
  }, []);

  return {
    level,
    totalExperience,
    updateLevelAndExperience,
  };
};

export default Level;
