from wtforms import StringField, PasswordField, SubmitField, BooleanField,  IntegerField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length, Email, NumberRange


class contactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=30)])
    emailAddress = StringField('Email', validators=[DataRequired(), Email()])
    message = StringField('Write your message here...', validators=[DataRequired(), Length(min=20, max=250)])
    submit = SubmitField('Send!')


class loginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=2, max=30)])
    password = PasswordField('password', validators=[DataRequired(), Length(min=2, max=30)])
    submit = SubmitField('login')

class registration(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=2, max=30)])
    password = PasswordField('password', validators=[DataRequired(), Length(min=2, max=30)])
    emailAddress = StringField('Email Address', validators=[DataRequired(), Email()])
    submit = SubmitField('Register')

class NewFoodsForm(FlaskForm):
    foodName = StringField('foodName', validators=[DataRequired(), Length(min=2, max=30)])
    foodType = StringField('foodType', validators=[DataRequired(), Length(min=2, max=30)])
    calories = IntegerField('calories', validators=[DataRequired(), NumberRange(min=0)])
    servingSize = IntegerField('servingSize', validators=[DataRequired(), NumberRange(min=0)])
    isVegan=BooleanField('isVegan')
    isGlutenFree=BooleanField('isGlutenFree')
    stock = IntegerField('stock', validators=[DataRequired(), NumberRange(min=0)])


class NewRecipeForm(FlaskForm):
    foodName = StringField('foodName', validators=[DataRequired(), Length(min=2, max=30)])
    foodType = StringField('foodType', validators=[DataRequired(), Length(min=2, max=30)])
    calories = IntegerField('calories', validators=[DataRequired(), NumberRange(min=0)])
    servingSize = IntegerField('servingSize', validators=[DataRequired(), NumberRange(min=0)])
    isVegan=BooleanField('isVegan')
    isGlutenFree=BooleanField('isGlutenFree')
    stock = IntegerField('stock', validators=[DataRequired(), NumberRange(min=0)])     


class EditFoodForm(FlaskForm):
    foodName = StringField('foodName', validators=[DataRequired(), Length(min=2, max=30)])
    foodType = StringField('foodType', validators=[DataRequired(), Length(min=2, max=30)])
    calories = IntegerField('calories', validators=[DataRequired(), NumberRange(min=0)])
    servingSize = IntegerField('servingSize', validators=[DataRequired(), NumberRange(min=0)])
    isVegan=BooleanField('isVegan')
    isGlutenFree=BooleanField('isGlutenFree')
    stock = IntegerField('stock', validators=[DataRequired(), NumberRange(min=0)])     


class EditRecipeForm(FlaskForm):
    foodName = StringField('foodName', validators=[DataRequired(), Length(min=2, max=30)])
    foodType = StringField('foodType', validators=[DataRequired(), Length(min=2, max=30)])
    calories = IntegerField('calories', validators=[DataRequired(), NumberRange(min=0)])
    servingSize = IntegerField('servingSize', validators=[DataRequired(), NumberRange(min=0)])
    isVegan=BooleanField('isVegan')
    isGlutenFree=BooleanField('isGlutenFree')
    stock = IntegerField('stock', validators=[DataRequired(), NumberRange(min=0)])                                