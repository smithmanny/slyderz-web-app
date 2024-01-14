"import client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'

interface DefaultValuesType {
  [index: string]: string
}
export function useSlyderzForm(formSchema: any, defaultValues: DefaultValuesType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return form
}