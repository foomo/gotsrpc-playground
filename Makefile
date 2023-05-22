
export LOG_LEVEL=debug
export LOG_MODE=dev

clean:
	rm -vf client/services/generated/vo-*.ts client/services/generated/client-*.ts server/services/*/*_gen.go

gotsrpc: clean
	gotsrpc gotsrpc.yaml

run-client:
	cd client && yarn install && yarn dev

run-server:
	cd server && go run main.go

run-all: run-client run-server

run:
	make -j2 run-all
