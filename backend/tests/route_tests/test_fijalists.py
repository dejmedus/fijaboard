from .route_test import RouteTest
import json


class FijalistsTest(RouteTest):
    def test_get_fijalists(self, app):
        response = self.client.get('/api/fijalists')
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        
        self.assertEqual(len(data), 2)
        
        for fijalist in data:
            self.assertIn('id', fijalist)
            self.assertIn('title', fijalist)
            self.assertIn('description', fijalist)
            self.assertIn('cover_image', fijalist)
            self.assertIn('content', fijalist)
            self.assertIn('tags', fijalist)
            
            for tag in fijalist['tags']:
                self.assertIn('id', tag)
                self.assertIn('name', tag)

    def test_get_fijalist(self, app):
        response = self.client.get(f'/api/fijalists/1')
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        
        self.assertEqual(data['title'], 'Beach Vacation')
        self.assertEqual(data['description'], 'Best beaches to visit')
        self.assertEqual(data['cover_image'], 'beach.jpg')
        self.assertEqual(data['content'], 'This is a super cool beach')
    
    def test_error_fijalist(self, app):
        response = self.client.get('/api/fijalists/1000')
        
        self.assertEqual(response.status_code, 404)