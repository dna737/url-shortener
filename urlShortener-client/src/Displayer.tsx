export function Displayer(props: { url: string }) {
  const { url } = props;
  console.log("URL: ", url);

  return (
    <div>
      <h1>Abridged URL: {url}</h1>
    </div>
  )
}

export default Displayer;
