'user client'

import { Session } from 'next-auth'
import { Avatar as RootAvatar, AvatarImage, AvatarFallback } from './ui/avatar'

export const Avatar = ({ user }: { user: Session['user'] }) => (
    <RootAvatar>
        {user.image && <AvatarImage src={user.image} referrerPolicy='no-referrer' />}
        {!user.image && <AvatarFallback>{user.name}</AvatarFallback>}
    </RootAvatar>
)