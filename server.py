from flask import Flask
from random import randint
from flask_cors import CORS
import os



app = Flask(__name__)
CORS(app)

def getMaxBitsVar():
    val = os.environ.get('MAX_BITS')
    return val

def generate_random_number():
    return str(randint(0, 9))

def generate_random_string(n):
    string = ""
    for i in range(n):
        string = string + generate_random_number()
    return string

@app.route('/getBit')   
def getBit():
    res = generate_random_number()
    data = {
        "res" : res
    }
    return data

@app.route("/getString/<int:n>")
def getString(n):
    res = generate_random_string(n)
    data = {
        "res" : res
    }
    return data

@app.route('/getMaxBits')
def getMaxBits():
    res = getMaxBitsVar()
    print("RES {}".format(res))
    data = {
        "res" : res
    }
    return data

app.run(debug=False, host='0.0.0.0')
