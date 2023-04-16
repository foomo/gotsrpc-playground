package todos

import "time"

type Error string

const (
	ErrCreateEmpty     Error = "ErrCreateEmpty"
	ErrCreateDuplicate Error = "ErrCreateDuplicate"
	ErrNotFound        Error = "ErrNotFound"
)

func (e *Error) String() string {
	return string(*e)
}

func (e *Error) Error() string {
	return e.String()
}

func NewError(err Error) *Error {
	return &err
}

type TodoID string

type Todo struct {
	ID       TodoID    `json:"id"`
	Text     string    `json:"text"`
	Complete bool      `json:"complete"`
	Created  time.Time `json:"created"`
}

type Todos []Todo

type Service interface {
	GetTodos() (todos Todos, err *Error)
	CreateTodo(text string) (todos Todos, err *Error)
	SetComplete(ID TodoID, complete bool) (todos Todos, err *Error)
	DeleteTodo(ID TodoID) (todos Todos, err *Error)
}
