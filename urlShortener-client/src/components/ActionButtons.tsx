import { CopyButton } from "./ui/shadcn-io/copy-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { IconLinkPlus } from '@tabler/icons-react';

export default function ActionButtons(props: { shortenedUrl: string }) {
  const { shortenedUrl } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CopyButton content={shortenedUrl} variant="outline" />
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy to clipboard</p>
      </TooltipContent>
      <TooltipContent>
        <p>Copy to clipboard</p>
      </TooltipContent>
    </Tooltip>
  )
}
