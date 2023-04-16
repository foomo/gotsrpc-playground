// Code generated by gotsrpc https://github.com/foomo/gotsrpc/v2  - DO NOT EDIT.

package playground

import (
	go_context "context"
	go_net_http "net/http"

	gotsrpc "github.com/foomo/gotsrpc/v2"
	pkg_errors "github.com/pkg/errors"
)

type ServiceGoTSRPCClient interface {
	ImplementMe(ctx go_context.Context) (retImplementMe_0 string, clientErr error)
}

type HTTPServiceGoTSRPCClient struct {
	URL      string
	EndPoint string
	Client   gotsrpc.Client
}

func NewDefaultServiceGoTSRPCClient(url string) *HTTPServiceGoTSRPCClient {
	return NewServiceGoTSRPCClient(url, "/services/playground")
}

func NewServiceGoTSRPCClient(url string, endpoint string) *HTTPServiceGoTSRPCClient {
	return NewServiceGoTSRPCClientWithClient(url, endpoint, nil)
}

func NewServiceGoTSRPCClientWithClient(url string, endpoint string, client *go_net_http.Client) *HTTPServiceGoTSRPCClient {
	return &HTTPServiceGoTSRPCClient{
		URL:      url,
		EndPoint: endpoint,
		Client:   gotsrpc.NewClientWithHttpClient(client),
	}
}
func (tsc *HTTPServiceGoTSRPCClient) ImplementMe(ctx go_context.Context) (retImplementMe_0 string, clientErr error) {
	args := []interface{}{}
	reply := []interface{}{&retImplementMe_0}
	clientErr = tsc.Client.Call(ctx, tsc.URL, tsc.EndPoint, "ImplementMe", args, reply)
	if clientErr != nil {
		clientErr = pkg_errors.WithMessage(clientErr, "failed to call playground.ServiceGoTSRPCProxy ImplementMe")
	}
	return
}
