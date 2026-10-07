from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    article_count = models.PositiveIntegerField()
    purchased_at = models.DateField()
    expires_at = models.DateField()

    def __str__(self):
        return self.name