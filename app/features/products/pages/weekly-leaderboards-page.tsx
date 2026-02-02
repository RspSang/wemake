import type { Route } from './+types/weekly-leaderboards-page';

export function loader({ request, params }: Route.LoaderArgs) {
  return { year: params.year, week: params.week };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  return [
    {
      title: `Weekly Leaderboard ${loaderData?.year} W${loaderData?.week} | wemake`,
    },
    {
      name: 'description',
      content: `Product weekly leaderboard for ${loaderData?.year} week ${loaderData?.week}`,
    },
  ];
};

export default function WeeklyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">
        Weekly Leaderboard {loaderData?.year} W{loaderData?.week}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Top products for week {loaderData?.week} of {loaderData?.year}.
      </p>
    </div>
  );
}
