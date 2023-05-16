# MSense - Malware Detection Using ML

## Description

MSense is a web application that utilizes machine learning (ML) algorithms to detect malware in files uploaded by users. This single page web application is designed to be easy to use and accessible to everyone.

When a user uploads a file, MSense runs a python script on the backend which extracts the Portable Executable (PE) header information from the file. This information is then fed into a RandomForestClassifier model. The model analyzes the data and classifies it as either suspicious or not suspicious.

## Tech Stack

Express for the backend server

FastAPI for creating the model API

React.JS for the frontend


## Deployment

The website is deployed using Netlify and render. Redirect to the following link to try it out.

```
http://msense.netlify.app
```

## Further Information

MSense was created as a course project for the course "Machine Learning Algorithms" in semester 4. You can refer to the project report for further details regarding the project.
