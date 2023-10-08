build_dev:
	docker build -t chat-backend:0.0.1 -f ./Dockerfile.dev .
run_dev:
	docker run -p 3111:3111 -v `pwd`:/usr/src/app/backend --rm --name chat-backend chat-backend:0.0.1 
build_prod:
	docker build -t ardxel/chat-backend:0.0.1 -f ./Dockerfile.prod .