import ErrorPage from "./ErrorPage";

const ResumeAI = ({result}) => {
//👇🏻 function that replaces the new line with a break tag
const replaceWithBr = (string) => {
    if (typeof string !== "string") return "";
    return string.replace(/\n/g, "<br />");
  };

//👇🏻 returns an error page if the result object is empty
if (JSON.stringify(result) === "{}") {
  return <ErrorPage />;
}

const handlePrint = () => alert("Printing");

return (
  <>
      <button onClick={handlePrint}>Print Page</button>
      <main className='container'>
          <header className='header'>
              <div>
                  <h1>{result.fullName}</h1>
                  <p className='resumeTitle headerTitle'>
                      {result.currentPosition} ({result.currentTechnologies})
                  </p>
                  <p className='resumeTitle'>
                      {result.currentLength}year(s) work experience
                  </p>
              </div>
          </header>
          <div className='resumeBody'>
              <div>
                  <h2 className='resumeBodyTitle'>PROFILE SUMMARY</h2>
                  <p
                      dangerouslySetInnerHTML={{
                          __html: replaceWithBr(result.objective),
                      }}
                      className='resumeBodyContent'
                  />
              </div>
              <div>
                  <h2 className='resumeBodyTitle'>WORK HISTORY</h2>
                  {result.pastExperience.map((work, index) => (
                    <div key={index} className='workHistoryItem'>
                        <h3>{work.company} - {work.position}</h3>
                      <p className='workHistoryDescription'>
                            {work.description}
                      </p>
                    </div>
                  ))}
              </div>
              <div>
                  <h2 className='resumeBodyTitle'>JOB PROFILE</h2>
                  <p
                      dangerouslySetInnerHTML={{
                          __html: replaceWithBr(result.jobResponsibilities),
                      }}
                      className='resumeBodyContent'
                  />
              </div>
              <div>
                  <h2 className='resumeBodyTitle'>JOB RESPONSIBILITIES</h2>
                  <p
                      dangerouslySetInnerHTML={{
                          __html: replaceWithBr(result.keypoints),
                      }}
                      className='resumeBodyContent'
                  />
              </div>
          </div>
      </main>
  </>
);
};

export default ResumeAI;