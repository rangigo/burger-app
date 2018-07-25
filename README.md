# Burger application made with React/Redux
## Live demo: https://rangigo.github.io/burger-app/

In this project, I learn how to use React features, syntaxes and concepts by developing a website to make a burger order.

I take advantage of how the components cycles and structures in React work to make the application dynamic. I also use Redux to manage my website's states so the data flows smoothly. 

In addition, asynchronous actions and side effects are orchestrated by Redux Saga. At first I used Redux Thunk to handle those behaviors, but after trying out Saga I prefer the overall structure it gave to my code base. It makes my actions creators leaner and separate the asynchronous code. 

Some additional libraries like axios, react-router-dom are utilized to access HTTP contents and routing my web. Furthermore, I apply CSS modules by configuring create-react-app webpack to my own predilection.

I use Firebase of Google as my backend server to store data and authenticate users.

## Features
* Display burger ingredients dynamically based on user inputs
* Form validation with user data
* State management with Redux
* Handle asynchronous actions & side effects with Redux Saga
* Fetch user's orders from server
* User authentication system

## Technologies used
* React 16.3
* React Router v4.0
* Redux + Redux Saga
* Axios
* Firebase
* Webpack