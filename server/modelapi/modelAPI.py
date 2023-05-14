import pickle
from fastapi import FastAPI
import uvicorn
import pandas as pd
import os

app = FastAPI()

@app.get("/predict")
async def predict():
    print(os.getcwd())
    with open('modelapi/model.pickle', 'rb') as f: 
        model = pickle.load(f)
    data = pd.read_csv('features/PEfeatures.csv', sep=';') 
    print(data)
    result = model.predict(data)
    print(result)
    return {"prediction": int(result[0])}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)