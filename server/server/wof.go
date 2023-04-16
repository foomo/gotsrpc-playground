package server

import (
	"math/rand"
	"runtime"
	"time"

	"github.com/foomo/gotsrpc-playground/server/services/wof"
)

type wofService struct {
	r *rand.Rand
}

func NewWof() wof.Service {
	return &wofService{
		r: rand.New(rand.NewSource(time.Now().UnixMicro())),
	}
}

func (s *wofService) Spin() wof.Price {
	// it has to spin for a little time
	time.Sleep(time.Second)

	switch int(s.r.Float64() * 3) {
	case 0:
		return wof.Price{
			Trip: &wof.Trip{
				Kind:        "Trip",
				Name:        "to the moon",
				Description: "takes you to the moon",
			},
		}
	case 1:
		return wof.Price{
			Car: &wof.Car{
				Kind:  "Car",
				Brand: "gocart",
				Model: "1.20",
				Seats: 1,
				Power: runtime.NumCPU(),
			},
		}
	case 2:
		fallthrough
	default:
		return wof.Price{
			Pet: &wof.Pet{
				Kind:    "Pet",
				Name:    "James",
				Species: "cat",
			},
		}
	}
}
