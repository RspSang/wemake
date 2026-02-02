import type { Route } from './+types/leaderboards-page';

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Leaderboards | wemake' },
    { name: 'description', content: 'Product leaderboards on wemake' },
  ];
};

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Leaderboards</h1>
      <p className="mt-2 text-muted-foreground">
        Browse product rankings by time period.
      </p>
    </div>
  );
}
