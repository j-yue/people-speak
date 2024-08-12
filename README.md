# People Speak

Repo for a [Canva Hackathon](https://canva.devpost.com/) project submission.

## Set up the app on Canva

- Follow [Canva's Steps](https://www.canva.dev/docs/apps/quick-start/#step-1-create-an-app-via-the-developer-portal) in creating an app.
- Give the app design read and design write permissions.
- Note the `APP ID` and `App Origin`.

## Set up the backend

Navigate to the backend folder.

### Step 1: Install prerequisites

The backend uses [FastAPI](https://fastapi.tiangolo.com/), [Uvicorn](https://www.uvicorn.org/), [XlsxWriter](https://pypi.org/project/XlsxWriter/), and [Ollama Python](https://github.com/ollama/ollama-python).

```
pip install "fastapi[standard]" uvicorn XlsxWriter ollama
```

The backend requires an LLM running locally.

Install [Ollama](https://ollama.com/).

This project uses [Qwen2](https://ollama.com/library/qwen2).

```
ollama pull qwen2
```

### Step 2: Configure server for HTTPS

The following instructions were adapted from [rajshirolkar's](https://dev.to/rajshirolkar/fastapi-over-https-for-development-on-windows-2p7d) helpful guide:

Install [mkcert](https://github.com/FiloSottile/mkcert).

Use mkcert to generate certificates.

```
mkcert -install
mkcert localhost 127.0.0.1 ::1
```

### Step 3: Whitelist your app

In `app/main.py`, replace the existing origin link with your `App Origin`.

## Set up the frontend

Navigate to the frontend folder.

### Step 1: Prerequisites

Install the version of Node as specified in [Canva Apps SDK prerequisites](https://www.canva.dev/docs/apps/prerequisites/).

### Step 2: Install Dependencies

```
npm install
```

### Step 3: Configure .env

In the frontend `.env` file, update `CANVA_APP_ID` with your `APP ID`.

## Running the project

### Step 1: Run the LLM locally

Make sure Qwen2 has been installed locally.

```
ollama pull qwen2
```

Then run Qwen2 locally.

```
ollama serve
```

### Step 2: Run the server

In the backend folder:

```
python server.py
```

### Step 3: Run the app

In the frontend folder:

```
npm run start
```

### Step 4: Preview the app

In the developer portal, navigate to the app and click the preview button.
