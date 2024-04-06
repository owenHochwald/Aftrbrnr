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
            endAt: data.get('endAt') as string
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

    await prisma.activity.upsert({
        where: {
            id: data.get('id') as string
        },
        create: {
            user: { connect: { id: user.id } },
            tenant: { connect: { id: user.tenant.id } },
            name: data.get('name') as string,
            startAt: new Date(),
            client: !!client ? {connect: { id: client }} : undefined,
            project: !!project ? {connect: { id: project }} : undefined
        },
        update: {
            name: data.get('name') as string,
            client: !!client ? {connect: { id: client }} : undefined,
            project: !!project ? {connect: { id: project }} : undefined
        }
    })
    revalidatePath('/track')
}

export async function stopActivity(data: FormData) {
    'use server'
    const client = data.get('client') as string
    const project = data.get('project') as string
    
    await prisma.activity.update({
        where: {
            id: data.get('id') as string
        },
        data: {
            endAt: new Date(),
            name: data.get('name') as string,
            client: !!client ? {connect: { id: client }} : undefined,
            project: !!project ? {connect: { id: project }} : undefined
        }
    })
    revalidatePath('/track')
}
export async function pauseActivity(data: FormData) {
    'use server'
    const client = data.get('client') as string
    const project = data.get('project') as string
    
    await prisma.activity.update({
        where: {
            id: data.get('id') as string
        },
        data: {
            endAt: new Date(),
            name: data.get('name') as string,
            client: !!client ? {connect: { id: client }} : undefined,
            project: !!project ? {connect: { id: project }} : undefined
        }
    })
    revalidatePath('/track')
}



// export async function resumeActivity(id: string) {
//     console.log("is this working?")
//     const activity = await prisma.activity.findUnique({
//         where: {
//             id: id
//         }
//     });

//     if(activity) {
//         console.log('Activity ID:', activity.id);
//         console.log('Activity Name:', activity.name);
//     } else {
//         console.log('Activity not found');
//     }
// }


// export async function pauseActivity(id: string) {
//     await prisma.activity.update({
//         where: {
//             id
//         },
//         data: {
//             isPaused: true // Assuming 'isPaused' is a field in your activity model
//         }
//     });

//     revalidatePath('/track');
// }

// // Server action to resume an activity
// export async function resumeActivity(id: string) {
//     await prisma.activity.update({
//         where: {
//             id
//         },
//         data: {
//             isPaused: false // Assuming 'isPaused' is a field in your activity model
//         }
//     });

//     revalidatePath('/track');
// }
