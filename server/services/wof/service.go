package wof

type Trip struct {
	Kind        string `json:"kind" gotsrpc:"type:'Trip'"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Species string

const (
	Cat  Species = "cat"
	Dog  Species = "dog"
	Fish Species = "fish"
)

type Pet struct {
	Kind    string  `json:"kind" gotsrpc:"type:'Pet'"`
	Name    string  `json:"name"`
	Species Species `json:"species"`
}

type SeatCount int

const (
	TwoSeats   SeatCount = 2
	FiveSeats  SeatCount = 5
	SevenSeats SeatCount = 7
)

type Car struct {
	Kind  string    `json:"kind" gotsrpc:"type:'Car'"`
	Brand string    `json:"brand"`
	Model string    `json:"model"`
	Seats SeatCount `json:"seats"`
	Power int       `json:"power"`
}

type Price struct {
	Trip *Trip `json:"trip,omitempty" gotsrpc:"union"`
	Car  *Car  `json:"car,omitempty" gotsrpc:"union"`
	Pet  *Pet  `json:"pet,omitempty" gotsrpc:"union"`
}

type Service interface {
	Spin() Price
}
