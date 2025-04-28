from .route_test import RouteTest
import json


class FijalistsTest(RouteTest):
    def test_get_users(self, app):
        response = self.client.get('/api/users')
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        
        self.assertEqual(len(data), 1)
        
        for user in data:
            self.assertIn('id', user)
            self.assertIn('username', user)
            self.assertIn('email', user)

    def test_get_user(self, app):
        response = self.client.get(f'/api/users/1')
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        
        self.assertEqual(data['username'], 'bob')
        self.assertEqual(data['email'], 'bob@pigeonmail.com')
        
    
    def test_error_user(self, app):
        response = self.client.get('/api/users/1000')
        
        self.assertEqual(response.status_code, 404)
