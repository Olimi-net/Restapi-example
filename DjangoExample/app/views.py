from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request, id=0):
    index = id
    colors = {"red": "красный", "green": "зеленый", "blue":"синий"}
    params={'title':'Example with Django', 'template_name':'index.htm', 'id':index, 'colors':colors}

    return render(request, "_layout.htm", context=params)

def about(request, name='О сайте'):
    name = request.POST.get("name", name)
    params={'title':'About app', 'template_name':'about.htm', 'name':name}
    return render(request, "_layout.htm", context=params)

def notfound(request):
    return HttpResponse("<h2>Page not found</h2>")
