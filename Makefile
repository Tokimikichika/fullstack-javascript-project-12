install:
	npm ci
	cd frontend && npm install

build:
	npm cache clean --force
	rm -rf frontend/build
	cd frontend && make build
	
deploy:
	git push heroku main

start:
	npx @hexlet/chat-server -s ./frontend/build
