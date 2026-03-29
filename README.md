# avito_order_002

Статический сайт с деплоем на GitHub Pages.

## Как выложить на `github.io`

1. Запушить репозиторий на GitHub.
2. В настройках репозитория открыть **Settings → Pages**.
3. В поле **Source** выбрать **GitHub Actions**.
4. Пушить изменения в ветку `main` (или `master`) — workflow `Deploy static site to GitHub Pages` автоматически развернёт сайт.

После первого успешного деплоя сайт будет доступен по адресу:

- `https://<username>.github.io/<repository>/`

Если нужен деплой в корень `https://<username>.github.io/`, репозиторий должен называться `<username>.github.io`.
