<div style="text-align: center; padding: 40px; padding-bottom: 0px;">
    <img src="https://raw.githubusercontent.com/dejmedus/fijaboard/main/frontend/public/logo.png" alt="FIJA Logo" width="80" height="80" />
    <p style="padding-top: 20px;">A pinterest-like discovery platform for travelers seeking authentic local experiences beyond tourist hotspots</p>
</div>

![Catalog Page](/frontend/public/fijalist-screenshot.png)

#### Built by [@FaithKauwe](https://github.com/FaithKauwe), [@lawrence-ivan-reyes](https://github.com/lawrence-ivan-reyes), [@Aellantis](https://github.com/Aellantis), and [@dejmedus](https://github.com/dejmedus)

### Built with
- [Flask](https://flask.palletsprojects.com/en/2.3.x/)
  - Flask-SQLAlchemy
  - Flask-Login
- [SQLite](https://www.sqlite.org/index.html)
- [Remix](https://remix.run/)
- [Tailwind CSS](https://tailwindcss.com/)



### Local Development 

These commands assume you've already completed the [initial setup](#initial-setup) once before.

#### Running the Application

Backend

```zsh
cd backend
source venv/bin/activate
python3 app.py
```
Frontend
```zsh
cd frontend
npm run dev
```

#### Database Seeding

Reset your database or get the latest schema and data:

```bash
cd backend
sqlite3 instance/fijaboard.db < db_dumps/initial_fijalists.sql
``` 

#### Testing

Flask shell

``` zsh
flask shell
exit()
```

Automated tests:
``` python
python3 -m unittest tests.route_tests.<test_file_name>
# or
python3 -m unittest discover -s tests
```

#### Initial Setup

Backend

```zsh
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Frontend

```zsh
cd frontend
npm install
```
