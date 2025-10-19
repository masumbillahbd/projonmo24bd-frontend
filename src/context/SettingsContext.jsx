import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [marqueePosts, setMarqueePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`settings`)
      .then((res) => {
        if (res.data?.status === "success") {
          setSettings(res.data.data);
          setMarqueePosts(res.data.marqueePosts);
        }
      })
      .catch((err) => {
        console.error("Error fetching settings:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, marqueePosts, loading }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// ✅ single hook that gives access to all settings + marquee posts
export const useSettings = () => useContext(SettingsContext);
