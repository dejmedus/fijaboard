## Fijabord 


### Run locally

#### Backend

```zsh
cd backend
source venv/bin/activate
python3 app.py
```

#### to test backend Flask models in the flask shell:

``` zsh
flask shell
exit()
```

#### Flask tests:
``` python
python -m unittest tests.route_tests.<test_file_name>

# example:
python -m unittest tests.route_tests.test_collections
```

#### Frontend
```zsh
cd frontend
npm run dev
```

### Setup

#### Backend

```zsh
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Frontend

```zsh
cd frontend
npm install
```