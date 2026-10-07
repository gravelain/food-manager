from rest_framework import status
from rest_framework.test import APITestCase


class ProductAPITest(APITestCase):

    def test_create_product(self):
        data = {
            "name": "Riz",
            "quantity": 10,
            "purchased_at": "2026-10-07",
            "expires_at": "2027-01-07",
        }

        response = self.client.post(
            "/api/products/",
            data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Riz")
        self.assertEqual(response.data["quantity"], 10)

    def test_create_product_with_invalid_dates(self):
        data = {
            "name": "Riz",
            "quantity": 10,
            "purchased_at": "2026-10-07",
            "expires_at": "2026-01-07",
        }

        response = self.client.post(
            "/api/products/",
            data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            "La date d'expiration ne peut pas être antérieure à la date d'achat.",
            str(response.data),
        )

    def test_create_product_with_negative_quantity(self):
        data = {
            "name": "Sucre",
            "quantity": -5,
            "purchased_at": "2026-10-07",
            "expires_at": "2027-01-07",
        }

        response = self.client.post(
            "/api/products/",
            data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("quantity", response.data)

    def test_update_product(self):
        # Create a product first
        data = {
            "name": "Farine",
            "quantity": 5,
            "purchased_at": "2026-10-07",
            "expires_at": "2027-01-07",
        }

        response = self.client.post(
            "/api/products/",
            data,
            format="json",
        )

        product_id = response.data["id"]

        # Update the product
        updated_data = {
            "name": "Farine de blé",
            "quantity": 8,
            "purchased_at": "2026-10-07",
            "expires_at": "2027-02-07",
        }

        response = self.client.put(
            f"/api/products/{product_id}/",
            updated_data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Farine de blé")
        self.assertEqual(response.data["quantity"], 8)

    def test_partial_update_product(self):
        # Create a product first
        data = {
            "name": "Lait",
            "quantity": 3,
            "purchased_at": "2026-10-07",
            "expires_at": "2026-11-07",
        }

        response = self.client.post(
            "/api/products/",
            data,
            format="json",
        )

        product_id = response.data["id"]

        # Partially update the product
        partial_data = {
            "quantity": 5,
        }

        response = self.client.patch(
            f"/api/products/{product_id}/",
            partial_data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["quantity"], 5)

    def test_get_product_list(self):
        # Create a product first
        data = {
            "name": "Beurre",
            "quantity": 2,
            "purchased_at": "2026-10-07",
            "expires_at": "2026-12-07",
        }

        self.client.post(
            "/api/products/",
            data,
            format="json",
        )

        response = self.client.get("/api/products/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_product_detail(self):
        # Create a product first
        data = {
            "name": "Fromage",
            "quantity": 4,
            "purchased_at": "2026-10-07",
            "expires_at": "2026-12-07",
        }

        response = self.client.post(
            "/api/products/",
            data,
            format="json",
        )

        product_id = response.data["id"]

        response = self.client.get(f"/api/products/{product_id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Fromage")

    def test_get_nonexistent_product_detail(self):
        response = self.client.get("/api/products/9999/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_product(self):
        data = {
            "name": "Produit à supprimer",
            "quantity": 1,
            "purchased_at": "2026-10-07",
            "expires_at": "2026-12-07",
        }

        response = self.client.post(
            "/api/products/",
            data,
            format="json",
        )

        product_id = response.data["id"]

        response = self.client.delete(
            f"/api/products/{product_id}/"
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        response = self.client.get(
            f"/api/products/{product_id}/"
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)