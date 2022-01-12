#!/bin/bash
(npm start) &
(cd api-todo-manager ; . env/bin/activate ; flask run)

exec bash
