import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";
import axios from "axios";

const TermsConditions = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); //  loading state
  const [error, setError] = useState(null); //  error state

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/terms`, {
          cancelToken: source.token,
        });
        setItem(response.data.data || null);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching terms:", err);
          setError("Could not load terms. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <section className="terms container mx-auto py-10 px-4">
      <div className="row">
        <div className="col-12">
          {/* use Preloader instead of text */}
          {loading && <Preloader />}
          
          {error && <p className="text-center text-danger py-3">{error}</p>}
          {!loading && !error && item ? (
            <div
              key={item.id}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          ) : null}
          {!loading && !error && !item && (
            <p className="text-center text-muted py-3">কোন তথ্য নেই।</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
