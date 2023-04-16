package server

import "github.com/foomo/gotsrpc-playground/server/services/playground"

type playgroundService struct {
}

func NewPlayground() playground.Service {
	return &playgroundService{}

}

func (s *playgroundService) ImplementMe() string {
	return "Implement me, change me, have fun ..."
}
