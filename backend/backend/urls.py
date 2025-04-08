from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from accounts.views import RegisterView, LoginView, RefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/refresh/', RefreshView.as_view(), name='refresh'),

    path('', lambda request: JsonResponse({'message': 'Welcome to the Exam Portal API 🚀'})),
]
