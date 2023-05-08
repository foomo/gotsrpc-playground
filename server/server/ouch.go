package server

import (
	"math/rand"
	"time"

	"github.com/foomo/gotsrpc-playground/server/services/ouch"
)

type ouchService struct {
	r *rand.Rand
}

func NewOuch() ouch.Service {
	return &ouchService{
		r: rand.New(rand.NewSource(time.Now().UnixMicro())),
	}
}

func (s *ouchService) WhatCouldGoWrong() *ouch.OuchError {
	if int(s.r.Float64()*2) == 0 {
		var cause ouch.BadErrorCause
		if int(s.r.Float64()*2) == 0 {
			cause = ouch.BadErrorCauseTooHard
		} else {
			cause = ouch.BadErrorCauseTooGoodToBeTrue
		}
		return &ouch.OuchError{
			Bad: &ouch.BadError{
				Kind:  "BadError",
				Cause: cause,
			},
		}
	} else {
		return &ouch.OuchError{
			Awful: &ouch.AwfulError{
				Kind: "AwfulError",
			},
		}
	}
}
