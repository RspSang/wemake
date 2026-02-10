import { DateTime } from 'luxon';
import type { Route } from './+types/monthly-leaderboards-page';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { ProductCard } from '../components/product-card';
import {
  monthlyParamsSchema,
  validateNotFutureDate,
  LEADERBOARD_ERRORS,
} from '../schemas/leaderboard-params';
import { Hero } from '~/common/components/hero';
import { Button } from '~/common/components/ui/button';
import ProductPagination from '~/common/components/product-pagination';

export function loader({ params }: Route.LoaderArgs) {
  const { success, data: parsedData } = monthlyParamsSchema.safeParse(params);
  if (!success) {
    throw data(LEADERBOARD_ERRORS.INVALID_PARAMS, { status: 400 });
  }

  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month,
  });

  if (!date.isValid) {
    throw data(LEADERBOARD_ERRORS.INVALID_DATE, { status: 400 });
  }

  if (!validateNotFutureDate(date.endOf('month'))) {
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
      title: `Monthly Leaderboard ${loaderData?.year}/${loaderData?.month} | wemake`,
    },
    {
      name: 'description',
      content: `Product monthly leaderboard for ${loaderData?.year}/${loaderData?.month}`,
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

export default function MonthlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });
  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isCurrentMonth = urlDate.hasSame(DateTime.now(), 'month');

  return (
    <div className="space-y-10">
      <Hero
        title={`The best products of ${urlDate.toLocaleString({
          month: 'long',
          year: 'numeric',
        })}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
          >
            &larr;{' '}
            {previousMonth.toLocaleString({ month: 'short', year: 'numeric' })}
          </Link>
        </Button>
        {!isCurrentMonth && (
          <Button variant="secondary" asChild>
            <Link
              to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
            >
              {nextMonth.toLocaleString({ month: 'short', year: 'numeric' })}{' '}
              &rarr;
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
