import {QRCodeSVG} from "qrcode.react";
import { useRef } from "react";

export default function QRCodeDisplayer(props: { shortenedUrl: string }) {
  const { shortenedUrl } = props;
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div>
      <QRCodeSVG value={shortenedUrl} ref={svgRef} />
    </div>
  )
}
