import type { Route } from './+types/search-page';

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Search Products | wemake' },
    { name: 'description', content: 'Search for products on wemake' },
  ];
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Search Products</h1>
      <p className="mt-2 text-muted-foreground">
        Find products by keyword or filter.
      </p>
    </div>
  );
}
