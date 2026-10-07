from django.db import models

# Mes models Pour un produit alimentaire
class Product(models.Model):
    name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField()
    purchased_at = models.DateField()
    expires_at = models.DateField()


    def __str__(self):
        return self.name
