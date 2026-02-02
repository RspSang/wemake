import type { Route } from './+types/monthly-leaderboards-page';

export function loader({ request, params }: Route.LoaderArgs) {
  return { year: params.year, month: params.month };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  return [
    {
      title: `Monthly Leaderboard ${loaderData?.year}/${loaderData?.month} | wemake`,
    },
    {
      name: 'description',
      content: `Product monthly leaderboard for ${loaderData?.year}/${loaderData?.month}`,
    },
  ];
};

export default function MonthlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">
        Monthly Leaderboard {loaderData?.year}/{loaderData?.month}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Top products for {loaderData?.year}/{loaderData?.month}.
      </p>
    </div>
  );
}
