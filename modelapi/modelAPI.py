import pickle
from fastapi import FastAPI ,Request
import uvicorn
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(req: Request):
    print(os.getcwd())
    with open('./modelapi/model.pickle', 'rb') as f: 
        model = pickle.load(f)
    data = await req.json()
    for i in range(len(data)):
        try: 
            data[i] = int(data[i])
        except ValueError:
            data[i] = float(data[i])

    data = np.asarray(data)
    data = data.reshape(1, -1)
    result = model.predict(data)
    return {"prediction": int(result[0])}

@app.get("/")
async def ok():
    return {"hi": "hello"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)