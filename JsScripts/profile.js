var user = JSON.parse(sessionStorage.getItem("user")); 
var users=JSON.parse(localStorage.getItem('users'));
var index =0;

for(var i=0; i<users.length; i++)
{
  if(user.email==users[i].email)
  {
    index=i;
    break;

  }
}

class User{
  

    constructor(userName,userFirstName,userLastName,DateOfBirth,CityName,StreetAddress,PostBox,email,file,pw,pw2){
      this.userName=userName;
      this.userFirstName=userFirstName;
      this.userLastName=userLastName;
      this.DateOfBirth=DateOfBirth;
      this.CityName=CityName;
      this.StreetAddress=StreetAddress;
      this.PostBox=PostBox;
      this.email=email;
      this.file=file;
      this.pw=pw;
      this.pw2=pw2;
    }
    
   
  
  }



document.getElementById("Name").textContent += user.userName;
document.getElementById("userFirstName").textContent += user.userFirstName;
document.getElementById("userLastName").textContent += user.userLastName;
document.getElementById("pw").textContent += user.pw;
document.getElementById("Name1").textContent += user.userName;
document.getElementById("Email").textContent += user.email;
document.getElementById("Email1").textContent += user.email;
document.getElementById("DateOfBirth").textContent += user.DateOfBirth;
document.getElementById("city").textContent += user.CityName;
document.getElementById("StreetAddress").textContent += user.StreetAddress;
document.getElementById("postBox").textContent += user.PostBox;
document.getElementById("profileImg").src += user.file;

var imgSrc=user.file;

var img = document.createElement("img");
img.src = `user.file`;
var src = document.getElementById("profileImg");
src.appendChild(img);

function localStorageClean()
{
    sessionStorage.clear();
    //sessionStorage.removeItem('user');
    location.replace("../pages/Login.html");
}

function editingDetails()
{
  
 var editableElements = document.querySelectorAll("[contenteditable=false]");

 for (var i = 0; i < editableElements.length; ++i) 
 {
    editableElements[i].setAttribute("contentEditable", true);
 }
 
 
}
function saveDetails()
{
    
  var userName =document.getElementById("Name").innerHTML;
  var userFirstName=document.getElementById('userFirstName').innerHTML;
  var userLastName=document.getElementById('userLastName').innerHTML;
  var DateOfBirth=document.getElementById('DateOfBirth').innerHTML;
  var CityName =document.getElementById('city').innerHTML;
  var StreetAddress=document.getElementById('StreetAddress').innerHTML
  var PostBox=document.getElementById('postBox').innerHTML;
  var email = document.getElementById('Email').innerHTML;
  var file = 0;
  var pw = document.getElementById('pw').innerHTML;
  var pw2 = document.getElementById('pw').innerHTML;


 
  let  newUser = new User(userName,userFirstName,userLastName,DateOfBirth,CityName,StreetAddress,PostBox,email,file,pw,pw2);
   users[index]=newUser;
   localStorage.setItem(`users`, JSON.stringify(users));
   alert("your details has Updated sucssesfully");
}