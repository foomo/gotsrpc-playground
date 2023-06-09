/* eslint:disable */
// Code generated by gotsrpc https://github.com/foomo/gotsrpc/v2  - DO NOT EDIT.
import * as github_com_foomo_gotsrpc_playground_server_services_ouch from './vo-ouch'; // client/services/generated/client-ouch.ts to client/services/generated/vo-ouch.ts
import * as github_com_foomo_gotsrpc_playground_server_services_playground from './vo-playground'; // client/services/generated/client-ouch.ts to client/services/generated/vo-playground.ts
import * as github_com_foomo_gotsrpc_playground_server_services_todos from './vo-todos'; // client/services/generated/client-ouch.ts to client/services/generated/vo-todos.ts
import * as github_com_foomo_gotsrpc_playground_server_services_wof from './vo-wof'; // client/services/generated/client-ouch.ts to client/services/generated/vo-wof.ts
import * as time from './vo-time'; // client/services/generated/client-ouch.ts to client/services/generated/vo-time.ts

export class ServiceClient {
	public static defaultEndpoint = "/services/ouch";
	constructor(
		public transport:<T>(method: string, data?: any[]) => Promise<T>
	) {}
	async whatCouldGoWrong():Promise<github_com_foomo_gotsrpc_playground_server_services_ouch.OuchError|null> {
		return (await this.transport<{0:github_com_foomo_gotsrpc_playground_server_services_ouch.OuchError|null}>("WhatCouldGoWrong", []))[0]
	}
}