# React Router: prefix, index, route 정리

`@react-router/dev/routes`에서 제공하는 라우트 정의 헬퍼 정리.

---

## index

**역할:** 해당 경로의 **기본(루트) 페이지**를 지정한다.

- URL 경로에 **추가 세그먼트 없이** 그 prefix만으로 접근할 때 보여줄 컴포넌트
- `prefix`와 함께 쓰면, 그 prefix의 **진입점**이 됨

**예시 (routes.ts 기준)**

`index()`는 **단독으로 URL을 결정하지 않는다.**  
반드시 **상위 컨텍스트(루트 또는 prefix)** 안에서 "그 경로의 기본 페이지"를 지정하는 역할이다.

```ts
// 루트 레벨 index → /
index('common/pages/home-page.tsx')

// prefix('products', [...]) 안의 index → /products
...prefix('products', [
  index('features/products/pages/products-page.tsx'),
  
  // prefix('leaderboards', [...]) 안의 index → /products/leaderboards
  ...prefix('leaderboards', [
    index('features/products/pages/leaderboards-page.tsx'),
  ]),
  
  // prefix('categories', [...]) 안의 index → /products/categories
  ...prefix('categories', [
    index('features/products/pages/categories-page.tsx'),
  ]),
]),
```

| 위치 | index 파일 | 실제 URL |
|------|-----------|----------|
| 루트 레벨 | home-page.tsx | `/` |
| `prefix('products', [...])` 안 | products-page.tsx | `/products` |
| `prefix('products', [...])` → `prefix('leaderboards', [...])` 안 | leaderboards-page.tsx | `/products/leaderboards` |
| `prefix('products', [...])` → `prefix('categories', [...])` 안 | categories-page.tsx | `/products/categories` |

**핵심:** `index()`가 어느 `prefix()` 안에 있느냐에 따라 URL이 결정된다.

---

## prefix

**역할:** **공통 URL 앞부분**을 묶어서, 그 아래에 여러 라우트를 한꺼번에 정의한다.

- 첫 번째 인자: 공통 경로 (예: `'products'`, `'leaderboards'`)
- 두 번째 인자: 그 prefix 아래에 올 라우트 배열 (다른 `index`, `route`, `prefix` 조합)

**예시**

```ts
...prefix('products', [
  index('...products-page.tsx'),        // /products
  ...prefix('leaderboards', [ ... ]),   // /products/leaderboards/...
  ...prefix('categories', [ ... ]),     // /products/categories/...
  route('/search', '...'),              // /products/search
  route('/submit', '...'),              // /products/submit
]),
```

- `prefix('products', [...])` → 모든 자식 라우트 앞에 `/products`가 붙음
- 그 안에 `prefix('leaderboards', [...])` → `/products/leaderboards/...` 형태
- `route('/search', ...)` → 경로가 prefix와 합쳐져 `/products/search`가 됨

**중첩 예시**

```ts
...prefix('leaderboards', [
  index('...leaderboards-page.tsx'),           // /products/leaderboards
  route('/yearly/:year', '...'),               // /products/leaderboards/yearly/2024
  route('/monthly/:year/:month', '...'),       // /products/leaderboards/monthly/2024/01
]),
```

---

## route (참고)

**역할:** **경로와 파일을 1:1로** 연결한다.

- 첫 번째 인자: path (동적 세그먼트는 `:param` 형태)
- 두 번째 인자: 해당 페이지 컴포넌트 파일 경로

```ts
route('/yearly/:year', 'features/products/pages/yearly-leaderboards-page.tsx')
// → /products/leaderboards/yearly/2024 접근 시 yearly-leaderboards-page.tsx 렌더
```

---

## 요약

| 헬퍼 | 용도 |
|------|------|
| **index(path)** | 이 prefix의 **기본 페이지** (그 URL만 입력했을 때 보이는 페이지) |
| **prefix(segment, routes)** | 공통 **앞 경로**를 묶고, 그 아래 라우트들을 배열로 정의 |
| **route(path, file)** | 특정 경로(및 동적 파라미터)와 페이지 파일 매핑 |

prefix로 경로를 묶고, index로 “그 경로의 첫 화면”, route로 세부 경로를 나누는 구조로 쓰면 된다.
