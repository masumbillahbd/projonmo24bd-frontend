import React from 'react'
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mb-5"  style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        textAlign: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
        }}>
          <div className="text-center">
            <span style={{ fontSize: "78px", color: "#555", fontFamily: "system-ui" }}>4</span>
            <span style={{ fontSize: "78px", color: "#555", fontFamily: "system-ui" }}>0</span>
            <span style={{ fontSize: "78px", color: "#555", fontFamily: "system-ui" }}>4</span>
          </div>

          <div className="title mt-3">
            <h2 className="text-center" style={{ fontWeight: "bold" }}>
              দুঃখিত! কিছু পাওয়া যায়নি
            </h2>
          </div>

          <div className="text-center mt-3">
            <Link to="/" className="btn btn-info">
              প্রথম পাতায় ফিরে যান
            </Link>
          </div>
    </div>
  )
}

export default NotFound