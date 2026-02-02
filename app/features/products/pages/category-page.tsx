import type { Route } from './+types/category-page';

export function loader({ request, params }: Route.LoaderArgs) {
  return { category: params.category };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const category = loaderData?.category ?? '';
  return [
    { title: `${category} | wemake` },
    {
      name: 'description',
      content: `Products in the ${category} category`,
    },
  ];
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight capitalize">
        {loaderData?.category}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Products in the {loaderData?.category} category.
      </p>
    </div>
  );
}
