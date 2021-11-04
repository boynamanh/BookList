import {useEffect} from 'react';
import Emiter from './Emiter';

const useSubcriber = (action: string, handler: (message?: any) => void) => {
  useEffect(() => {
    const newObserver = Emiter.share().addObserve(action, handler);
    return () => {
      Emiter.share().remove(newObserver);
    };
  }, [action, handler]);
};

export default useSubcriber;
