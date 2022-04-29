import { useCallback, useState } from 'react';

function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = useCallback((state) => {
    setIsLoading(state);
  }, []);

  return { isLoading, setLoading };
}

export default useLoading;
