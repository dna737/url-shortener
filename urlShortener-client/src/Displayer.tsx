import { CopyButton } from "@/components/ui/shadcn-io/copy-button";

export function Displayer(props: { originalUrl: string; shortenedUrl: string }) {
  const { originalUrl, shortenedUrl } = props;

  return (
    <div>
      {/* <h1>Original URL: {originalUrl}</h1> */}
      <h1>Shortened URL: {shortenedUrl}</h1>
      <CopyButton content={shortenedUrl} variant="outline" />
    </div>
  )
}

export default Displayer;
