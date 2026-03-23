import React from 'react'
import EditContactDetails from './components/EditContactDetails'

//type Props = {}

function page() {
    return (
        <div className='h-full flex flex-col'>
            <header className="hidden md:flex min-h-16 h-[7vh] py-8 border bg-white border-[#F0F2F5] justify-start px-6 items-center text-grey-800 font-bold text-2xl">
                Contact Details
            </header>
            <div className="flex-1 overflow-y-auto py-8 px-4 sm:px-6 flex flex-col gap-y-12">

                <EditContactDetails />
            </div>
        </div>
    )
}

export default page