package ouch

type BadErrorCause string

const (
	BadErrorCauseTooHard         BadErrorCause = "too hard"
	BadErrorCauseTooGoodToBeTrue BadErrorCause = "too good to be true"
)

type BadError struct {
	Kind  string        `json:"kind" gotsrpc:"type:'BadError'"`
	Cause BadErrorCause `json:"cause"`
}

func (be *BadError) Error() string {
	return string(be.Cause)
}

type AwfulError struct {
	Kind string `json:"kind" gotsrpc:"type:'AwfulError'"`
}

func (ae *AwfulError) Error() string {
	return "this is simply awful"
}

type OuchError struct {
	Awful *AwfulError `json:"awful,omitempty" gotsrpc:"union"`
	Bad   *BadError   `json:"bad,omitempty" gotsrpc:"union"`
}

type Service interface {
	WhatCouldGoWrong() *OuchError
}
