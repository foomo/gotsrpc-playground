package wof

type Trip struct {
	Kind        string `json:"kind" gotsrpc:"type:'Trip'"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Pet struct {
	Kind    string `json:"kind" gotsrpc:"type:'Pet'"`
	Name    string `json:"name"`
	Species string `json:"species"`
}

type Car struct {
	Kind  string `json:"kind" gotsrpc:"type:'Car'"`
	Brand string `json:"brand"`
	Model string `json:"model"`
	Seats int    `json:"seats"`
	Power int    `json:"power"`
}

type Price struct {
	Trip *Trip `json:"trip,omitempty" gotsrpc:"union"`
	Car  *Car  `json:"car,omitempty" gotsrpc:"union"`
	Pet  *Pet  `json:"pet,omitempty" gotsrpc:"union"`
}

type Service interface {
	Spin() Price
}
