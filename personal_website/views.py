from django.shortcuts import render

def base(request):
    return render(request, 'base.html')

def resume(request):
    return render(request, 'resume.html')

def contact(request):
    return render(request, 'contact.html')

def projects(request):
    return render(request, 'projects.html')

def chatbot_demo(request):
    return render(request, 'chatbot_demo.html')