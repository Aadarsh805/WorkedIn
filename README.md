<h1 align="center"> WORKEDIN </h1>


<h3 align="center"> Short Brief </h3>

<p align="center">
WorkedIn is an application for people to share projects and collaborate with folks having good work ethics. Along with the skills , you can check the `WORK ETHICS` of the person if he would be suitable for collaboration
</p>

## Contents:
- About
- Project Starter
- Glimpse of the site
- Tools and Packages
- Author

---

# ✊ About

> Look for right people to collaborate on projects with desirable skills and good **WORK ETHICS**.

The site is in `PROGRESS`.

---

# 👨‍💻 Getting started


This section will walk you through how you can get started with the project.

### Directory Layout


<pre>

├── <strong>client</strong>
|
├── <strong>server</strong>
|      ├── <strong>Controllers</strong>
|      │      ├── <strong>authController.js</strong>
|      │      ├── <strong>chatController.js</strong>
|      │      └── <strong>commentController.js</strong> 
|      │      └── <strong>errorController.js</strong> 
|      │      └── <strong>handlerFactory.js</strong> 
|      │      └── <strong>messageController.js</strong> 
|      │      └── <strong>postControllers.js</strong> 
|      │      └── <strong>userControllers.js</strong> 
|      │
|      ├── <strong>Models</strong>
|      │      ├── <strong>chatModel.js</strong>
|      │      ├── <strong>commentModel.js</strong>
|      │      └── <strong>contractModel.js</strong> 
|      │      └── <strong>messageModel.js</strong> 
|      │      └── <strong>postModel.js</strong> 
|      │      └── <strong>userModel.js</strong> 
|      │
|      ├── <strong>Routes</strong>
|      │      ├── <strong>chatRoutes.js</strong>
|      │      ├── <strong>commentRoutes.js</strong>
|      │      └── <strong>contractRoutes.js</strong> 
|      │      └── <strong>messageRoutes.js</strong> 
|      │      └── <strong>postRoutes.js</strong> 
|      │      └── <strong>userRoutes.js</strong> 
|      |
|      ├── <strong>Utils</strong>
|      │      ├── <strong>apiFeatures.js</strong>
|      │      ├── <strong>appError.js</strong>
|      │      └── <strong>catchAsync.js</strong> 
|      │      └── <strong>email.js</strong> 
|      │      └── <strong>exludedFields.js</strong> 
|      |
|      ├── <strong>Views</strong>
|      │      ├── <strong>_style.pug</strong>
|      │      ├── <strong>baseEmail.pug</strong>
|      │      └── <strong>passwordReset.pug</strong> 
|      │      └── <strong>welcome.pug</strong> 
|      │  
|      └── app.js
|  
|
└── README.md
</pre>



### Run on your local server

You will need [NodeJS](), [Git]() and [MongoDB]() installed to run this project locally

      node@v16.13.0 or higher
      npm@8.1.0 or higher
      git@2.34.1 or higher

If you dont have [MongoDB]() you use [MongoDB Atls]()


1. Clone the repo or fork this repo
 ```bash
 git clone https://github.com/Garvit1809/WorkedIn
```

2. Create a file called .env in the Backend directory of your project:


       server
       └──- Controllers
           - Models
           - Routes
           - Utils
           - Views
           - .env         <-- create it here
           - .gitignore
           - app.js
           - package-lock.json
           - package.json



3. Inside the .env file, add key `MONGO_URL` and assign your MongoDB local host or Mongo Atls like this. Also add `PORT` key and make sure to give it a value other than **3000** (client is running on 3000)

```bash
# .env
PORT = 5000 
MONGO_URL = "YOUR_DB_LOCAL_HOST" 
# eg : mongodb://localhost/stresser or mongodb+srv://"Your username ":" your password "....
```


1. Starting the Server application
```bash
cd server 
npm install
nodemon index.js
```
   `This will start server on localhost:5000`     

5. Starting the Client application.
```bash
cd client 
npm install
npm start
```
   `This will start client app on localhost:3000`  


---

# 🧰 Tools & Packages

## Client Dependencies


  | Package | Description | version |
  | ------------ | ------------- | ------------- |


## Server Dependencies



  | Package | Description | version |
  | ------------ | ------------- | ------------- |
  | [bcryptjs](https://www.npmjs.com/package/bcryptjs) | A library to help you hash password | 2.4.3 |
  | [cors](https://www.npmjs.com/package/cors) | A package providing express middleware | 2.8.5 |
  | [dotenv](https://www.npmjs.com/package/dotenv) | A library that loads environment variables from a .env file into process.env | 16.0.2 |
  | [express](https://expressjs.com) | Node.js web application framework for server side scripting | 4.18.1 |
  | [html-to-text](https://www.npmjs.com/package/html-to-text) | Node.js web application framework for server side scripting | 8.2.1 |
  | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | Node.js web application framework for server side scripting | 8.5.1 |
  | [mongoose](https://mongoosejs.com) | Elegant mongodb object modeling for node.js | 6.6.2 |
  | [nodemailer](https://nodemailer.com/about/) | Elegant mongodb object modeling for node.js | 6.8.0 |
  | [pug](https://pugjs.org/api/getting-started.html) |  A template engine for Node and browser | 3.0.2 |
  | [validator](https://github.com/validatorjs/validator.js) | A library of string validators and sanitizers. | 13.7.0 |


## Server devDependencies

  | Package | Description | version |
  | ------------ | ------------- | ------------- |
  | [nodemon](https://www.npmjs.com/package/nodemon) | A library to automatically restart node application | 2.0.16 |



## 👦 Author

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://garvits-portfolio.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/garvit-varshney-a35055220/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/garv18twt)
