#!/bin/bash
set -eu

function create_user_and_database() {
	local database=$1
	local user=$2
	echo "  Creating user '$user' with access to database '$database'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER "$user";
	    CREATE DATABASE "$database";
	    GRANT ALL PRIVILEGES ON DATABASE "$database" TO "$user";
	    \connect "$database"
	    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
}

create_user_and_database "$POSTGRES_DATABASES" "$POSTGRES_USER"

