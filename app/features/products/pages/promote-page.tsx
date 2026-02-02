import type { Route } from './+types/promote-page';

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Promote Product | wemake' },
    { name: 'description', content: 'Promote your product on wemake' },
  ];
};

export default function PromotePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Promote Product</h1>
      <p className="mt-2 text-muted-foreground">
        Boost visibility for your product.
      </p>
    </div>
  );
}
