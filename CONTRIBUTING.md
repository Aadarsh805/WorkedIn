# Contributing Guidelines

## 👨‍💻 Getting started


This section will walk you through how you can get started with the project.

### Directory Layout


<pre>

├── <strong>client</strong>
|      └── <strong>src</strong>
|           ├── <strong>assets</strong>
|           ├── <strong>components</strong>
|           |      ├── <strong>chatComp</strong>
|           |      ├── <strong>commentComp</strong>
|           |      ├── <strong>contractComp</strong>
|           |      ├── <strong>generalComp</strong>
|           |      ├── <strong>homeComp</strong>
|           |      ├── <strong>postComp</strong>
|           |      └── <strong>profileComp</strong>
|           |
|           ├── <strong>pages</strong>
|           |      ├── <strong>Chat.tsx</strong>
|           |      ├── <strong>Contracts.tsx</strong>
|           |      ├── <strong>Home.tsx</strong>
|           |      ├── <strong>Login.tsx</strong>
|           |      ├── <strong>Profile.tsx</strong>
|           |      └── <strong>Register.tsx</strong>
|           |
|           ├── <strong>types</strong>
|           |      ├── <strong>chatTypes.ts</strong>
|           |      ├── <strong>commentTypes.ts</strong>
|           |      ├── <strong>contractTypes.ts</strong>
|           |      ├── <strong>messageTypes.ts</strong>
|           |      ├── <strong>postTypes.ts</strong>
|           |      ├── <strong>searchTypes.ts</strong>
|           |      └── <strong>userTypes.ts</strong>
|           |
|           └── <strong>utils</strong>
|                  ├── <strong>apiRoutes.ts</strong>
|                  ├── <strong>globalConstants.ts</strong>
|                  ├── <strong>globalStyles.ts</strong>
|                  ├── <strong>helperFunction.ts</strong>
|                  ├── <strong>outsideAlerter.ts</strong>
|                  └── <strong>themes.ts</strong>
|
├── <strong>controllers</strong>
|      ├── <strong>authController.js</strong>
|      ├── <strong>chatController.js</strong>
|      ├── <strong>commentController.js</strong>
|      ├── <strong>contractController.js</strong>
|      ├── <strong>errorController.js</strong>
|      ├── <strong>handlerController.js</strong>
|      ├── <strong>messageController.js</strong>
|      ├── <strong>postController.js</strong>
|      └── <strong>userController.js</strong> 
|
├── <strong>models</strong>
|      ├── <strong>chatModel.js</strong>
|      ├── <strong>commentModel.js</strong>
|      ├── <strong>contractModel.js</strong>
|      ├── <strong>messageModel.js</strong>
|      ├── <strong>postModel.js</strong>
|      └── <strong>userModel.js</strong> 
|      
├── <strong>routes</strong>
|      ├── <strong>chatRoutes.js</strong>
|      ├── <strong>commentRoutes.js</strong>
|      ├── <strong>contractRoutes.js</strong> 
|      ├── <strong>messageRoutes.js</strong> 
|      ├── <strong>postRoutes.js</strong> 
|      └── <strong>userRoutes.js</strong> 
|   
├── <strong>utils</strong>
|      ├── <strong>apiFeatures.js</strong>
|      ├── <strong>appError.js</strong>
|      ├── <strong>catchAsync.js</strong> 
|      ├── <strong>email.js</strong> 
|      └── <strong>exludedFields.js</strong> 
|
├── <strong>views</strong>
|      ├── <strong>_style.pug</strong>
|      ├── <strong>baseEmail.pug</strong>
|      ├── <strong>passwordReset.pug</strong> 
|      └── <strong>welcome.pug</strong> 
|
├── app.js
|  
├── CONTRIBUTING.md
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


         - client
         - controllers
         - models
         - routes
         - utils
         - views
         - .env         <-- create it here
         - .gitignore
         - app.js
         - CONTRIBUTING.md
         - package-lock.json
         - package.json
         - README.ms



3. Inside the .env file, add key `MONGO_URL` and assign your MongoDB local host or Mongo Atls like this. Also add `PORT` key and make sure to give it a value other than **3000** (client is running on 3000)

```bash
# .env
PORT = 5000 
MONGO_URL = "YOUR_DB_LOCAL_HOST" 
# eg : mongodb://localhost/stresser or mongodb+srv://"Your username ":" your password "....
```


4. Starting the Server application
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