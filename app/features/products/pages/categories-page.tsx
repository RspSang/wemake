import type { Route } from './+types/categories-page';

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Categories | wemake' },
    { name: 'description', content: 'Browse products by category' },
  ];
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Categories</h1>
      <p className="mt-2 text-muted-foreground">
        Browse products by category.
      </p>
    </div>
  );
}
