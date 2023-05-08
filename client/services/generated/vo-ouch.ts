/* eslint:disable */
// Code generated by gotsrpc https://github.com/foomo/gotsrpc/v2  - DO NOT EDIT.
import * as github_com_foomo_gotsrpc_playground_server_services_ouch from './vo-ouch'; // client/services/generated/vo-ouch.ts to client/services/generated/vo-ouch.ts
import * as github_com_foomo_gotsrpc_playground_server_services_playground from './vo-playground'; // client/services/generated/vo-ouch.ts to client/services/generated/vo-playground.ts
import * as github_com_foomo_gotsrpc_playground_server_services_todos from './vo-todos'; // client/services/generated/vo-ouch.ts to client/services/generated/vo-todos.ts
import * as github_com_foomo_gotsrpc_playground_server_services_wof from './vo-wof'; // client/services/generated/vo-ouch.ts to client/services/generated/vo-wof.ts
import * as time from './vo-time'; // client/services/generated/vo-ouch.ts to client/services/generated/vo-time.ts
// github.com/foomo/gotsrpc-playground/server/services/ouch.AwfulError
export interface AwfulError {
	kind:'AwfulError';
}
// github.com/foomo/gotsrpc-playground/server/services/ouch.BadError
export interface BadError {
	kind:'BadError';
	cause:github_com_foomo_gotsrpc_playground_server_services_ouch.BadErrorCause;
}
// github.com/foomo/gotsrpc-playground/server/services/ouch.BadErrorCause
export enum BadErrorCause {
	TooGoodToBeTrue = "too good to be true",
	TooHard = "too hard",
}
// github.com/foomo/gotsrpc-playground/server/services/ouch.OuchError
export type OuchError = github_com_foomo_gotsrpc_playground_server_services_ouch.AwfulError | github_com_foomo_gotsrpc_playground_server_services_ouch.BadError | undefined
// end of common js