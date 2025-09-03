export function Displayer(props: { originalUrl: string; shortenedUrl: string }) {
  const { originalUrl, shortenedUrl } = props;
  console.log("URL: ", originalUrl);

  return (
    <div>
      <h1>Original URL: {originalUrl}</h1>
      <h1>Abridged URL: {shortenedUrl}</h1>
    </div>
  )
}

export default Displayer;
