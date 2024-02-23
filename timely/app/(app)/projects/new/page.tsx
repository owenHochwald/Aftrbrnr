import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function CreateProjectPage() {

    const user = await getUserSession()

    const clients = (await prisma.client.findMany({
        where: {
            tenantId: user.tenant.id
        }
    })).map((client) => ({
        label: client.name,
        value: client.id
    }))


    async function createProject(data: FormData) {
        'use server'
        const user = await getUserSession()

        const client = data.get('client') as string

        const project = await prisma.project.create({
            data: {
                tenantId: user.tenant.id,
                name: data.get('name') as string,
                color: data.get('color') as string,
                clientId: client ? client: undefined
            }
        })



        revalidatePath('/projects')
        redirect(`/projects/${project.id}`)
    }


    return (
        <form action={createProject} className='max-w-3xl mx-auto p-4 gap-4 flex flex-col'>
            <div className="flex items-center space-x-2">
                <Label htmlFor="email">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Project Name" required />
            </div>
            <div className="flex items-center space-x-2">
                <Label htmlFor="email">Color</Label>
                <Input type="color" name='color' id="name" placeholder="Project Color" />
            </div>
            <div>
                <Label htmlFor="email">Client</Label>
                <Select name='client'>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assign a client" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Clients</SelectLabel>
                            <SelectItem value="name">None</SelectItem>
                            {
                                clients.map((client) => (
                                    <SelectItem value={client.value} key={client.value}>
                                        {client.label}
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>


                {/* <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-[200px] justify-between",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value
                                    ? languages.find(
                                        (language) => language.value === field.value
                                    )?.label
                                    : "Select language"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search Client..." />
                            <CommandEmpty>No client found.</CommandEmpty>
                            <CommandGroup>
                                {clients.map((client) => (
                                    <CommandItem
                                        value={client.label}
                                        key={client.value}
                                        onSelect={() => {
                                            form.setValue("client", client.value)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                language.value === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {language.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>*/}
            </div>
            <div>
                <Button type='submit'>Create</Button>
            </div>
        </form>
    )
}
