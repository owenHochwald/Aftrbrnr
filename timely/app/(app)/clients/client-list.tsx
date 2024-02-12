import { Client } from "@prisma/client"


type ClientListProps = {
    clients: Client[]
}
export const ClientList = ({ clients }: ClientListProps) => {
    return (
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>{client.name}</li>
                ))}
            </ul>
    )
}