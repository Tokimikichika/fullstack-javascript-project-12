install:
	npm cache clean --force
	npm install
	cd frontend && npm install

build:
	cd frontend && npm run build

start:
	npx @hexlet/chat-server -s ./frontend/build
