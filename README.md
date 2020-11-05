# Tecnical test for Full-Stack position

## Live server
[https://caique-bunny-ui.herokuapp.com/](https://caique-bunny-ui.herokuapp.com/)

## Setup and run dev servers

### frontend
    Setup: `npm install .`.
    Run local server: `npm start`.

### backend servers
    Setup a local postgres instance according to config on the project.
    In a python 3.7+ env install project requirements with `pip install -r requirements.txt`.
    To run a local server: `uvincorn main:app --port 8000` (or port 8001)
    To run tests simply run `pytest`.
