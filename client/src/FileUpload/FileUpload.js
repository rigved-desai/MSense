import React, { useState} from "react";
import './FileUpload.css'
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleFileChange =(event) => {
        setFile(event.target.files[0]);
        if(result) setResult(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!file) {
            setResult({result:false ,message: "Select a file before uploading"});
            return;
        }
      
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        console.log(loading);
        await axios.post("https://msense-server.onrender.com/", formData)
          .then((response) => {setResult(response.data);console.log(response.data)})
          .catch((error) => console.log(error));
          setLoading(false);
          console.log(loading);
      }

    const displayResult = () => {
        if(!result) return;
        
        if(!result.result) return (<div id = 'result'>{result.message}</div>);

        if(result.result && file)  {
            if(result.malware === true) {
                return (
                    <>
                        <div id = 'result'>
                            {file.name} uploaded and processed successfully!<br/>
                            Uploaded file is suspicious!
                            {window.alert("Uploaded file is suspicious, please proceed with caution.")}
                        </div>
                    </>
                );
            }
            else if(result.malware === false) {
                console.log("OK");
                return (
                <>
                    <>
                        <div id = 'result'>
                            {file.name} uploaded and processed successfully!<br/>
                            Uploaded file is not suspicious!
                        </div>
                    </>
                </>
                );
            }
        }
    
    }
    return (
        <>
        <div className={loading ? 'loading' : ''}>
            <form name="uploadForm" id = "uploadForm" onSubmit={handleSubmit}>
            <h1 className='title'>Please select the file you wish to scan</h1>
                <input id="inputBtn" name="inputBtn" type="file" onChange={handleFileChange} />
                <br></br><br></br>
                <button id="uploadBtn" name="uploadBtn" type="submit">Upload</button>
                {loading && <><br/><div>Uploading...</div></>}
            </form>

            <div className={(result && !result.result) || (result && result.result && file) ? 'show-result' : 'hide-result'}>
                {displayResult()}
            </div>
            <div name='section1' id = 'section1'>
            </div>
            <div name='section2' id = 'section2'>
            </div>
        </div>
        </>
    )
} 

export default FileUpload;