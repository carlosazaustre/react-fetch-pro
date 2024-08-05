import { useState, useEffect } from "react";

export function useFetch(url) {
  // Basic
  //   const [data, setData] = useState(url);
  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => setData(json));
  //   }, []);
  //   return { data };

  // ---------------------------------------------
  //  With Loading
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .finally(() => setLoading(false));
  //   }, []);
  //   return { data, loading };

  // ---------------------------------------------
  // With Error
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   useEffect(() => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .catch((error) => setError(error))
  //       .finally(() => setLoading(false));
  //   }, []);
  //   return { data, loading, error };

  // ---------------------------------------------
  // With Abort Controller
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);

    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Cancelled request");
        } else {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Cancelled Request");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
