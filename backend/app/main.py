from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import ollama
import xlsxwriter
from io import BytesIO
import json


app = FastAPI()

origins = [
    'https://app-aagnn0xplmc.canva-apps.com'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
  
)


system_instructions = """
You are a helpful marketing assistant for Canva users. You will be given a piece of highlighted text, referred to as a passage, and a list of personas. Each persona will consist of a name for a member of a target audience, a description that describes this member, and the number of variations.

Your job is to translate and tailor the passage into marketable taglines for each persona. Each persona should have the same number of taglines as specified by the persona’s variation number. When the variation count is greater than 1, you should aim to maximize the variation between taglines for the personas. 

Your response should be formatted as a JSON array of tagline responses. The schema for a tagline response is: { "name": "", "description": "", "tagline": "" }. So the JSON output should look something like: [{ "name": "", "description": "", "tagline": "" },{ "name": "", "description": "", "tagline": "" },{ "name": "", "description": "", "tagline": "" }]. 

Do not include any text in your response. There should be no extra spaces around property names and values.

Let’s go through an example. The [PASSAGE] is “Robo advisors are the future of investing.” The list of [PERSONAS] is [{name: "Sarah", description: “Young professionals who don’t know a lot and have little money”, variationCount: 1}, {name: “Ben”, description: ”Mid career professionals who are too busy”, variationCount: 3}]. A valid response could be: 

[{"name": "Sarah", "description": "Young professionals who don’t know a lot and have little money", "tagline": "Are you a first time investor? Ease into it with automated investing for as little as $20 a week."}, {"name": "Ben", "description": "Mid career professionals who are too busy", "tagline": "Protect yourself from inflation. Our robo advisor will automate your investments for you based on your risk tolerance."}, {"name": "Ben", "description": "Mid career professionals who are too busy", "tagline": "Too busy to invest properly? Let our Robo advisor do the work for you."}, {"name": "Ben", "description": "Mid career professionals who are too busy", "tagline": "Do you want to make your money work for you, but unsure how to? Check out our robo investor."}]
"""

@app.get("/")
async def root():
    return 'api is running'


@app.get('/ai/')
async def queryAI(passage, personas):
    print('starting...')
    prompt = system_instructions + f'[PASSAGE]: {passage}\n' + f'[PERSONAS]: {personas}'
    output = ollama.generate(model='qwen2', prompt=prompt)
    return output
    

@app.get('/excel/')
async def send_excel(data):
    output = BytesIO()
    workbook = xlsxwriter.Workbook(output)
    worksheet = workbook.add_worksheet()
    worksheet.write(0, 0, 'Name')
    worksheet.write(0, 1, 'Description')
    worksheet.write(0, 2, 'Tagline')

    jsonData = json.loads(data)
    for [idx, row] in enumerate(jsonData):
        worksheet.write(idx+1, 0, row['name'])
        worksheet.write(idx+1, 1, row['description'])
        worksheet.write(idx+1, 2, row['tagline'])

    workbook.close()
    output.seek(0)
    headers = {
        'Content-Disposition': 'attachment; filename="PeopleSpeak.xlsx"'
    }
    return StreamingResponse(output, headers=headers)
