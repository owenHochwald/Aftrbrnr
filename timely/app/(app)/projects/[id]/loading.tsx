import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        // put shadui skeleton ui here later
        <div className="flex justify-center w-full loading">
            <Loader2 size={32} className='animate-spin'/>
        </div>
        )
}