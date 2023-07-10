export default class User {
  constructor(
    userName,
    userFirstName,
    userLastName,
    DateOfBirth,
    CityName,
    StreetAddress,
    PostBox,
    email,
    file,
    pw,
    pw2
  ) {
    this.userName = userName;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.DateOfBirth = DateOfBirth;
    this.CityName = CityName;
    this.StreetAddress = StreetAddress;
    this.PostBox = PostBox;
    this.email = email;
    this.file = file;
    this.pw = pw;
    this.pw2 = pw2;
  }

  get getFullName() {
    return this.userFirstName + this.userLastName;
  }
  get getDateOfBirth() {
    return this.DateOfBirth.toString();
  }
}

// export default class User {
//   // Properties
//   user_Name;
//   user_Password;
//   user_photo;
//   user_First_Name;
//   user_Last_Name;
//   user_Email_Address;
//   user_Birthday;
//   user_City;
//   user_street;
//   user_Address_Number;

//   // Constructor with default values
//   constructor(
//     user_Name,
//     user_Password,
//     user_photo,
//     user_First_Name,
//     user_Last_Name,
//     user_Email_Address,
//     user_Birthday,
//     user_City,
//     user_street,
//     user_Address_Number
//   ) {
//     this.user_Name = user_Name;
//     this.user_Password = user_Password;
//     this.user_photo = user_photo;
//     this.user_First_Name = user_First_Name;
//     this.user_Last_Name = user_Last_Name;
//     this.user_Email_Address = user_Email_Address;
//     this.user_Birthday = user_Birthday;
//     this.user_City = user_City;
//     this.user_street = user_street;
//     this.user_Address_Number = user_Address_Number;
//   }

//   // Methods
//   GetFullName() {
//     return this.user_First_Name + " " + this.user_Last_Name;
//   }

//   GetBirthdate() {
//     let year = this.user_Birthday.substr(0, 4);
//     let month = this.user_Birthday.substr(5, 2);
//     let day = this.user_Birthday.substr(8, 2);

//     month = Number(month);
//     let monthName = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     month = monthName[month - 1];
//     let dateFormat = day + " " + month + " " + year;
//     return dateFormat;
//   }

//   GetAddress() {
//     return (
//       this.user_City +
//       " / " +
//       this.user_street +
//       " / " +
//       this.user_Address_Number
//     );
//   }

//   updateDetails(
//     user_Name,
//     user_Password,
//     user_photo,
//     user_First_Name,
//     user_Last_Name,
//     user_Email_Address,
//     user_Birthday,
//     user_City,
//     user_street,
//     user_Address_Number
//   ) {
//     this.user_Name = user_Name;
//     this.user_Password = user_Password;
//     this.user_photo = user_photo;
//     this.user_First_Name = user_First_Name;
//     this.user_Last_Name = user_Last_Name;
//     this.user_Email_Address = user_Email_Address;
//     this.user_Birthday = user_Birthday;
//     this.user_City = user_City;
//     this.user_street = user_street;
//     this.user_Address_Number = user_Address_Number;
//   }

//   ChangePassword(user_Name, user_Password, new_Password) {
//     if (this.user_Name !== user_Name) {
//       return alert("User name not matching");
//     }
//     if (this.user_Password !== user_Password) {
//       return alert("User password not matching");
//     }
//     this.user_Password = new_Password;
//     localStorage.setItem("user", user_Name, this.user);
//     localStorage.setItem("userpassword", this.user_Password);
//   }
// }

// export class Admin {
//   // Constructor with default values
//   constructor(adminUserNameP, adminPasswordP) {
//     if (adminUserNameP === adminUserName && adminPasswordP === adminPassword) {
//       this.adminName = adminUserNameP;
//       this.adminPass = adminPasswordP;
//     }
//   }
// }
