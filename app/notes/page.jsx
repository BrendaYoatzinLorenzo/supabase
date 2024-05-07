'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
    const [notes, setNotes] = useState(null)
    const supabase = createClient()
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('notes').select()
            setNotes(data)
        }
        getData()
    }, [])

    function handleSumit(e){
        e.preventDefault();
        
        const getData = async () => {
            const {data} = await supabase
            .from("notes")
            .select()
            .like('title', `%${search}%`);

            setNotes(data);
        }
        getData()
    }

    return <>
        <div className='flex  mt-5 mb-5 '>
            <form  className='text-center mt-3' onSubmit={handleSumit}>
                <input placeholder='insertar busqueda' className='p-2 text-black' onChange={(e) => {
                setSearch(e.target.value);}}/> <button type='submit' className='bg-slate-700 p-2 hover:bg-slate-900'>Submit</button>
            </form>
        </div>
        <ol >
            {notes?.map((item) => (
                <li className=" text-black bg-neutral-300 p-6   rounded-md mb-3 hover:bg-slate-500 " key={item.id}>
                    {item.title}
                </li>
            ))
            }
        </ol>
    </>
}