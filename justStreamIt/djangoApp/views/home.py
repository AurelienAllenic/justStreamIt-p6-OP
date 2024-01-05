from django.shortcuts import render

def home_view(request):
    # Vue pour la page d'accueil
    return render(request, 'home.html')

def categories_view(request):
    # Vue pour la page des catégories
    return render(request, 'categories.html')
