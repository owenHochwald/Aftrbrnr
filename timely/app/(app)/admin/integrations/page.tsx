import { getUserSession } from "@/lib/auth"


export default async function IntegrationsPage() {
    const user = await getUserSession()

    return (
        <div>
            <h1>Integrations</h1>
            <div>Context</div>
        </div>
    )
}