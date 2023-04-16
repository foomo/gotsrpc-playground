package server

import "github.com/foomo/gotsrpc-playground/server/services/helloworld"

type helloWorldService struct {
}

func NewHelloWorld() helloworld.Service {
	return &helloWorldService{}
}

func (s *helloWorldService) Hello(name string) (greeting string) {
	return "Hello " + name
}
