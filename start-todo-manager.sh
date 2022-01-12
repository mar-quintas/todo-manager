#!/bin/bash
if [ "$1" = "fast" ];
then
  npm start &
  cd api-todo-manager ; flask run
else
  (npm install ; npm start) &
  (cd api-todo-manager ; python3 -m venv env ; . env/bin/activate ; pip install -r requirements.txt ; flask run)
fi

exec bash
