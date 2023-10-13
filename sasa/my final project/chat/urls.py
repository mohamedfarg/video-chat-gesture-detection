from django.urls import path
from .views import *
urlpatterns = [
    path("",home,name="home"),
    path("activity/",prepare_back,name="activity"),
    
    # Model
    path("activity/model/train/",train_model,name="train"),
    path("activity/model/load/",load_model,name="load"),
    path("activity/model/",model_prepare,name="model"),
    
    
    #authentication
    path("login/",login_page,name="login"),
    path("signup/",signup,name="signup"),
    path("logout/",logoutUser,name="logout"),
    # path("video_call/<str:room_code>/",video_call),
    
    
    #test
    path("get_file/",get_file,name="get_file"),
    path('activity/rooms',rooms,name="rooms"),
    path('join_chat_view/<str:room_code>/', join_chat_view, name='video_call'),
    
]