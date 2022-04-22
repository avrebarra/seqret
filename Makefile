# simple makefile
@:
	@echo "no commands chosen.";
	@echo "try 'make help' to see available commands.";

## watch: Start development mode with watcher
watch:
	yarn start

## build: Build app
build:
	yarn build

## npxbuild: Build app
npxbuild:
	yarn npxbuild

## deploy: Deploy binary to server
deploy:
	@echo "Command to deploy script distribute atrifacts to cloud, on-prem or kubernetes clusters "

.PHONY: help
all: help
help: Makefile
	@echo
	@echo " Choose a command run with parameter options: "
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
