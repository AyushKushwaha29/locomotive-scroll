import React, { createContext, useContext, useEffect, useRef, useLayoutEffect } from 'react';
// Check if the main class is a default export or named export
import LocomotiveScroll from '../locomotive-scroll';

// 1. Create the Context
const LocomotiveScrollContext = createContext<any>(null);

// 2. Create the Provider
export const LocomotiveScrollProvider = ({ 
  children, 
  options = {} 
}: { 
  children: React.ReactNode, 
  options?: any 
}) => {
  const scrollRef = useRef<any>(null);

  useLayoutEffect(() => {
    // Initialize Locomotive Scroll
    scrollRef.current = new LocomotiveScroll(options);

    return () => {
      // Clean up instance on unmount
      if (scrollRef.current) scrollRef.current.destroy();
    };
  }, [options]);

  return (
    <LocomotiveScrollContext.Provider value={scrollRef.current}>
      {children}
    </LocomotiveScrollContext.Provider>
  );
};

// 3. Create the Hook
export const useLocomotiveScroll = () => {
  const context = useContext(LocomotiveScrollContext);
  return context;
};