import { useState, useEffect, Fragment } from "react";
import { TOKEN } from "../../const";
import { ROLE, USER_ID } from "../../utils";
import { toast } from "react-toastify";

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const isAuthorized = localStorage.getItem(TOKEN) && ROLE !== "user";

  useEffect(() => {
    if (isAuthorized) {
      fetchSkills();
    } else {
      setIsLoading(false); // Set loading to false if not authorized
    }
  }, [isAuthorized]);

  const fetchSkills = async () => {
    try {
      const response = await fetch(
        `https://ap-portfolio-backend.up.railway.app/api/v1/skills?user=${USER_ID}`
      );
      const responseData = await response.json();
      const data = responseData.data;

      if (Array.isArray(data)) {
        setSkills(data);
      } else {
        console.error("Fetched data is not an array of skills:", data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast.error("Error fetching skills."); // Toast error message
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
            <Fragment>
              <h2 style={{textAlign: "center"}}>My Skills</h2>
              {skills.length > 0 ? (
                <div style={{display: "flex", flexDirection: "column", gap: "20px", padding: "20px 0"}}>
                  {skills.map((skill) => (
                    <div key={skill._id} className="skills-item">
                      <div
                        className="title-wrapper"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "50px",
                        }}
                      >
                        <h4 className="h5">{skill.name}</h4>
                        <data value="20">{skill.percent}%</data>
                      </div>

                      <div className="skill-progress-bg">
                        <div
                          className="skill-progress-fill"
                          style={{ width: `${skill.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No skills data available.</div>
              )}
            </Fragment>
          ) : (
            <div>User is not authorized.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsPage;
