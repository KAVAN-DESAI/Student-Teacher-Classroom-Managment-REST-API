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



## Data Model

- Here I have used embedded data model.

1. student:
```bash
{
  name: {
      type : String,
      required: true,
      min : 6,
      max: 255
  },
  email: {
      type : String,
      required: true,
      max: 255,
      min: 6
  },
  password:{
      type : String,
      required: true,
      max:1024,
      min:6
  },
  userType: {
      type: String,
      default: "student"
  },
  rollNumber: {
      type: String,
      required: true,
  },
  classesEnrolled:{
      type: Array,
      default:[],
  },
  date: {
      type: Date,
      default: Date.now
  }
}
```

2. teacher:
```bash
{
  name: {
      type : String,
      required: true,
      min : 6,
      max: 255
  },
  email: {
      type : String,
      required: true,
      max: 255,
      min: 6
  },
  password:{
      type : String,
      required: true,
      max:1024,
      min:6
  },
  userType: {
      type: String,
      default: "teacher"
  },
  classTutor:{
      type: Array,
      default:[],
  },
  date: {
      type: Date,
      default: Date.now
  }
}
```
3. classroom:
```bash
{
  name: {
      type : String,
      required: true,
      min : 6,
      max: 255
  },
  classroomCapacity:{
      type : String,
      required: true,
  },
  students:{
      type: Array,
      defauls: [],
  },
  resources :{
      type: Array,
      defauls: [],
  },
  createdBy: {
      type : String,
      required: true,
  },
  date: {
      type: Date,
      default: Date.now
  }
}
```



