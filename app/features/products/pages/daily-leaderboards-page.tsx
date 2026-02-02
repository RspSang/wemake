import type { Route } from './+types/daily-leaderboards-page';

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    day: params.day,
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  return [
    {
      title: `Daily Leaderboard ${loaderData?.year}/${loaderData?.month}/${loaderData?.day} | wemake`,
    },
    {
      name: 'description',
      content: `Product daily leaderboard for ${loaderData?.year}/${loaderData?.month}/${loaderData?.day}`,
    },
  ];
};

export default function DailyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">
        Daily Leaderboard {loaderData?.year}/{loaderData?.month}/
        {loaderData?.day}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Top products for {loaderData?.year}/{loaderData?.month}/
        {loaderData?.day}.
      </p>
    </div>
  );
}
