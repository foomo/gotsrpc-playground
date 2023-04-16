package helloworld

type Service interface {
	Hello(name string) (greeting string)
}
