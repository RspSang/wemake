import { DateTime } from 'luxon';
import type { Route } from './+types/weekly-leaderboards-page';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { ProductCard } from '../components/product-card';
import {
  weeklyParamsSchema,
  validateNotFutureDate,
  LEADERBOARD_ERRORS,
} from '../schemas/leaderboard-params';
import { Hero } from '~/common/components/hero';
import { Button } from '~/common/components/ui/button';
import ProductPagination from '~/common/components/product-pagination';

export function loader({ params }: Route.LoaderArgs) {
  const { success, data: parsedData } = weeklyParamsSchema.safeParse(params);
  if (!success) {
    throw data(LEADERBOARD_ERRORS.INVALID_PARAMS, { status: 400 });
  }

  const date = DateTime.fromObject({
    weekYear: parsedData.year,
    weekNumber: parsedData.week,
  });

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
      title: `Weekly Leaderboard ${loaderData?.year} W${loaderData?.week} | wemake`,
    },
    {
      name: 'description',
      content: `Product weekly leaderboard for ${loaderData?.year} week ${loaderData?.week}`,
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
  return <div>Unexpected error</div>;
}

export default function WeeklyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    weekYear: loaderData.year,
    weekNumber: loaderData.week,
  });
  const previousWeek = urlDate.minus({ weeks: 1 });
  const nextWeek = urlDate.plus({ weeks: 1 });
  const isCurrentWeek = urlDate.hasSame(DateTime.now(), 'week');

  return (
    <div className="space-y-10">
      <Hero
        title={`The best products of ${urlDate.startOf('week').toLocaleString(DateTime.DATE_SHORT)} - ${urlDate.endOf('week').toLocaleString(DateTime.DATE_SHORT)}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/weekly/${previousWeek.weekYear}/${previousWeek.weekNumber}`}
          >
            &larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isCurrentWeek && (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/weekly/${nextWeek.weekYear}/${nextWeek.weekNumber}`}
            >
              {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link>
          </Button>
        )}
      </div>
      <div className="space-y-5 w-full max-w-3xl mx-auto">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
