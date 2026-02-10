import { DateTime } from 'luxon';
import type { Route } from './+types/yearly-leaderboards-page';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { ProductCard } from '../components/product-card';
import {
  yearlyParamsSchema,
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

  const today = DateTime.now();
  if (parsedData.year > today.year) {
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
      title: `Yearly Leaderboard ${loaderData?.year} | wemake`,
    },
    {
      name: 'description',
      content: `Product yearly leaderboard for ${loaderData?.year}`,
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
  const currentYear = DateTime.now().year;
  const previousYear = loaderData.year - 1;
  const nextYear = loaderData.year + 1;
  const isCurrentYear = loaderData.year === currentYear;

  return (
    <div className="space-y-10">
      <Hero title={`The best products of ${loaderData.year}`} />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear}`}>
            &larr; {previousYear}
          </Link>
        </Button>
        {!isCurrentYear && (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear}`}>
              {nextYear} &rarr;
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
