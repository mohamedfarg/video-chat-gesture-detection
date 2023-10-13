from django.shortcuts import render, redirect

from django.shortcuts import render, get_object_or_404
from .models import *

from django.contrib.auth import authenticate, login, logout

from django.contrib import messages
from django.http import HttpResponse,JsonResponse

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import redirect
from .forms import *

# Create your views here.
def home(request):
    users=User.objects.all().count()
    rooms=Rooms.objects.all().count()
    models=Ai_model.objects.all().count()
    context = {
        'users':users,
        'rooms':rooms,
        'models':models,
        
        }
    return render(request, 'home.html',context)

@login_required(login_url='login')
def train_model(request):
    return render(request, 'model/train.html')

@login_required(login_url='login')
def load_model(request):
    return render(request, 'model/load.html')

@login_required(login_url='login')
def prepare_back(request):
    return render(request, 'prepare_back.html')

@login_required(login_url='login')
def model_prepare(request):
    return render(request, 'model/model.html')

@login_required(login_url='login')
def join_chat_view(request, room_code):
    context = {}

    context['room_name'] = room_code

    return render(request, 'chat/video.html', context=context)

@login_required(login_url='login')
def rooms(request):
    rooms = Rooms.objects.all()
   
    return render(request, 'chat/rooms.html',{'rooms':rooms})
# user profile



def signup(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        form = CreateUserForm()
        if request.method == 'POST':
            form = CreateUserForm(request.POST)
            if form.is_valid():
                form.save()
                user = form.cleaned_data.get('username')
                messages.success(request, 'Account was created for ' + user)

                return redirect('login')

        context = {'form': form}
        return render(request, 'auth/signup.html', context)


def login_page(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.info(request, 'Username OR password is incorrect')

        context = {}
        return render(request, 'auth/login.html', context)

@login_required(login_url='login')
def logoutUser(request):
    logout(request)
    return redirect('home')

def get_file(request):
    user=User.objects.get(username="sasa")
    
    modelss=Ai_model.objects.filter(author = user)
    

    print(modelss[0].model_file.read)
    return HttpResponse("k")
