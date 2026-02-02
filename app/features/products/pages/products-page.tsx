import type { Route } from './+types/products-page';

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Products | wemake' },
    { name: 'description', content: 'Explore products on wemake' },
  ];
};

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Products</h1>
      <p className="mt-2 text-muted-foreground">
        Explore products from our community.
      </p>
    </div>
  );
}
