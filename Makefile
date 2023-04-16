

gotsrpc:
	gotsrpc gotsrpc.yaml

run-client:
	cd client && yarn install && yarn dev

run-server:
	cd server && go run main.go

run-all: run-client run-server

run:
	make -j2 run-all
