from django.shortcuts import get_object_or_404, redirect, render
from .models import Task

def home(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        if title and title.strip():
            Task.objects.create(title=title.strip())
        return redirect('home')
    tasks = Task.objects.all()
    return render(request, 'tasks/home.html', {'tasks': tasks})

def complete_task(request, task_id):
    if request.method == 'POST':
        task = get_object_or_404(Task, id=task_id)
        task.completed = not task.completed
        task.save()
    return redirect('home')

def delete_task(request, task_id):
    if request.method == 'POST':
        task = get_object_or_404(Task, id=task_id)
        task.delete()
    return redirect('home')
