This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies at the root directory level:

```bash
npm i
# or
yarn install
# or
pnpm i
```

Then, start the frontend application:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

In another terminal, navigate to /server, and install dependencies as before. Once installed, start the server as before.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.
Open [http://localhost:9000](http://localhost:9000/docs) with your browser to see the swagger UI.


# Frontend Documentation

## Layout.tsx
The application is wrapped with `TanstackProvider` to enable dynamic data fetching, both from the server-side and client-side.

## Tanstack
Tanstack supports dynamic data fetching and Server-Side Rendering (SSR). The hooks `useMovies`, `useMovie`, and `useRating` are integral to the application, designed to make API calls to the server, fetch movies, or mutate a rating. All hooks utilize the `queryKey` property, facilitating query caching and enhancing data fetching reactivity.

### Custom Hooks:
- `useMovies`
- `useMovie`
- `useRating`

## Routes
The application contains two primary routes within the `app` directory:
- `/movies`
- `/movies/:id`

Both routes utilize a Tanstack Hydration wrapper (`Home/MovieWrapper.tsx`), which prefetches movies server-side and hydrates them on the client-side upon retrieval.

### Home Page (`/movies`)
- The Home page utilizes search parameters, including `page`, `limit`, and `search`.
- These parameters are passed down to the `HomeWrapper` and then to the client-side `Home` component.

#### Home.tsx
This component embodies the structure and logic of the `/movies` page. The `useMovies` hook is triggered upon rendering, responding dynamically to changes in `page`, `limit`, and `search` props.

### Movie Page (`/movies/:id`)
- The `id` parameter of a movie is passed to `MovieWrapper` and eventually to the client-side `Movie` component.

#### Movie.tsx
This component encompasses the `/movies/:id` page’s JSX structure and logic. It utilizes three hooks for state management: `useMovie`, `useRating`, and `useRouter`.

- `useMovie`: Fetches the selected movie.
- `useRating`: Executes a PUT request to update the selected movie’s rating.
- `useRouter`: Manages navigation back to the previous route.

# API

## Initialization
On initialization within the `/server` directory, the Express server kicks off. Type-safe `tsoa` routes are constructed, generating the `/build` directory and facilitating the creation of Swagger UI documentation based on these routes.

## Database
The `/clients/database.ts` initializes RxDB, creating a NoSQL in-memory database with a type-safe schema derived from the `data.ts` mock data.

## Controllers
- `MoviesController.ts`: Manages GET requests for movie data retrieval.
- `RatingsController.ts`: Handles PUT requests to upsert rating data for specified movies.

## Services & Repositories
Adhering to the controller-service-repository model, the API ensures enhanced modularity.

### Movies Service (`movies.service.ts`)
- `getMovies()`: Retrieves and sorts movies by title (if a search parameter is provided) and `averageRating`. It returns a sliced array containing the specified limit to the frontend.
- `getMovie()`: Retrieves a movie by its ID.

### Repositories
Functions within the `repositories` directory directly query the database:
- `findMovies()`: Retrieves movies based on the selector object provided by the `getMovies()` service method.
- `findOneMovie()`: Retrieves a single movie using the selector object from the `getMovie()` service method.
- `findByMovieId()`: Finds a movie by its ID, utilized within `ratings.repository.ts` in the `upsertMovie()` method.
- `upsertMovie()`: Finds and updates a movie by its ID. It creates a copy of the selected movie document, updates it, and upserts the new `updateMovie` object into the database.

