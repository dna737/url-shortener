import { CopyButton } from "./ui/shadcn-io/copy-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { IconLinkPlus, IconQrcode } from '@tabler/icons-react';
import { Button } from "./ui/button";
import { QRCodeDisplayer } from ".";

export default function ActionButtons(props: { shortenedUrl: string, handleReset: () => void }) {
  const { shortenedUrl, handleReset } = props;

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={handleReset}>
        <IconLinkPlus /> Shorten another link
      </Button>

      <Tooltip>
        <TooltipTrigger asChild>
          <CopyButton content={shortenedUrl} variant="outline" />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>

      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">
                <IconQrcode />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {"Show QR Code"}
          </TooltipContent>
        </Tooltip>
        <PopoverContent side="bottom" className="w-auto p-4">
          <div className="flex flex-col items-center gap-2">
            <h4 className="font-medium text-sm">QR Code</h4>
            <QRCodeDisplayer shortenedUrl={shortenedUrl} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
