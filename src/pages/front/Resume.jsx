import { useState, useEffect, Fragment } from "react";
import { TOKEN } from "../../const";
import { ROLE, USER_ID } from "../../utils";
import { toast } from "react-toastify";

const Resume = () => {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]); // State for education
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const isAuthorized = localStorage.getItem(TOKEN) && ROLE !== "user";

  useEffect(() => {
    if (isAuthorized) {
      fetchExperiences();
      fetchEducation(); // Fetch education data
    } else {
      setIsLoading(false); // Set loading to false if not authorized
    }
  }, [isAuthorized]);

  const fetchExperiences = async () => {
    try {
      const response = await fetch(
        `https://ap-portfolio-backend.up.railway.app/api/v1/experiences?user=${USER_ID}`
      );
      const responseData = await response.json();
      const data = responseData.data;

      if (Array.isArray(data)) {
        setExperiences(data);
      } else {
        console.error("Fetched data is not an array of experiences:", data);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error("Error fetching experiences."); // Toast error message
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or error
    }
  };


  const fetchEducation = async () => {
    try {
      const response = await fetch(
        `https://ap-portfolio-backend.up.railway.app/api/v1/education?user=${USER_ID}`
      );
      const responseData = await response.json();
      const data = responseData.data;

      if (Array.isArray(data)) {
        setEducation(data);
      } else {
        console.error("Fetched data is not an array of education:", data);
      }
    } catch (error) {
      console.error("Error fetching education:", error);
      toast.error("Error fetching education."); // Toast error message
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
              <h2 style={{ textAlign: "center" }}>My Resume</h2>
              <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", padding: "25px 10px"}}>
                {experiences.length > 0 ? (
                  <section className="timeline">
                    <div className="title-wrapper">
                      <div className="icon-box">
                        <ion-icon name="book-outline"></ion-icon>{" "}
                        {/* Your icon */}
                        <span style={{ textAlign: "center" }}>
                          &nbsp;&#128218;
                        </span>{" "}
                        {/* Fallback icon */}
                      </div>
                      <h3 className="h3">Experience</h3>
                    </div>
                    <ol className="timeline-list">
                      {experiences.map((experience) => (
                        <li key={experience._id} className="timeline-item">
                          <h4 className="h4 timeline-item-title">
                            {experience.workName}
                          </h4>
                          <span>
                            {`${experience.startDate.split("-")[0]} — ${
                              experience.endDate.split("-")[0]
                            }`}
                          </span>
                          <p className="timeline-text">
                            {experience.description}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </section>
                ) : (
                  <div>No experiences data available.</div>
                )}
                
                {education.length > 0 ? (
                <section className="timeline">
                  <div className="title-wrapper">
                    <div className="icon-box">
                      <ion-icon name="book-outline"></ion-icon>{" "}
                      {/* Your icon */}
                      <span style={{ textAlign: "center" }}>
                        &nbsp;&#128218;
                      </span>{" "}
                      {/* Fallback icon */}
                    </div>
                    <h3 className="h3">Education</h3>
                  </div>
                  <ol className="timeline-list">
                    {education.map((edu) => (
                      <li key={edu._id} className="timeline-item">
                        <h4 className="h4 timeline-item-title">{edu.name}</h4>
                        <span>
                          {`${edu.startDate.split("-")[0]} — ${
                            edu.endDate.split("-")[0]
                          }`}
                        </span>
                        <p className="timeline-text">{edu.description}</p>
                      </li>
                    ))}
                  </ol>
                </section>
                ) : (
                  <div>No education data available.</div>
                )}
              </div>
            </Fragment>
          ) : (
            <div>User is not authorized.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Resume;
