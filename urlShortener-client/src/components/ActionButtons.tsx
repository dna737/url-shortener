import { CopyButton } from "./ui/shadcn-io/copy-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { IconLinkPlus } from '@tabler/icons-react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function ActionButtons(props: { shortenedUrl: string, handleReset: () => void }) {
  const { shortenedUrl, handleReset } = props;
  // const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={handleReset}>
        <IconLinkPlus /> Shorten another Link
      </Button>

      <Tooltip>
        <TooltipTrigger asChild>
          <CopyButton content={shortenedUrl} variant="outline" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
