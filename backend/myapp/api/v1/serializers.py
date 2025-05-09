from myapp.models import Product
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenRefreshSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        # se não veio JSON, busca o cookie
        if not attrs.get("refresh"):
            attrs["refresh"] = self.context["request"].COOKIES.get("refresh_token")
        return super().validate(attrs)