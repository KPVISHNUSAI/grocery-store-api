from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('id','username','email','password','role','phone','first_name', 'last_name')
        extra_kwargs = {
            'first_name':{'required': True},
            'last_name':{'required': True}
        }

        def create(self, validate_data):
            user = User.objects.create(
                username=validate_data['username'],
                email=validate_data['email'],
                first_name=validate_data['first_name'],
                last_name=validate_data['last_name'],
                phone=validate_data.get('phone',''),
                role=validate_data.get('role','customer')
            )
            user.set_password(validate_data['password'])
            user.save()
            return user
        

