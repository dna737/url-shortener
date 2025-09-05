import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { FieldErrors } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { shortenUrl } from "@/services"
import { toast, Toaster } from "sonner"
import { isDomainValid } from "@/utils"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ActionButtons } from "./components"

const FormSchema = z.object({
  original_url: z.string({ message: "Invalid URL provided" })
    .refine((url) => {
      return isDomainValid(url);
    }, {
      message: "Invalid URL provided",
    }),
  shortened_url: z.string().optional()
});

export function InputForm( props : { handleUrl: (originalUrl: string, shortenedUrl: string) => void; shortenedUrl: string | undefined }) {
  const { handleUrl, shortenedUrl } = props;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      original_url: "",
      shortened_url: "",
    },
    disabled: !!shortenedUrl,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let finalUrl = data.original_url;

    if (!finalUrl) return;

    // Add https:// if it doesn't exist
    if (finalUrl && !finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = `https://${finalUrl}`;
    }
    toast.success("URL submitted successfully!", {
      description: "Processing your URL...",
      style: {
        backgroundColor: "#10b981",
        color: "white",
        borderColor: "#059669"
      },
      duration: 2000,
    });
    const abridgedUrl = await shortenUrl({ original_url: finalUrl });
    if(abridgedUrl.success) {
      handleUrl(finalUrl, abridgedUrl.shortenedUrl);
    } else {
      toast.error("Failed to shorten URL", {
        description: abridgedUrl.message,
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          borderColor: "#dc2626"
        }
      });
    }
  }

  function onError(errors: FieldErrors<z.infer<typeof FormSchema>>) {
    // Handle validation errors
    if (errors.original_url) {
      toast.error("URL is invalid", {
        description: errors.original_url.message,
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          borderColor: "#dc2626"
        }
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="w-full space-y-6" autoComplete="off">
        <FormField
          control={form.control}
          name="original_url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Original URL</FormLabel>
              <FormControl>
                <div>
                  <Toaster position="top-right"/>
                  <Input 
                    placeholder="Enter long URL here..." 
                    autoComplete="url"
                    {...field} 
                  />
                </div>
              </FormControl>
              {!shortenedUrl && <FormDescription>
                This is the URL you want to shorten.
              </FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />

        {shortenedUrl && <FormField
          control={form.control}
          name="shortened_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shortened URL</FormLabel>
              <FormControl>
                <Input {...field} value={shortenedUrl} />
              </FormControl>
            </FormItem>
          )}
        />}
        {!shortenedUrl && <Button type="submit">Submit</Button>}
      </form>
    </Form>
  )
}

export default function App() {
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleUrl = (originalUrl: string, shortenedUrl: string) => {
    console.log("URL: ", originalUrl);
    setShortenedUrl(shortenedUrl);
  }

  const handleReset = () => {
    setShortenedUrl("");
  }

  return (
    <div className="p-5">
      <Card className="w-full max-w-sm">
        <CardContent>
          <InputForm handleUrl={handleUrl} shortenedUrl={shortenedUrl} />
        </CardContent>
        {shortenedUrl && (
          <CardFooter className="flex justify-end">
            <ActionButtons shortenedUrl={shortenedUrl} handleReset={handleReset} />
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
