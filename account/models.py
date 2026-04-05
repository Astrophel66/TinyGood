from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,email,full_name,phone,password=None,**extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not full_name:
            raise ValueError("Full name is required")
        if not phone:
            raise ValueError("Phone is required")
        
        email=self.normalize_email(email)
        user= self.model(email=email, full_name=full_name,phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email,full_name,phone,password=None,**extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, full_name,phone, password, **extra_fields)

class User(AbstractBaseUser,PermissionsMixin):
    email           = models.EmailField(unique=True)
    full_name       = models.CharField(max_length=300)
    phone       = models.CharField(max_length=10)
    bio             = models.TextField(blank=True,null=True)
    profile_picture = models.ImageField(null=True, blank=True)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)
    

    objects=UserManager()
    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['full_name','phone']
    

    def __str__(self):
        return self.email
        

