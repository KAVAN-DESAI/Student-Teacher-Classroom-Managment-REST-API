<div align="center">
  <h1>Backend API using Node js</h1>
</div>

## Table of Content

- [Introduction](#introduction)
- [Heroku Deployment](#heroku-deployment)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)

## Introdution

- API is for classroom management with 2 users:
  1. student
  2. teacher

- API's responds dynamically based on the user
- Tokens are generated using JWT library
- MongoDB is used as database

## Heroku Deployment

- Link to homepage endpoint : - https://obscure-mountain-47599.herokuapp.com/

## API Endpoints

```json
"Homepage": "https://obscure-mountain-47599.herokuapp.com/",
"Authentification": {
   "register": "/api/user/register",
   "login": "/api/user/login"
},
"Classroom": {
   "addClassroom": "/api/classroom/add",
   "getAllClassroom": "/api/classroom/classrooms",
   "updateClassroom": "/api/classroom/update",
   "deleteClassroom": "/api/classroom/delete",
   "assignClassroom": "/api/classroom/assign"
},
"ClassroomFile": {
   "uploadFileClassroom": "/api/classroom/file/upload",
   "renameFileClassroom": "/api/classroom/file/rename",
   "updateFileClassroom": "/api/classroom/file/update",
   "deleteFileClassroom": "/api/classroom/file/delete"
},
"Feed": {
   "getClassesFeed": "/api/feed/classes",
   "getFilesFeedByFilter": "/api/feed/files",
   "searchFileByName": "/api/feed/files/search"
}
 
```

## Installation

- Download the project using this drive link : - https://drive.google.com/drive/folders/1LRpUb2CzjwlDZzWNjCRdMDxMgYmMHNqV?usp=sharing
- Open the terminal and input the Following commands in root dir(ensure to have node js installed)

```bash
npm i
npm start
```

- to get all endpoints we need to call homepage API(using postman)
1. open the postman and import the file [postman collection](https://drive.google.com/drive/folders/1Rw2awqvt7kfpnzzrehElJVof98D2T6kp?usp=sharing)
2. got to Home collection and select homepage API and send the request
3. we get a json response will all endpoints







