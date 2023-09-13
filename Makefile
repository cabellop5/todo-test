setup:
	cp .env.example .env
	npm install
	docker compose up -d

build-app:
	npm run build
	docker build --no-cache -t todo-test-app -f ./etc/docker/Dockerfile --build-arg PORT=$(PORT) --build-arg DATABASE_HOST=$(DATABASE_HOST) --build-arg DATABASE_PORT=$(DATABASE_PORT) --build-arg DATABASE_USER=$(DATABASE_USER) --build-arg DATABASE_PASSWORD=$(DATABASE_PASSWORD) --build-arg DATABASE_NAME=$(DATABASE_NAME) .

