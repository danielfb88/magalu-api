all:
	@docker-compose up

network:
	@docker network create api_net

dev:
	@docker-compose run --rm --service-ports api npm run dev

debug:
	@docker-compose run --rm --service-ports api npm run debug

test:
	@docker-compose run --rm --service-ports api npm run test

install:
	@docker-compose run --rm api npm install
