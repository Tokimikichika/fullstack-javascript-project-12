install:
	npm ci
	cd frontend && npm install

build:
	rm -rf frontend/build
	npm run build
	
deploy:
	git push heroku main

start:
	npx @hexlet/chat-server -s ./frontend/build
