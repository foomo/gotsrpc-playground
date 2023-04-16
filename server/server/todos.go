package server

import (
	"time"

	"github.com/foomo/gotsrpc-playground/server/services/todos"
)

type todosService struct {
	todos todos.Todos
}

func NewTodos() todos.Service {
	return &todosService{
		todos: todos.Todos{
			todos.Todo{
				ID:       "hello",
				Text:     "Play with todo service",
				Complete: false,
				Created:  time.Now(),
			},
			todos.Todo{
				ID:       "run-example",
				Text:     "run example service",
				Complete: true,
				Created:  time.Now(),
			},
		},
	}
}

func (s *todosService) GetTodos() (todos.Todos, *todos.Error) {
	return s.todos, nil
}

func (s *todosService) CreateTodo(text string) (updatedTodos todos.Todos, err *todos.Error) {
	if text == "500" {
		panic("you asked for it ;)")
	}
	if text == "" {
		return nil, todos.NewError(todos.ErrCreateEmpty)
	}
	for _, todo := range s.todos {
		if todo.Text == text {
			return nil, todos.NewError(todos.ErrCreateDuplicate)
		}
	}
	s.todos = append(
		todos.Todos{
			todos.Todo{
				ID:       todos.TodoID(text),
				Text:     text,
				Complete: false,
				Created:  time.Now(),
			}},
		s.todos...,
	)
	return s.todos, nil
}

func (s *todosService) SetComplete(ID todos.TodoID, complete bool) (updatedTodos todos.Todos, err *todos.Error) {
	for i, todo := range s.todos {
		if todo.ID == ID {
			s.todos[i].Complete = complete
			return s.todos, nil
		}
	}
	return nil, todos.NewError(todos.ErrNotFound)
}

func (s *todosService) DeleteTodo(ID todos.TodoID) (updatedTodos todos.Todos, err *todos.Error) {
	newTodos := todos.Todos{}
	deleted := false
	for _, todo := range s.todos {
		if todo.ID == ID {
			deleted = true
			continue
		}
		newTodos = append(newTodos, todo)
	}
	if !deleted {
		return nil, todos.NewError(todos.ErrNotFound)
	}
	s.todos = newTodos
	return s.todos, nil
}
