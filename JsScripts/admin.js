var users=JSON.parse(localStorage.getItem('users'));

let btnGet = document.querySelector('.buttonTable');
let myTable = document.querySelector('#table');


let headers = ['UserName', 'userFirstName', 'userLastName','DateOfBirth','CityName','StreetAddress','PostBox','email','file','pw','pw2'];
btnGet.addEventListener('click', () => {
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    users.forEach(emp => {
        let row = document.createElement('tr');
        Object.values(emp).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            
            cell.appendChild(textNode);
            row.appendChild(cell);
          
        })
        table.appendChild(row);
        
    });
    myTable.appendChild(table);
});

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

//////////////////////////////////////////////////
function editingUsers()
{
  let foo = prompt('Enter here The Mail For the user you want to edit: ');
 userShow(foo);
 var editableElements = document.querySelectorAll("[contenteditable=false]");

 for (var i = 0; i < editableElements.length; ++i) 
 {
    editableElements[i].setAttribute("contentEditable", true);
 }
 
 
}
/**//////////////////////////////// */
function editingDetails()
{
  
 var editableElements = document.querySelectorAll("[contenteditable=false]");

 for (var i = 0; i < editableElements.length; ++i) 
 {
    editableElements[i].setAttribute("contentEditable", true);
 }
 
 
}
function userShow(foo)
{
  
  var users=JSON.parse(localStorage.getItem('users'));
  var index =0;
  
  for(var i=0; i<users.length; i++)
  {
    if(foo==users[i].email)
    {
      index=i;
      break;
  
    }
  }
  
  
  
  
  
  document.getElementById("Name").textContent += users[index].userName;
  document.getElementById("userFirstName").textContent += users[index].userFirstName;
  document.getElementById("userLastName").textContent += users[index].userLastName;
  document.getElementById("pw").textContent += users[index].pw;
  document.getElementById("Name1").textContent += users[index].userName;
  document.getElementById("Email").textContent += users[index].email;
  document.getElementById("Email1").textContent += users[index].email;
  document.getElementById("DateOfBirth").textContent += users[index].DateOfBirth;
  document.getElementById("city").textContent += users[index].city;
  document.getElementById("StreetAddress").textContent += users[index].StreetAddress;
  document.getElementById("postBox").textContent += users[index].PostBox;
  document.getElementById("profileImg").textContent += users[index].file;
  
  var imgSrc=user.file;
  
  var img = document.createElement("img");
  img.src = `user.file`;
  var src = document.getElementById("profileImg");
  src.appendChild(img);
}


function localStorageClean()
{
    sessionStorage.clear();
    //sessionStorage.removeItem('user');
    location.replace("../pages/login.html");
}


function saveDetails(foo)
{
  var users=JSON.parse(localStorage.getItem('users'));
  var index =0;
  
  for(var i=0; i<users.length; i++)
  {
    if(foo==users[i].email)
    {
      index=i;
      break;
  
    }
  }
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
//func to delete user //kutaiba ///new
function deleteUser() {
  var userEmail = prompt("Enter the email of the user you want to delete: ");
  
  var userIndex = users.findIndex(user => user.email === userEmail);
  
  if (userIndex !== -1) {
      users.splice(userIndex, 1); // מחיקת המשתמש מהמערך
      localStorage.setItem('users', JSON.stringify(users)); // עדכון הנתונים בLocalStorage
      
      // ניתן לבצע כאן פעולות נוספות שלאחר המחיקה (למשל, עדכון הצגת הטבלה עם המשתמשים המעודכנת)
      
      alert("User has been deleted successfully!");
  } else {
      alert("User not found!");
  }
  location.reload();
}
let deleteUserBtn = document.getElementById('deleteUserBtn');
deleteUserBtn.addEventListener('click', deleteUser);
