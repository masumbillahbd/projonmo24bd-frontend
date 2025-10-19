import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePageSecondSection = () => {
  const [loading, setLoading] = useState(true);
  const [setting, setSetting] = useState(null);
  const [national, setNational] = useState(null);
  const [nationalOne, setNationalOne] = useState(null);
  const [nationalTwo, setNationalTwo] = useState([]);
  const [nationalFour, setNationalFour] = useState([]);

  const [economy, setEconomy] = useState(null);
  const [economySix, setEconomySix] = useState([]);

  const [internationalCategory, setInternationalCategory] = useState(null);
  const [internationalOne, setInternationalOne] = useState(null);
  const [internationalTwoFirst, setInternationalTwoFirst] = useState([]);
  const [internationalTwoSecond, setInternationalTwoSecond] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
        let isMounted = true;

        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/home-second-section`);
                if (isMounted) {

                    setSetting(response.data.setting);
                    setNational(response.data.national || null);
                    setNationalOne(response.data.nationalOne || null);
                    setNationalTwo(response.data.nationalTwo || []);
                    setNationalFour(response.data.nationalFour || []);

                    setEconomy(response.data.economy || null);
                    setEconomySix(response.data.economySix || []);

                    setInternationalCategory(response.data.international || null);
                    setInternationalOne(response.data.internationalOne || null);
                    setInternationalTwoFirst(response.data.internationalTwoFirst || []);
                    setInternationalTwoSecond(response.data.internationalTwoSecond || []);
                    
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Error fetching posts:", err);
                    setError("Could not load posts. Please try again later.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPosts();
        return () => { isMounted = false; };
    }, []);


  return (
    <>

      
    </>
  );
};

export default HomePageSecondSection;
