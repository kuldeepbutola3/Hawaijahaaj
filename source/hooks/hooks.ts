import { EffectCallback, useEffect } from 'react';

export const useOnMount = (callback: EffectCallback) => {
  useEffect(callback);
};
