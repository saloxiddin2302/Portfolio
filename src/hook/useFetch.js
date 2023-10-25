import { useEffect, useState } from "react";
import { getData } from "../server/common";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [callback, setCallback] = useState(false);
  const recall = () => {
    setCallback(!callback);
  };

  useEffect(() => {
    setLoading(true);
    getData(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, callback]);

  return {
    data: data.data,
    total: data.pagination?.total,
    loading,
    error,
    recall,
  };
};

export default useFetch;
