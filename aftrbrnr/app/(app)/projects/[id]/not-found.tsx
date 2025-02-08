import Link from 'next/link'
 
export default function ProjectNotFound() {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2'>Not Found</h2>
      <p className='text-sm'>Could not find that project.</p>
      <Link href="/projects">Return to Projects</Link>
    </div>
  )
}