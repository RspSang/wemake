import { DateTime } from 'luxon';
import type { Route } from './+types/daily-leaderboards-page';
import { data, isRouteErrorResponse } from 'react-router';
import {
  dailyParamsSchema,
  validateNotFutureDate,
  LEADERBOARD_ERRORS,
} from '../schemas/leaderboard-params';

export function loader({ params }: Route.LoaderArgs) {
  const { success, data: parsedData } = dailyParamsSchema.safeParse(params);
  if (!success) {
    throw data(LEADERBOARD_ERRORS.INVALID_PARAMS, { status: 400 });
  }

  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month,
    day: parsedData.day,
  }).setZone('Asia/Seoul');

  if (!date.isValid) {
    throw data(LEADERBOARD_ERRORS.INVALID_DATE, { status: 400 });
  }

  if (!validateNotFutureDate(date)) {
    throw data(LEADERBOARD_ERRORS.FUTURE_DATE, { status: 400 });
  }

  return {
    ...parsedData,
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div className="px-20 py-10">
        <h1 className="text-4xl font-bold tracking-tight">Error</h1>
        <p className="mt-2 text-muted-foreground">{error.data.message}</p>
      </div>
    );
  }
  if (error instanceof Error) {
    return (
      <div className="px-20 py-10">
        <h1 className="text-4xl font-bold tracking-tight">Error</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    );
  }
  return <div>unexpected error</div>;
}

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
