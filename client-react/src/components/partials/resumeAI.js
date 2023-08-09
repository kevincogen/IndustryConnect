import ErrorPage from "./ErrorPage";

const ResumeAI = ({result}) => {

  if (JSON.stringify(result) === "{}") {
    return <ErrorPage />;
  }


  //we probably wont do this
  const handlePrint = () => alert("Print Successful!");
  return (
    <>
      <button onClick={handlePrint}>Print Page</button>
      <main className='container'>
          <p>Hello!</p>
      </main>
    </>
  )
};