# To-do Manager

A React-Flask App to create, edit, check and delete tasks.

## Usage

*Requirements*
  Python3

  npm @6.14.8

  Download the repo and in `/todo-manager` run `./start-todo-manager.sh`

  This will install Reacts requirements from ./package.json and start the server on localhost:3000

  On parallel will create and start a virtual environment via python, install Flask requirements from ./api-todo-manager/requirements.py and start flask server on localhost:5000 - *this may take some minutes longer than react's load*

  The database is already initialized, migrated and updated, there is no action required. I used sqlite3, sqlAlchemy & marshmallow-sqlalchemy.

### About the app

Register as a new user, on register you will be logged in and the Add tasks section will render.

There you can add new tasks, check or uncheck them, edit, save or cancel changes and delete tasks.

Finally you can also logout of the app.


## Files

### Frontend

The frontend was developed in React js, with Axios, React-Router-DOM and ReactBootstrap.

Building from the base `react-create-app`

#### todo-manager/src/app.js

Its the app component that will render the rest of the components.

Imports libraries and components from ./src/components

Receives states from two helper files and passes them down as props to the rest of the components when required.

For the render of the routes a ternary operator is used dividing the routes depending on the "token" (which is provided to the user on login/register and kept in localstorage), if no token is provided the user can only acces Login or Register routes, on the other hand if the token is provided, the user can access its tasks.

### Backend

The backend was developed in Python3 - Flask with Flask-restful

The endpoints and methods used are in ./api-todo-manager/app/todos/api_v1_0/resources.py

The database models can be found in ./api-todo-manager/app/models.py

The login/register/logout are in ./api-todo-manager/app/views.py

The db model includes todos, and users, that have "todos", and the login/register utilizes the user id to identify (and filter by) the tasks from the loged in user, so that the user can logout and at a later time, login and access all of its tasks that where saved in the db under its user id. 
