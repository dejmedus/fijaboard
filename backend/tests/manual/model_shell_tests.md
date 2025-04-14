Model Tests
to enter Flask shell session: flask shell
to exit: exit ()

1. User Model
# Create test user
test_user = User(username='testuser', email='test@example.com')
test_user.set_password('password123')
db.session.add(test_user)
db.session.commit()

# Results
>>> test_user = User(username='testuser', email='test@example.com')
test_user.set_password('password123')
db.session.add(test_user)
db.session.commit()>>> test_user.set_password('password123')
>>> db.session.add(test_user)
>>> db.session.commit()
>>> print(f"Created user with ID: {test_user.id}")
Created user with ID: 2
>>> print(f"Password check: {test_user.check_password('password123')}")
Password check: True