package server

import (
	"time"

	"github.com/foomo/gotsrpc-playground/server/services/playground"
)

type playgroundService struct {
}

func NewPlayground() playground.Service {
	return &playgroundService{}

}

func (s *playgroundService) ImplementMe() playground.Greeting {
	return playground.Greeting{
		Text: "Starting breaking things here 😎",
		Time: time.Now(),
	}
}
