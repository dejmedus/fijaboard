from .route_test import RouteTest
import json


class FijalistsTest(RouteTest):
    def test_get_collections(self, app):
        response = self.client.get('/api/collections')
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        
        self.assertEqual(len(data), 2)
        
        for collection in data:
            self.assertIn('id', collection)
            self.assertIn('name', collection)
            self.assertIn('description', collection)
            self.assertIn('is_private', collection)

    def test_get_collection(self, app):
        response = self.client.get(f'/api/collections/1')
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        
        self.assertEqual(data['name'], 'Summer Vacations')
        self.assertEqual(data['description'], 'Places to visit in summer')
        self.assertEqual(data['is_private'], False)
        self.assertIn('created_at', data)
        self.assertIn('updated_at', data)
        
    
    def test_error_collection(self, app):
        response = self.client.get('/api/collections/1000')
        
        self.assertEqual(response.status_code, 404)
