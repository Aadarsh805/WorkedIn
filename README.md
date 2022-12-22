<h1 align="center"> WORKEDIN </h1>


<h3 align="center"> Short Brief </h3>

<p align="center">
WorkedIn is an application for people to share projects and collaborate with folks having good work ethics. Along with the skills , you can check the WORK ETHICS of the person if they would be suitable for collaboration
</p>

## Contents:
- About
- How it Works
- Upcoming Features
- Contributing Guidelines
- Tools and Packages
- Author

---

# ✊ About

> Look for right people to collaborate on projects with desirable skills and good **WORK ETHICS**.

We check work ethics of a person through ``CONTRACTS`` . Before starting a project, the team lead would create a contract between the team members and that contract would be shown in each member's profile. In this way, one can check the work ethics of a person through their past contracts whether they complete projects on time, ot they delay the projects frequently or if they are habitual of breaking or ghosting contract/projects.

The site is in `PROGRESS`.

---

# How it works

<!-- Before starting a project, you need to create a contract and a contract can only be created inside a group chat. You can s -->

<p style="clear:both;">
<img alt="Home page" src="https://user-images.githubusercontent.com/89806031/209111535-b0bb0b79-e07e-40db-b3c3-fc277830a8fd.png"  style="margin-left:10px" width="50%" align="right"/>
<h3 align="center">Create a Post</h3>

<p align="justify">
You can create a post regarding your project or devs you are looking to collaborate with or you can view other users post as well in the post feed below. We also allow uers to comment, like and share their or other user's posts. If someone is interested in your project they may approach you through chat section. 
</p>
<br /><br />
</p>
<!--  -->
<p style="clear:both;">
<img alt="Chat page" src="https://user-images.githubusercontent.com/89806031/209116220-067dacf3-5242-4f83-a757-3b6c4170e323.png"  style="margin-right:10px" width="50%" align="left"/>
<h3 align="center">Create a Group Chat</h3>
<p align="justify">
Before starting a project, you would create a contract and contract could only be created inside a group chat. After a group chat is created with the members who'll be working on the project, the group admin | lead would create a contract and other members can accept it or reject it accordingly.
<br/>
In the left section, you can view all your chats and on the right side, all team members of the selected chat appear.
<br/>
There are different symbols in front of the Group Chat names :- 
<br>
1) <ins>Open Lock</ins> :- Tells that contract hasn't been approved by all members or not even contracted<br/>
2) <ins>Closed Lock</ins> :- Tells that contract has been made and no member can casually exit the group. (Quitting the group would lead to breaking the contract)</br>
3) <ins>Broken Lock</ins> :- Tells that contract was broken, maybe someone left the project or someone ghosted<br/>
4) <ins>Double Tick</ins> :- Tells that contract was successfully completed within dueDate
</p>
<br />
</p>
<!--  -->
<p style="clear:both;">
<img alt="Contract" src="https://user-images.githubusercontent.com/89806031/209128795-b01c51cc-b4da-466a-ba3f-9b21f5963546.png" style="margin-left:10px" width="50%" align="right"/>
<img alt="Contract" src="https://user-images.githubusercontent.com/89806031/209129118-9b421ae4-0bd9-4bb5-b95a-5ce9afe82da8.png" style="margin-left:10px" width="50%" align="right"/>
<h3 align="center">Initialise Contract</h3>
<p align="justify">
Only the Admin or Group lead can initilaise CONTRACT. In the contract, the lead needs to specify Project's name, description, starting and due date and role and responsibilities of every member. 
<br/>
Once the contract is initialised, other members have to accept the contract. Until the contract isn't accepted by all, the contract isn't actually created.
<br/>
Once the contract is approved by all members, the group chat is now locked and the contract would be visible in each members profile.
<br/>
Only the admin can update or delete the contract, other team members can only accept or reject the contract, same while making a project submission.
<br/><br/>
The contract has different status as :-
<br />
1) In-Progress :- When submission is to be made and contract hasn't reached its due date.<br/>
2) Completed :- When submission has been made before the due date.<br/>
3) Delayed :- When submission hasn't been made yet and contract has crossed the due date.<br/>
4) Broken :- When someone left the contract in between or a successful ghost strike has been made.<br/>
</p>
<br />
</p>
<!--  -->
<p style="clear:both;">
<img alt="Contract Page" src="https://user-images.githubusercontent.com/89806031/209134744-71cce40e-483b-4bed-9beb-ff05ba5a8030.png
" style="margin-right:10px" width="50%" align="left"/>
<h3 align="center">All Contract</h3>
<p align="justify">
Only the Admin or Group lead can initilaise CONTRACT. In the contract, the lead needs to specify Project's name, description, starting and due date and role and responsibilities of every member. 
<br/>
</p>
<br/>
</p>

# Upcoming Features

1) **Ghost Strike Logic** :- For someone ghosting the project, team members can file a Ghost Request and if the person against whom the ghost request is registered doesn't responds within a time limit, the contract will break and it would be declared that that ghost broke the contract.

2) **Leave Chat API** :- If the contract is either broken or successful, members would have then access to exit the group chat. 

3) **Socket.io Implementation** :- For now, we havent implemented Socket.io logic due to which while sending a message in a chat, the page has to reload to show the posted messsage. To avoid this, we would implement Socket.io logic both in client and server, so that users can have a smooth messaging experience.

4) **Review System** :- After finishing the contract, team members would give reviews to other members, which would be shown in the contract for a better conclusion of one's work ethics.

5) **ActivityBox** :- We would like to show recent activities in the application, like contract creation, contract submission and more.

6) **ProfileBox** :- We are showing User's stats in the Profile Box in the Home page where we would show `Contract Stats`, `Karma` (ratings after finishing contract) and `Profile Views`. For Karma, it would be a virtual field averaging the ratings from all contracts of the user. Rest of the stats would be taken from User's model.

---


# Contribute

We welcome everyone either be Beginner or Expeienced in open source community to contribute to this project. You can suggest a new feature or can start working on any upcoming feature.

But make sure to raise an issue first before working on any feature and always create a different branch than main while working on any feature or bug

Be sure to read the <a href="https://github.com/Garvit1809/WorkedIn/blob/Documentation/CONTRIBUTING.md" target="_blank">WorkedIn Contributor Guide</a> on how to get started with the project and start contributing 😁.

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
