import type { Route } from './+types/yearly-leaderboards-page';

export function loader({ request, params }: Route.LoaderArgs) {
  return { year: params.year };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  return [
    {
      title: `Yearly Leaderboard ${loaderData?.year ?? ''} | wemake`,
    },
    {
      name: 'description',
      content: `Product yearly leaderboard for ${loaderData?.year ?? ''}`,
    },
  ];
};

export default function YearlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="px-20 py-10">
      <h1 className="text-4xl font-bold tracking-tight">
        Yearly Leaderboard {loaderData?.year}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Top products for the year {loaderData?.year}.
      </p>
    </div>
  );
}
