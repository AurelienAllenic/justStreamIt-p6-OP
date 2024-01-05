# views.py

from django.shortcuts import render

def home_view(request):
    # Code pour la page d'accueil
    return render(request, 'home.html')


