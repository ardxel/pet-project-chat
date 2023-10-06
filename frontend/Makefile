build_dev:
	docker build -t ardxel/chat-frontend:0.0.1 -f ./Dockerfile.dev .
run_dev:
	docker run -p 3000:3000 -v `pwd`:/usr/src/app/frontend --rm --name chat-frontend chat-frontend:0.0.1 