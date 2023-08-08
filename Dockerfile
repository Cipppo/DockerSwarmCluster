
FROM python:3.9

WORKDIR /webserver

COPY ./server.py /webserver

RUN pip install flask

RUN pip install Flask-Cors

# Avvia il server Flask
CMD ["python", "server.py"]