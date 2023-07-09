from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
import uuid
import random

app = FastAPI()

origins = [
    "http://localhost:3000",  # @ d'app react
    "https://hilarious-sherbet-ffef8a.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# connect to database MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["user"]
collection = db["users"]

class CustomerData(BaseModel):
    name: str
    first_name: str
    birthday: str

@app.post("/customer")
async def create_customer(customer_data: CustomerData):
    print("Received POST request to customer")
    new_id = str(uuid.uuid4())
    random_number = random.randint(1, 5)
    result = collection.insert_one({"_id": new_id, "random_number": random_number, **customer_data.dict()})
    return {"id": new_id, "data": customer_data.dict(), "random_number": random_number}

@app.get("/customer/{id}")
async def search_customer_by_id(id: str):
    print("Received search request for customer with ID: {id}")
    # find customer by id
    result = collection.find_one({"_id": id})
    print("Search result: {result}")
    if result:
        return {"customer": result}
    else:
        return {"message": "Customer not found"}
