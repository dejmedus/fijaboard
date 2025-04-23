## Fijabord 


### Run locally

#### Backend

```zsh
cd backend
source venv/bin/activate
python3 app.py
```
#### to test backend Flask models in the flask shell:
``` 
flask shell
exit()
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
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
## Database Setup

If you need to reset your database or get the latest schema and data, run this command from the `backend` directory:

```bash
sqlite3 instance/fijaboard.db < db_dumps/initial_fijalists.sql
``` 

#### Frontend

```zsh
cd frontend
npm install
```