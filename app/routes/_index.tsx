import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const secretKey = (context.env as { SECRET_KEY: string }).SECRET_KEY;
  const myKv = (context.env as { MY_KV: KVNamespace }).MY_KV;

  return json({ secretKey, kvEntries: (await myKv.list()).keys.length });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <p>Secret key = {data.secretKey}</p>
      <p>Num of KV entries = {data.kvEntries}</p>
    </div>
  );
}
