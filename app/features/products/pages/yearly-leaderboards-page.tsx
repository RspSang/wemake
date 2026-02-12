import { DateTime } from 'luxon';
import { data, isRouteErrorResponse, Link } from 'react-router';
import type { Route } from './+types/yearly-leaderboards-page';
import { ProductCard } from '../components/product-card';
import {
  yearlyParamsSchema,
  validateNotFutureDate,
  LEADERBOARD_ERRORS,
} from '../schemas/leaderboard-params';
import { Hero } from '~/common/components/hero';
import { Button } from '~/common/components/ui/button';
import ProductPagination from '~/common/components/product-pagination';

export function loader({ params }: Route.LoaderArgs) {
  const { success, data: parsedData } = yearlyParamsSchema.safeParse(params);
  if (!success) {
    throw data(LEADERBOARD_ERRORS.INVALID_PARAMS, { status: 400 });
  }

  const date = DateTime.fromObject({
    year: parsedData.year,
  });

  if (!date.isValid) {
    throw data(LEADERBOARD_ERRORS.INVALID_DATE, { status: 400 });
  }

  if (!validateNotFutureDate(date.startOf('year'))) {
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
  })
    .setZone('Asia/Seoul')
    .setLocale('ko-KR');
  return [
    {
      title: `The best products of ${date.toLocaleString({ year: 'numeric' })} | wemake`,
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

export default function YearlyLeaderboardsPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isCurrentYear = urlDate.hasSame(DateTime.now(), 'year');

  return (
    <div className="space-y-10">
      <Hero
        title={`The best products of ${urlDate.toLocaleString({
          year: 'numeric',
        })}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toLocaleString({ year: 'numeric' })}
          </Link>
        </Button>
        {!isCurrentYear && (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({ year: 'numeric' })} &rarr;
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
