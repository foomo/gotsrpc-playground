package playground

import time "time"

type Greeting struct {
	Text string    `json:"text"`
	Time time.Time `json:"time"`
}

type Service interface {
	ImplementMe() Greeting
}
