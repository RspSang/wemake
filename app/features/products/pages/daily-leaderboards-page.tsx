import { DateTime } from 'luxon';
import type { Route } from './+types/daily-leaderboards-page';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { ProductCard } from '../components/product-card';
import {
  dailyParamsSchema,
  validateNotFutureDate,
  LEADERBOARD_ERRORS,
} from '../schemas/leaderboard-params';
import { Hero } from '~/common/components/hero';
import { Button } from '~/common/components/ui/button';
import ProductPagination from '~/common/components/product-pagination';

export function loader({ params }: Route.LoaderArgs) {
  const { success, data: parsedData } = dailyParamsSchema.safeParse(params);
  if (!success) {
    throw data(LEADERBOARD_ERRORS.INVALID_PARAMS, { status: 400 });
  }

  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month,
    day: parsedData.day,
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

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
    day: Number(params.day),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko-KR');
  return [
    {
      title: `The best products of ${date.toLocaleString(DateTime.DATE_MED)} | wemake`,
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
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
  });
  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf('day'));
  return (
    <div className="space-y-10">
      <Hero
        title={`The best products of ${urlDate.toLocaleString(
          DateTime.DATE_MED
        )}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
          >
            &larr; {previousDay.toLocaleString(DateTime.DATE_MED)}
          </Link>
        </Button>
        {!isToday && (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
            >
              {nextDay.toLocaleString(DateTime.DATE_MED)} &rarr;
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
