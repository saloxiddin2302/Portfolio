import React, { useState, useEffect } from "react";
import { TOKEN } from "../../const";
import { ROLE, USER_ID } from "../../utils";
import { toast } from "react-toastify";

const PortfoliosPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const isAuthorized = localStorage.getItem(TOKEN) && ROLE !== "user";

  useEffect(() => {
    if (isAuthorized) {
      fetchPortfolios();
    } else {
      setIsLoading(false); // Set loading to false if not authorized
    }
  }, [isAuthorized]);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch(
        `https://ap-portfolio-backend.up.railway.app/api/v1/portfolios?user=${USER_ID}`
      );
      const responseData = await response.json();
      const data = responseData.data;

      if (Array.isArray(data)) {
        setPortfolios(data);
      } else {
        console.error("Fetched data is not an array of portfolios:", data);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      toast.error("Error fetching portfolios."); // Toast error message
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or error
    }
  };

  return (
    <div className="container" style={{ padding: "100px 15px" }}>
      {isLoading ? (
        <div>Loading...</div> // Display loading state
      ) : (
        <div>
          {isAuthorized ? (
            <div>
              <h2 style={{ textAlign: "center" }}>My Portfolios</h2>
              {portfolios.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "20px 0",
                  }}
                >
                  {portfolios.map((portfolio) => (
                    <div key={portfolio._id} className="portfolio-item">
                      <h4>{portfolio.name}</h4>
                      <p>{portfolio.url}</p>
                      {/* You can add more details about each portfolio here */}
                    </div>
                  ))}
                </div>
              ) : (
                <div>No portfolios data available.</div>
              )}
            </div>
          ) : (
            <div>User is not authorized.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfoliosPage;
