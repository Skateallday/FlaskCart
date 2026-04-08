from wtforms import StringField, PasswordField, SubmitField, BooleanField,  IntegerField, TextAreaField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length, Email, NumberRange, Optional, URL


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
    recipe_name = StringField('Recipe name', validators=[DataRequired(), Length(min=2, max=100)])
    servings = IntegerField('Servings', validators=[DataRequired(), NumberRange(min=1)])
    image_url = StringField('Image URL', validators=[Optional(), URL()])
    image_alt = StringField('Image alt text', validators=[Optional(), Length(max=255)])
    short_description = TextAreaField('Short description', validators=[Optional(), Length(max=500)])
    prep_time_minutes = IntegerField('Prep time (minutes)', validators=[DataRequired(), NumberRange(min=0)])
    cook_time_minutes = IntegerField('Cook time (minutes)', validators=[DataRequired(), NumberRange(min=0)])
    total_time_minutes = IntegerField('Total time (minutes)', validators=[DataRequired(), NumberRange(min=0)])
    recipeType = StringField('Recipe type', validators=[DataRequired(), Length(min=2, max=50)])
    calories = IntegerField('Calories', validators=[Optional(), NumberRange(min=0)])
    submit = SubmitField('Save recipe')


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