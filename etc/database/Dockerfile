FROM postgres:14.5

COPY create-database.sh /docker-entrypoint-initdb.d/
COPY create-tables.sql /docker-entrypoint-initdb.d/

RUN chmod -R +x /docker-entrypoint-initdb.d/create-database.sh
