import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";   // ✅ import reusable loader
import axios from "axios";

const PrivacyGuideline = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/privacy-policy`, {
          cancelToken: source.token,
        });
        setItem(response.data.data || null);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching privacy policy:", err);
          setError("Could not load privacy policy. Please try again later.");
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
    <section className="privacy-policy container mx-auto py-10 px-4">
      <div className="row">
        <div className="col-12">
          {/* ✅ use Preloader instead of text */}
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

export default PrivacyGuideline;
