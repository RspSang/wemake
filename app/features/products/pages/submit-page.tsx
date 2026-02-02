import type { Route } from './+types/submit-page';

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Product | wemake' },
    { name: 'description', content: 'Submit your product to wemake' },
  ];
};

export default function SubmitPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Submit Product</h1>
      <p className="mt-2 text-muted-foreground">
        Share your product with the community.
      </p>
    </div>
  );
}
