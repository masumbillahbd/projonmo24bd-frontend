import React, { useState, useEffect } from 'react';
import './preloader.css';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // simulate 3s loading
      return () => clearTimeout(timer);
    }, []);
  
    if (loading) {
      return (
        <div className="fullscreen">
            <div className="spinner"></div>
        </div>

      );
    }
  
    return (
      <>

      </>
    );

};

export default Preloader;
