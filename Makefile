install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build -p 5000

start:
	npx start-server -s ./frontend/build -p $PORT

local-start:
	make start

build:
	rm frontend/build -rf
	npm install --prefix frontend
	npm run build