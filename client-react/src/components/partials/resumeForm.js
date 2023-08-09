import { useState } from "react";
import Loading from "./Loading";

const ResumeForm = () => {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState("");
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [loading, setLoading] = useState(false);
  const [pastExperience, setPastExperience] =useState([{company: "", position: ""}]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
    });
    setLoading(true);
  };

  if (loading) {
    return <Loading />;
  }

  //Past Experience Build, Remove, Update
  const handlePastExperience = () => setPastExperience([...pastExperience, { company: "", position: "" }]);
  const handleRemovePastExperience = (index) => {
    const list = [...pastExperience];
    list.splice(index, 1);
    setPastExperience(list);
  };
  const handleUpdatePastExperience = (e, index) => {
    e.preventDefault();
    const { company, value } = e.target;
    const list = [...pastExperience];
    list[index][company] = value;
    setPastExperience(list);
  }


  return (
    <div className="resume-form">
        <h1>AI Powered CV Builder</h1>
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
                <div className='nestedContainer' key={index}>
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
    </div>
  )
};

export default ResumeForm;