FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_ENV=development
EXPOSE 5000

# If your main file is app.py and you use "flask run"
# you’ll also need FLASK_APP=app.py, otherwise set it to your entry file.
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
