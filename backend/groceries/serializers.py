from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields = ['id', 'name', 'quantity', 'purchased_at', 'expires_at']
        fields = "__all__"

    def validate(self, data):


        purchased_at = data.get(
            "purchased_at",
            self.instance.purchased_at if self.instance else None,
        )

        expires_at = data.get(
            "expires_at",
            self.instance.expires_at if self.instance else None,
        )

        if purchased_at and expires_at and expires_at < purchased_at:
            raise serializers.ValidationError(
                "La date d'expiration ne peut pas être antérieure à la date d'achat."
            )

        return data