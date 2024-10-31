install:
	npm ci

build-frontend:
	rm -rf frontend/build
	npm install --prefix frontend
	cd frontend && npx webpack --config webpack.config.js --mode production

start-frontend:
	npx webpack serve --config frontend/webpack.config.js --mode development

start-backend:
	npm start

start:
	make start-backend

local-start:
	make start-backend & make start-frontend

build:
	make build-frontend
