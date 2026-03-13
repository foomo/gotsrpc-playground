# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A full-stack demo for [gotsrpc](https://github.com/foomo/gotsrpc) — a code generation framework that creates TypeScript RPC clients from Go service interfaces. The project showcases various RPC patterns: simple calls, error handling, union types, scalar unions, and union errors.

## Build & Run Commands

This project uses [mise](https://mise.jdx.dev/) for tool version management (Go, Node, yarn). Run `mise install` to provision tools.

```bash
# via mise (preferred)
mise run gotsrpc        # Regenerate all TypeScript clients and Go handlers from gotsrpc.yaml
mise run clean          # Remove all generated files
mise run run-server     # Run Go server
mise run run-client     # Run Next.js dev server
mise run run            # Run both server and client in parallel

# via make (delegates to mise)
make gotsrpc
make clean
make run-server
make run-client
make run
```

The `gotsrpc` CLI tool must be installed separately to run code generation.

## Architecture

**Server** (`server/`): Go HTTP server using foomo's Keel framework. `main.go` sets up service handlers and a reverse proxy to the Next.js frontend. Service implementations live in `server/server/` and service interfaces (the gotsrpc generation targets) live in `server/services/`.

**Client** (`client/`): Next.js + React + TypeScript. Each demo page in `client/pages/` corresponds to a service. Transport layer (`client/services/transport.ts`) provides a fetch-based RPC transport with optional logging via Zustand.

**Code Generation** (`gotsrpc.yaml`): Defines 5 targets (helloworld, todos, wheeloffortune, playground, ouch). Each target maps a Go service interface to a generated TypeScript client (`client/services/generated/client-*.ts`) and value objects (`client/services/generated/vo-*.ts`). Go-side handlers are generated as `*_gen.go` files (gitignored).

## Key Patterns

- **Adding a new service**: Define Go interface in `server/services/<name>/`, add target + mapping in `gotsrpc.yaml`, run `make gotsrpc`, implement handler in `server/server/`, create page in `client/pages/`
- **Union types**: Use `gotsrpc:"union"` struct tag on Go types (see `server/services/wof/` for discriminated unions)
- **Error handling**: Services return `(result, error)` tuples; transport errors are separate from business logic errors (see todos service)
- **Transport layer**: Client RPC calls use a factory pattern — `transport(endpoint)` returns an async function that handles serialization and fetch
