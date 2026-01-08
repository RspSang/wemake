import type { Route } from "./+types/home-page";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | WeMake" },
    { name: "description", content: "WeMake에 오신 것을 환영합니다" },
  ];
};

export const loader = ({ request }: Route.LoaderArgs) => {
  return {
    message: "WeMake에 오신 것을 환영합니다!",
  };
};

export const action = ({ request }: Route.ActionArgs) => {
  return {
    success: true,
  };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground mb-6">
          {message}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          함께 만들어가는 창작의 공간, WeMake입니다.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">시작하기</Button>
          <Button variant="outline" size="lg">
            더 알아보기
          </Button>
        </div>
      </div>
    </main>
  );
}

