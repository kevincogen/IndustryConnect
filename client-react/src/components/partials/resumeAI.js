import ErrorPage from "./ErrorPage";

const ResumeAI = ({ result, isProfileShow }) => {
console.log("Rendering ResumeAI component with result: ", result);
console.log("in resume AI", isProfileShow)
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
      <main className='container'>
          <header className='header'>
              <div>
                  {!isProfileShow && <h1>{result.fullName}</h1>}
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
                        <p 
                            className='workHistoryDescription'
                            dangerouslySetInnerHTML={{
                            __html: replaceWithBr(work.description),
                            }}
                            className='resumeBodyContent'
                        />
                    </div>
                  ))}
              </div>
              <div>
                  <h2 className='resumeBodyTitle'>KEY RESPONSIBILITIES</h2>
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