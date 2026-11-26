import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(
    document.readyState === "complete" ? 100 : 0
  );

  useEffect(() => {
    if (document.readyState === "complete") return;
    const onReady = () => setLoading(100);
    window.addEventListener("load", onReady);
    return () => window.removeEventListener("load", onReady);
  }, []);

  const value = { isLoading, setIsLoading, setLoading };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Loading percent={loading} />}
      <div className="main-body">
        {children}
      </div>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
