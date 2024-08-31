install:
	git submodule update --init --recursive
	npm ci
	cd frontend && npm install

build:
	npm cache clean --force
	git submodule update --init --recursive
	rm -rf frontend/build
	cd frontend && npm run build
	
deploy:
	git push heroku main

start:
	npx @hexlet/chat-server -s ./frontend/build
