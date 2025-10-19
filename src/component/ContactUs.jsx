import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";
import axios from "axios";

const ContactUs = () => {

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true); //  loading state
    const [error, setError] = useState(null); //  error state

    useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
        try {
        setLoading(true);
        const response = await axios.get(`/contact-us`, {
            cancelToken: source.token,
        });
        console.log(response.data.data.editor);
        setItem(response.data.data || null);
        setError(null);
        } catch (err) {
        if (!axios.isCancel(err)) {
            console.error("Error fetching terms:", err);
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
    <section className="single-section">
      <div className="container">
        <div className="row">
          {/* use Preloader instead of text */}
          {loading && <Preloader />}

          {/* Left Sidebar */}
          <article className="col-md-4 mt-3">
            <ul className="list-group contact-page">
              <li className="list-group-item">
                <p className="contact-left">প্রধান সম্পাদক ও প্রকাশক :</p>
                <p
                  className="contact-right"
                  style={{ fontWeight: "bold", fontSize: "17px" }}
                >
                 {item ? item.editor : ''}
                </p>
              </li>

              <li className="list-group-item">
                <p className="contact-left">যোগাযোগ :</p>
                <p className="contact-right">{item ? item.address : ''}</p>
              </li>

              <li className="list-group-item">
                <p className="contact-left">মোবাইল :</p>
                <div className="contact-right">
                  <p>{item ? item.site_mobile : ''}</p>
                </div>
              </li>

              <li className="list-group-item">
                <p className="contact-left">ই-মেইল :</p>
                <div className="contact-right">
                  <p>
                    <a href="mailto:{item ? item.site_email : ''}">
                      {item ? item.site_email : ''}
                    </a>
                  </p>
                </div>
              </li>

              <li className="list-group-item">
                <p className="contact-left">ওয়েবসাইট :</p>
                <div
                  className="contact-right"
                  style={{ textTransform: "lowercase" }}
                >
                  {item ? item.site_url : ''}
                </div>
              </li>
            </ul>
          </article>

          {/* Right Sidebar (Google Map) */}
          <aside className="col-md-8">
            <div className="google__map mt-3">
                {item?.google_map ? (
                    <div dangerouslySetInnerHTML={{ __html: item.google_map }} />
                ) : (
                    <p className="text-muted">No map available</p>
                )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
