FROM python:3.12-slim
WORKDIR /app
COPY server.py /app/server.py
COPY . /app/web
ENV PORT=9560 WEB_ROOT=/app/web DATA_ROOT=/data
EXPOSE 9560
CMD ["python", "/app/server.py"]
