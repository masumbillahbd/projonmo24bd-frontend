import React from 'react';
import LeadPost from '../component/LeadPost';
import Header from '../component/Header';
import HomePageFirstSection from '../component/HomePageFirstSection';
import HomePageSecondSection from '../component/HomePageSecondSection';
import HomePageThirdSection from '../component/HomePageThirdSection';
import HomePageFourthSection from '../component/HomePageFourthSection';

const HomePage = () => {
    return (
        <div>
            <Header />
            <LeadPost/>
            <HomePageFirstSection/>
            <HomePageSecondSection/>
            <HomePageThirdSection/>
            <HomePageFourthSection/>
        </div>
    );
};

export default HomePage;


==========================last updated======================
import React, { Suspense, useEffect, useRef, useState } from "react";
import Header from "../component/Header";
import LeadPost from "../component/LeadPost";
import "./homepage.css"; // include the CSS shown below

const LazyLoadSection = ({ loader, placeholderHeight = 300, rootMargin = "200px" }) => {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [LazyComp, setLazyComp] = useState(null);

  // Observe when the placeholder comes near viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  // When we need to load, create the lazy component
  useEffect(() => {
    if (shouldLoad && !LazyComp) {
      const Comp = React.lazy(loader);
      setLazyComp(() => Comp);
    }
  }, [shouldLoad, LazyComp, loader]);

  return (
    <div ref={ref} style={{ minHeight: placeholderHeight }}>
      {LazyComp ? (
        <Suspense fallback={<div className="skeleton skeleton-block" />}>
          <div className="loaded-section">
            <LazyComp />
          </div>
        </Suspense>
      ) : (
        <div className="skeleton skeleton-block" />
      )}
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      {/* use Preloader instead of text */}
      {loading && <Preloader />}
      {/* <Header /> */}
      {/* LeadPost shows immediately */}
      <LeadPost />

      {/* Other sections lazy-load as you scroll */}
      <LazyLoadSection
        loader={() => import("../component/HomePageFirstSection")}
        placeholderHeight={420}
      />
      <LazyLoadSection
        loader={() => import("../component/HomePageSecondSection")}
        placeholderHeight={420}
      />
      
      <LazyLoadSection
        loader={() => import("../component/HomePageThirdSection")}
        placeholderHeight={420}
      /> 
      <LazyLoadSection
        loader={() => import("../component/HomePageFourthSection")}
        placeholderHeight={420}
      />
    </div>
  );
};

export default HomePage;