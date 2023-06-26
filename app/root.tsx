import type { LinksFunction, LoaderArgs, LoaderFunction } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async ({context}: LoaderArgs) => {
  const supabase = createClient(context.SUPABASE_URL!, context.SUPABASE_ANON_KEY!);
  const {data} = await supabase.from("courses").select()
  return data;
};

export default function App() {
  const res = useLoaderData()
  console.log(JSON.stringify(res))
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <code>{JSON.stringify(res)}</code>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
