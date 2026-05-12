install:
	npm ci

# Настройка команд в системе для разработки
link:
	npm link

# Удобная обертка для первого запуска
setup: install link

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm run test