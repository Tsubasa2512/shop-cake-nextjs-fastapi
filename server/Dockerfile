FROM python:3.12-slim

ENV PYTHONUNBUFFERED = true

WORKDIR /code

RUN apt-get update && apt-get -y install libpq-dev gcc

COPY pyproject.toml poetry.lock /code/

RUN pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-root

COPY app /code/app
COPY alembic /code/alembic
COPY alembic.ini /code/
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 8000

CMD [ "poetry" , "run" ,"uvicorn" , "app.main:app" , "--host","0.0.0.0","--port","8000" ]