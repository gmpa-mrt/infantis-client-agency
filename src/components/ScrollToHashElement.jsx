import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHashElement = () => {
  const location = useLocation();

  const hashElement = useMemo(() => {
    const hash = location.hash;
    const removeHashCharacter = (str) => {
      return str.substring(1); // Use substring(1) to remove the "#" character
    };

    if (hash) {
      return document.getElementById(removeHashCharacter(hash));
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      hashElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
      });
    }
  }, [hashElement]);
};

export default ScrollToHashElement;
