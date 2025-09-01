import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { FieldErrors } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { shortenUrl } from "@/services"
import { getPublicSuffix } from 'tldts';
import { toast, Toaster } from "sonner"

const FormSchema = z.object({
  original_url: z.string()
  .refine((url) => {
    // Check if URL has a protocol
    const hasProtocol = url.startsWith("http://") || url.startsWith("https://");
    
    // If no protocol, add https:// to check if it's a valid domain
    const urlToCheck = hasProtocol ? url : `https://${url}`;
    const hasValidSuffix = getPublicSuffix(urlToCheck) !== null;
    
    // URL is valid if it has a protocol and valid suffix, OR if it's a valid domain without protocol
    const isValid = (hasProtocol && hasValidSuffix) || (!hasProtocol && hasValidSuffix);
    return isValid;
  }, {
    error: "Invalid URL provided",
  }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      original_url: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("URL submitted successfully!", {
      description: "Processing your URL...",
      style: {
        backgroundColor: "#10b981",
        color: "white",
        borderColor: "#059669"
      },
      duration: 2000,
    });
    shortenUrl(data);
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
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="w-2/3 space-y-6" autoComplete="off">
        <FormField
          control={form.control}
          name="original_url"
          render={({ field }) => (
            <FormItem>
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
              <FormDescription>
                This is the URL you want to shorten.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default function App() {
  return (
    <div className="p-5">
      <InputForm />
    </div>
  )
}
