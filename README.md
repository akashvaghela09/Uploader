# Uploder
Uploder is free & easy to use File Upload and data sharing site. with help of uploader files can be shared without any kind of restrictions such as upload limit or transfer limit.
### [Demo](https://uploder.vercel.app/)
=======================
### Tech Stack Used
Front End   | Back End
------------|----------
HTML        | Node.js
CSS         | Express.js
JavaScript  | Mongoose
React       | Nodemon
Redux       | 
Material UI | 

----------------------

### How to Install Project

1. Clone repo with ` git clone https://github.com/akashvaghela09/uploader.git` in your local system.
2. use `yarn ` or `npm install` to install npm packages.
3. set environment variables
* `DATABASE_URL=<mongoDB url>` in `/backend` folder for user and file data storage.
* `REACT_APP_MONGO_URL=<mongoDB api/files>` in `/client` folder for upload file history.
* `REACT_APP_USER_POST=<mongoDB api/user>` in `/client` folder for user auth.
* `REACT_APP_USER_LOGIN=<mongoDB api/user/login>` in `/client` folder for registration.

you can use `DATABASE_URL=mongodb://127.0.0.1:27017/test` if MongoDB is already installed. on otherside you can use `https://mocker23243.herokuapp.com/` mocker API for Testing purpose.

### Important Features
* Login/Register
* Upload
* Download
* Dashboard

### How To Use Project
#### Login/Register
- To Track and keep list of uploaded files by User Login/Register is Implemented, it's not a mandatory required to use project. 
- Register yourself if you don't have account, and if already registered then login to the site.
![Register](https://tgdown.eu-gb.mybluemix.net/15167851299438528/ss2.png)
![Login](https://tgdown.eu-gb.mybluemix.net/15167885659176896/ss1.png)

#### Upload Files
- Click on Browse and select any file which you want to upload. during upload you can check progress on right side.
![upload progress](https://tgdown.eu-gb.mybluemix.net/15168091817607104/ss5.png)

- Once Upload is completed Successfully, card will be displayed with download link.
![upload card](https://tgdown.eu-gb.mybluemix.net/15168126177345472/ss6.png)

#### Dashboard
- There is a hamburger menu on top-left corner which will open the drawer. you can varify your name and email address.
![drawer](https://tgdown.eu-gb.mybluemix.net/15168194896822208/ss3.png)

- Click on dashboard and get list of files uploaded by you. there will be a table denoting file name and size with download and delete buttons.
![dashboard](https://tgdown.eu-gb.mybluemix.net/15168607213682624/ss7.png)

- Click on Download and you will be redirect to download page.
- Click on Delete and file will be deleted from servers.
![Download](https://tgdown.eu-gb.mybluemix.net/15168675933159360/ss8.png)

#### FAQ
- You can check FAQ page if you have any query, or you can just simply reachout to me.
![FAQ](https://tgdown.eu-gb.mybluemix.net/15168744652636096/ss10.png)
***
## Contributor

### Akash Vaghela
- **Github** : https://github.com/akashvaghela09
- **LinkedIn** : https://www.linkedin.com/in/akashvaghela09