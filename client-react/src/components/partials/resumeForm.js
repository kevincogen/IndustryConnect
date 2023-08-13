import { useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import ResumeAI from "./resumeAI";

const ResumeForm = ({profileName, userId}) => {
  const [fullName, setFullName] = useState(profileName || "");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState("");
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [loading, setLoading] = useState(false);
  const [pastExperience, setPastExperience] =useState([{company: "", position: "", description: ""}]);
  const [result, setResult] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userId,
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      pastExperience,
    };
    console.log(payload);
    axios
    .post("http://localhost:8080/api/resume/create", payload, {})
    .then((res) => {
        if (res.data.message) {
            console.log("res", res.data.data);
            setResult(res.data.data);
            // navigate("/resumeform");
        }
        setLoading(false);  // Reset loading state here after receiving the response
    })
    .catch((err) => {
        console.error(err);
        setLoading(false);  // Also reset loading state here in case of an error
    });
setLoading(true);
  };

  if (loading) {
    return <Loading />;
  }

  //Past Experience Build, Remove, Update
  const handlePastExperience = () => setPastExperience([...pastExperience, { company: "", position: "", description: "" }]);
  const handleRemovePastExperience = (index) => {
    const list = [...pastExperience];
    list.splice(index, 1);
    setPastExperience(list);
  };
  const handleUpdatePastExperience = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const list = [...pastExperience];
    list[index][name] = value;
    setPastExperience(list);
  }


  return (
    <div className="resume-form">
        <h1>AI Powered CV Builder</h1>
        {result && Object.keys(result).length > 0  ? (
          <div className="resume-AI">
          <ResumeAI result={result} />
          <button onClick={() => setResult({})}>Redo CV Build</button>
          </div>
        ) : (
        <form
          onSubmit={handleFormSubmit}
          method='POST'
          encType='multipart/form-data'
        >
          <label htmlFor='fullName'>Enter your full name</label>
          <input
            type='text'
            required
            name='fullName'
            id='fullName'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div className='nestedContainer'>
            <div>
              <label htmlFor='currentPosition'>Current Position</label>
              <input
                type='text'
                required
                name='currentPosition'
                className='currentInput'
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='currentLength'>For how long? (year)</label>
              <input
                type='number'
                required
                name='currentLength'
                className='currentInput'
                value={currentLength}
                onChange={(e) => setCurrentLength(e.target.value)}
              />  
            </div>
            <div>
              <label htmlFor='currentTechnologies'>Technologies used</label>
              <input
                type='text'
                required
                name='currentTechnologies'
                className='currentInput'
                value={currentTechnologies}
                onChange={(e) => setCurrentTechnologies(e.target.value)}
              />  
            </div>
          </div>
          <div>
            <h3>Past Experience</h3>
            {pastExperience.map((company, index) => (
                <div className='nestedContainer-exp' key={index}>
                    <div className='companies'>
                        <label htmlFor='name'>Company Name</label>
                        <input
                            type='text'
                            name='company'
                            required
                            onChange={(e) => handleUpdatePastExperience(e, index)}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='position'>Position Held</label>
                        <input
                            type='text'
                            name='position'
                            required
                            onChange={(e) => handleUpdatePastExperience(e, index)}
                        />
                    </div>
                    <div className='companies-description'>
                      <label htmlFor='description'>Job Description</label>
                      <textarea 
                        className='input-textarea'
                        name='description' 
                        rows="4"
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                const cursorPosition = e.target.selectionStart;
                                const value = e.target.value;
                                e.target.value = value.substring(0, cursorPosition) + "\n" + value.substring(cursorPosition);
                                e.target.selectionStart = cursorPosition + 3;
                                e.target.selectionEnd = cursorPosition + 3;
                            }
                        }}
                        onChange={(e) => handleUpdatePastExperience(e, index)}
                    ></textarea>
                    </div>
                    <div className='btn__group'>
                        {pastExperience.length - 1 === index && pastExperience.length < 4 && (
                            <button id='addBtn' onClick={handlePastExperience}>
                                Add
                            </button>
                        )}
                        {pastExperience.length > 1 && (
                            <button id='deleteBtn' onClick={() => handleRemovePastExperience(index)}>
                                Del
                            </button>
                        )}
                    </div>
                </div>
            ))}
          </div>
          <button>CREATE RESUME</button>
        </form>
        )}
    </div>
  )
};

export default ResumeForm;