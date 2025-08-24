INPUT_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
$(eval $(INPUT_ARGS):;@:)

composer-i:
	@echo Installing composer dependencies
	@docker compose run php composer install
npm-i:
	@docker compose up -d
	@docker compose exec vite npm install
key:
	@docker compose run php /app/artisan key:generate

restart r:
	@make down
	@make up
up:
	@echo Starting containers, detached. Use "make up-a" to run attached
	@docker compose up -d $(INPUT_ARGS)
	@docker compose exec -d vite npm run dev -- --host
up-a:
	@echo Starting containers, attached
	@docker compose up
down:
	@echo Stopping containers
	@docker compose down $(INPUT_ARGS)
check:
	@echo Running TypeScript check.
	@docker compose exec vite npm run check

db-import:
	@echo Importing DB from file $(INPUT_ARGS)
	@docker compose cp $(INPUT_ARGS) db:/tmp/dump.sql
	@docker compose exec db sh -c "psql -U user app < /tmp/dump.sql"
	@docker compose exec db sh -c "rm /tmp/dump.sql"
db-export:
	@docker compose exec db sh -c "pg_dump app -U user --clean > /var/backups/dump.sql"
	@docker compose cp db:/var/backups/dump.sql ./dump.sql
	@echo Exported DB to dump.sql

bash b:
	@docker compose exec php bash
supervisor-bash:
	@docker compose exec supervisor bash
db-bash:
	@docker compose exec db bash
node-bash:
	@docker compose exec vite sh
