package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/foomo/gotsrpc-playground/server/server"
	"github.com/foomo/gotsrpc-playground/server/services/helloworld"
	"github.com/foomo/gotsrpc-playground/server/services/ouch"
	"github.com/foomo/gotsrpc-playground/server/services/playground"
	"github.com/foomo/gotsrpc-playground/server/services/todos"
	"github.com/foomo/gotsrpc-playground/server/services/wof"
	"github.com/foomo/keel"
	"go.uber.org/zap"
)

func main() {

	// this is a playground service - do not look at it, as it is NOT a good
	// example how to build services. It is designed to serve the gotsrpc playground

	svr := keel.NewServer()

	l := svr.Logger()

	// reverse proxy for the Next.js frontend
	nextURL, err := url.Parse("http://127.0.0.1:3000")
	must("parse next url", err)
	revereseProxy := httputil.NewSingleHostReverseProxy(nextURL)

	// instatiate example service implementations and proxies
	proxyHelloWorld := helloworld.NewDefaultServiceGoTSRPCProxy(server.NewHelloWorld())
	proxyTodos := todos.NewDefaultServiceGoTSRPCProxy(server.NewTodos())
	proxyWof := wof.NewDefaultServiceGoTSRPCProxy(server.NewWof())
	proxyPlayground := playground.NewDefaultServiceGoTSRPCProxy(server.NewPlayground())
	proxyOuch := ouch.NewDefaultServiceGoTSRPCProxy(server.NewOuch())

	// in order to keep the service implementations trivial,
	// I am taking concurrency out of the equation
	lock := &sync.Mutex{}

	svr.AddService(
		keel.NewServiceHTTP(
			svr.Logger(),
			"playground",
			"localhost:8080",
			http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				ll := l.With(zap.String("path", r.URL.Path))
				if strings.HasPrefix(r.URL.Path, "/services/") {
					ll.Info("serving a gotsrpc service")
					// no concurrency
					lock.Lock()
					defer lock.Unlock()

			// delegate calls to the respective gotsrpc service proxies
			switch true {
			case strings.HasPrefix(r.URL.Path, "/services/ouch"):
				proxyOuch.ServeHTTP(w, r)
			case strings.HasPrefix(r.URL.Path, "/services/wof"):
				proxyWof.ServeHTTP(w, r)
			case strings.HasPrefix(r.URL.Path, "/services/helloworld"):
				proxyHelloWorld.ServeHTTP(w, r)
			case strings.HasPrefix(r.URL.Path, "/services/todos"):
				// slow down to allow proper state demo on client side
				time.Sleep(time.Second)
				proxyTodos.ServeHTTP(w, r)
			case strings.HasPrefix(r.URL.Path, "/services/playground"):
				proxyPlayground.ServeHTTP(w, r)
			default:
				http.NotFound(w, r)
			}

			return
		}
		ll.Info("passing request to Next.js backend")
		revereseProxy.ServeHTTP(w, r)
	})))
	svr.Run()
}

func must(comment string, err error) {
	if err != nil {
		fmt.Println(comment, err)
		os.Exit(1)
	}
}
