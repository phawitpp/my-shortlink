import { redirect } from "next/navigation";
import Redirector from "../Components/redirector";
type PageProps = {
  params: {
    slug: string;
  };
};

async function getData({ params }: PageProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined.");
  }
  const res = await fetch(apiUrl + "/api/link/" + params.slug);
  const data = await res.json();
  if (data.status == "error") {
    return null;
  }
  return data.data.url;
}

const Page = async ({ params }: PageProps) => {
  const link = await getData({ params });
  return <>{link ? <Redirector params={{ link }} /> : <div>Not found</div>}</>;
};

export default Page;
