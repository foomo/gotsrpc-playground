// Code generated by gotsrpc https://github.com/foomo/gotsrpc/v2  - DO NOT EDIT.

package playground

import (
	io "io"
	http "net/http"
	time "time"

	gotsrpc "github.com/foomo/gotsrpc/v2"
)

const (
	ServiceGoTSRPCProxyImplementMe = "ImplementMe"
)

type ServiceGoTSRPCProxy struct {
	EndPoint string
	service  Service
}

func NewDefaultServiceGoTSRPCProxy(service Service) *ServiceGoTSRPCProxy {
	return NewServiceGoTSRPCProxy(service, "/services/playground")
}

func NewServiceGoTSRPCProxy(service Service, endpoint string) *ServiceGoTSRPCProxy {
	return &ServiceGoTSRPCProxy{
		EndPoint: endpoint,
		service:  service,
	}
}

// ServeHTTP exposes your service
func (p *ServiceGoTSRPCProxy) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		return
	} else if r.Method != http.MethodPost {
		gotsrpc.ErrorMethodNotAllowed(w)
		return
	}
	defer io.Copy(io.Discard, r.Body) // Drain Request Body

	funcName := gotsrpc.GetCalledFunc(r, p.EndPoint)
	callStats, _ := gotsrpc.GetStatsForRequest(r)
	callStats.Func = funcName
	callStats.Package = "github.com/foomo/gotsrpc-playground/server/services/playground"
	callStats.Service = "Service"
	switch funcName {
	case ServiceGoTSRPCProxyImplementMe:
		var (
			args []interface{}
			rets []interface{}
		)
		executionStart := time.Now()
		implementMeRet := p.service.ImplementMe()
		callStats.Execution = time.Since(executionStart)
		rets = []interface{}{implementMeRet}
		if err := gotsrpc.Reply(rets, callStats, r, w); err != nil {
			gotsrpc.ErrorCouldNotReply(w)
			return
		}
		gotsrpc.Monitor(w, r, args, rets, callStats)
		return
	default:
		gotsrpc.ClearStats(r)
		gotsrpc.ErrorFuncNotFound(w)
	}
}