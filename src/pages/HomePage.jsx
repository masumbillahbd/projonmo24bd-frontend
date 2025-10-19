import React, { Suspense, useEffect, useRef, useState } from "react";
import HomePageFirstSection from "../component/HomePageFirstSection";
import Header from "../component/Header";
import Preloader from "../component/Preloader";

import "./homepage.css"; // include your CSS

// ---------------- LazyLoadSection ----------------
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

// ---------------- HomePage ----------------
const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call / initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // ⏳ Replace with real API fetch

    return () => clearTimeout(timer);
  }, []);

  // ✅ Page-level Preloader
  // if (loading) {
  //   return <Preloader />;
  // }

  return (
    <div>

      <HomePageFirstSection/>

      {/* Other sections lazy-load as you scroll */}
      
      <LazyLoadSection
        loader={() => import("../component/HomePageSecondSection")}
        placeholderHeight={420}
      />
      {/* <LazyLoadSection
        loader={() => import("../component/HomePageThirdSection")}
        placeholderHeight={420}
      />
      <LazyLoadSection
        loader={() => import("../component/HomePageFourthSection")}
        placeholderHeight={420}
      /> */}
    </div>
  );
};

export default HomePage;