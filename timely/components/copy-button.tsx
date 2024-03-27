'use client'

import { useState } from 'react';
import copy from 'clipboard-copy';
import { Check, Copy } from 'lucide-react';
import { Toaster, toast } from 'sonner'


export const CopyButton = ({ text }: { text: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await copy(text);
            setIsCopied(true);
        } catch (error) {
            console.error('Failed to copy text to clipboard', error);
        }
    };

    return (
        <div className="">
            <Toaster />
            <button className="px-4 py-1"
                onClick={() => { handleCopy(); toast.success('Copied to clipboard!') }}>
                {/* <Copy /> */}
                {isCopied ?
                    <Check size={30} strokeWidth={1.5} className='rounded border-1 hover:border hover:border-slate-800' /> :
                    <Copy size={30} strokeWidth={1.5} className='rounded border-1 hover:border hover:border-slate-800' />
                }
            </button>
        </div>
    );
}