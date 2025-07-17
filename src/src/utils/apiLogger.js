export const setupAPILogger = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name.includes('api.trustedform.com/certs')) {
        console.log('TrustedForm Cert API Call:', {
          url: entry.name,
          duration: entry.duration,
          startTime: entry.startTime,
          initiatorType: entry.initiatorType
        });
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });

  // Cleanup function
  return () => {
    observer.disconnect();
  };
}; 
