import React, { useContext } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


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
                clientId: client ? client : undefined
            }
        })



        revalidatePath('/projects')
        redirect(`/projects/${project.id}`)
    }


    return (
        <form action={createProject} className='max-w-3xl mx-auto p-4 gap-4 flex flex-col'>
            <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                    <CardTitle>Create a Project</CardTitle>
                    <CardDescription>
                    A project represents work you are doing for a client and helps keep you organized!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Name</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Submit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">
                                    <Input type="text" name="name" id="name" placeholder="Project Name" required />

                                </TableCell>
                                <TableCell>
                                    <input
                                        type="color"
                                        name="color"
                                        id="name"
                                        placeholder="Project Color"
                                        list="colors"
                                        style={{
                                            width: '5.5rem',
                                            height: '3rem',
                                            border: 'none',
                                            cursor: 'pointer',
                                            appearance: 'none',
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'none',
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                    <datalist id="colors">
                                        {['tomato', 'teal', 'navy', 'yellow', 'darkorchid', 'orange'].map((color) => (
                                            <option key={color} value={color}>
                                                {color}
                                            </option>
                                        ))}
                                    </datalist>
                                </TableCell>
                                <TableCell className="flex justify-center w-full text-slate-500 font-semibold">
                                    <div>
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
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button type="submit">Submit</Button>

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            </form>
    )
}
