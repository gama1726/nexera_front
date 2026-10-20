# Nexera Front

Публичный маркетинговый сайт студии Nexera (Next.js App Router).

Backend API: отдельный репозиторий / папка **`nexera_back`** (`HaBbI4/nexera_back`).

## Требования

- Node.js 20+
- Запущенный `nexera_back` на `:8080` (для форм и опционального контента из API)

## Быстрый старт

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Запросы `/api/*` и `/media/*` проксируются на backend (`API_INTERNAL_URL`).

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Канонический URL сайта (SEO, sitemap, OG) |
| `API_INTERNAL_URL` | Базовый URL backend для Next rewrites и SSR fetch (по умолчанию `http://localhost:8080`) |
| `NEXT_PUBLIC_API_BASE` | Опционально: абсолютный API base в браузере (обычно не нужен при rewrites) |

См. `.env.example`.

На стороне backend разрешите Origin фронтенда:

```env
# nexera_back/.env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
# + production URL сайта
```

## Скрипты

```bash
npm run dev      # разработка
npm run build    # production-сборка
npm start        # запуск после build
npm run lint     # ESLint
```

## Документация

- `docs/FRONTEND_AUDIT.md` — аудит интеграции с backend
- `docs/CONTENT_REQUIRED.md` — макетный контент и что заменить
- `docs/21ST_COMPONENTS.md` — компоненты 21st.dev
- `docs/frontend-forms.md` — контракт публичных форм (лиды)

## Деплой

1. Собрать: `npm ci && npm run build`
2. Задать `NEXT_PUBLIC_SITE_URL` и `API_INTERNAL_URL` (внутренний URL API)
3. В `nexera_back` добавить Origin сайта в `CORS_ALLOWED_ORIGINS`
4. Запустить `npm start` или отдать `.next` через выбранный хостинг (Vercel/Node)

Формы лидов уходят из браузера на `/api/v1/leads` (same-origin rewrite) — не через SSR, чтобы rate limit считался по IP посетителя.
