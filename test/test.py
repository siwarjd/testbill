import unittest
from fastapi.testclient import TestClient
from main import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_create(self):
        response = self.client.post("/customer", json={"name": "jalled", "first_name": "Siwar", "birthday": "1999.04.1999"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertIn("random_number", response.json())

    def test_search(self):
        response = self.client.get("/customer/0b7f72d2-9f1e-49bb-a6e8-8393b1194b1e")
        self.assertEqual(response.status_code, 200)
        self.assertIn("customer", response.json())
    def test(self):
        response = self.client.get("/customer/0b7")
        self.assertEqual(response.status_code, 200)
        self.assertIn("customer", response.json())
if __name__ == "__main__":
    unittest.main()
