import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { shortenUrl } from "@/services"
import { getPublicSuffix } from 'tldts';

const FormSchema = z.object({
  original_url: z.string()
  .refine((url) => {
    const hasProtocol = url.startsWith("http://") || url.startsWith("https://");
    const hasValidSuffix = getPublicSuffix(url) !== null;

    return hasProtocol && hasValidSuffix;
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
    shortenUrl(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6" autoComplete="off">
        <FormField
          control={form.control}
          name="original_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter long URL here..." 
                  autoComplete="url"
                  {...field} 
                />
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
