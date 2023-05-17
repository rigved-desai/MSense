import './AboutUsCard.css'

export default function aboutUsCard()  {
    return (
        <>
        <div id="about-us-card">
            <h1>About MSense</h1>
            <p>MSense is a  web application designed to scan for suspicious files which users can download from the web. It uses 
                machine learning techniques to scan a file and determine whether it is malicious or not. To be more accurate it scans the PE header of the file which is uploaded, extracts data from it and then runs our ML model on it. <br/><br/>
                NOTE: Currently MSense can only accurately predict output for files which have PE headers, we will be working to create ML models to detect malware not containing PE headers in the future.<br/><br/>
                Thank you for using MSense, have a nice day ahead!</p>
        </div>
        </>
    )
}