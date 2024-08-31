install:
	npm ci
	npm install
	cd frontend && npm install

build:
	rm -rf frontend/build
	cd frontend && npm run build
	
deploy:
	git push heroku main

start:
	npx @hexlet/chat-server -s ./frontend/build
