# gotsrpc playground

playground project to learn https://github.com/foomo/gotsrpc referenced on https://www.foomo.org/docs/projects/gotsrpc .

## use the playground

In case you have not installed it, install `gotsrpc` by following the instructions https://github.com/foomo/gotsrpc#installation

The playground comes with a Makefile, that supports mutliple use cases:

### run to play with the client

If you want to run the server untouched and want to play around with the frontend:

```shell
# will run client and server
make run
```

### run to play with client and server

Open first terminal to run the client:

```shell
# will run client only - client is hot reloading and does not need to be
# restarted as it runs yarn dev and all of it's Next.js magic
make run-client
```

Open a second terminal to iterate on the server:

```shell
# 1 run gotsrpc and regenerate gode
make gotsrpc

# 2 will run server only
make run-server

# change code
# goto 1
```