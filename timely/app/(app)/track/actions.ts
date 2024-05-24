'use server'

import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateActivity(data: FormData) {
    await prisma.activity.update({
        where: {
            id: data.get('id') as string
        },
        data: {
            name: data.get('name') as string,
            startAt: data.get('startAt') as string,
            duration: parseInt(data.get('duration') as string, 10)
        }
    })

    revalidatePath('/track')
}

export async function deleteActivity(id: string) {
    await prisma.activity.delete({
        where: {
            id
        }
    })
    revalidatePath('/track')
}

export async function upsertActivity(data: FormData) {
    'use server'
    const user = await getUserSession()
    const client = data.get('client') as string
    const project = data.get('project') as string
    const startAt = new Date();

    await prisma.activity.upsert({
        where: {
            id: data.get('id') as string
        },
        create: {
            user: { connect: { id: user.id } },
            tenant: { connect: { id: user.tenant.id } },
            name: data.get('name') as string,
            startAt: startAt,
            startAtArray: [new Date()],
            endAtArray: [],
            client: !!client ? { connect: { id: client } } : undefined,
            project: !!project ? { connect: { id: project } } : undefined
        },
        update: {
            name: data.get('name') as string,
            client: !!client ? { connect: { id: client } } : undefined,
            project: !!project ? { connect: { id: project } } : undefined
        }
    })
    revalidatePath('/track')
}


export async function stopActivity(data: FormData) {
    'use server'

    const client = data.get('client') as string
    const project = data.get('project') as string
    const activity = await prisma.activity.findUnique({
        where: {
            id: data.get('id') as string
        }
    });

    if (activity && activity.startAtArray.length > activity.endAtArray.length) {
        await prisma.activity.update({
            where: {
                id: data.get('id') as string
            },
            data: {
                endAt: new Date(),
                name: data.get('name') as string,
                endAtArray: {
                    push: new Date()
                },
                client: !!client ? { connect: { id: client } } : undefined,
                project: !!project ? { connect: { id: project } } : undefined
            }
        });
    } else {
        await prisma.activity.update({
            where: {
                id: data.get('id') as string
            },
            data: {
                name: data.get('name') as string,
                endAtArray: {
                    push: new Date()
                },
                client: !!client ? { connect: { id: client } } : undefined,
                project: !!project ? { connect: { id: project } } : undefined
            }
        });
    }
    revalidatePath('/track');
}

export async function pauseActivity(activity: any) {
    'use server'

    await prisma.activity.update({
        where: {
            id: activity.id as string
        },
        data: {
            endAt: new Date(),
            name: activity.name as string,
            endAtArray: {
                push: new Date()
            },
        }
    })
}


export async function resumeActivity(activity: any) {
    'use server'

    await prisma.activity.update({
        where: {
            id: activity.id as string
        },
        data: {
            startAt: new Date(),
            startAtArray: {
                push: new Date()
            },
            name: activity.name as string,
        }
    })
}
