
FROM python:3.9

WORKDIR /webserver

COPY ./server.py /webserver

RUN pip install flask
RUN pip install -U flask_cors

ENV MAX_BITS 15

EXPOSE 5000

# Avvia il server Flask
CMD ["python", "server.py"]