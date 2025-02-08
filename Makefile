install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build

start:
	make start-backend

local-start:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm install --prefix frontend
	npm run build