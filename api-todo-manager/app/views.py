from flask import Flask, request, jsonify, render_template, flash, redirect, url_for
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.urls import url_parse
from app.models import User
from app.db import db
from app import api

api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@api.route("/logout", methods=["POST"])
def logout():
    logout_user()
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/register', methods=["POST"])
def register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    confirmation = request.json.get("confirmation", None)

    if password == confirmation:
        user = User(email=email.lower())
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=email)
        response = {"access_token": access_token}
        return response
    else:
        return {"msg":"Password does not match"}, 401

@api.route('/login', methods=['GET', 'POST'])
def login():
    nologin = False
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email.lower()).first()

    if user is None or not user.check_password(password):
        nologin = True
        return {"msg":"Incorrect Login"}, 401
    else:
        access_token = create_access_token(identity=email)
        response = {"access_token": access_token}
        return response
