import { CopyButton } from "@/components/ui/shadcn-io/copy-button";

export function Displayer(props: { shortenedUrl: string }) {
  const { shortenedUrl } = props;

  return (
    <div>
      <h1>Shortened URL: {shortenedUrl}</h1>
      <CopyButton content={shortenedUrl} variant="outline" />
    </div>
  )
}

export default Displayer;
