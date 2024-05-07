"use server"
import { createClient } from '@/utils/supabase/client'



const searchProduct = async (search: any) => {
    const supabase = createClient()

    const { data, error } = await supabase.from('muebles').select("*").like("name", `%${search.toLowerCase()}%`);

    return data;

}


const getElementById = async (id: any) => {
    const supabase = createClient()

    const { data, error } = await supabase.from("muebles").select("*").eq("id", `${id}`)
    return data
}

const updateElementById = async (id: any, updatedData: any) => {
    const supabase = createClient()
    const {name, price, description,image, category } = updatedData

    const { data, error } = await supabase
        .from('muebles')
        .update({
            name: name,
            price: price,
            category: category,
            description: description,
            image: image,
        })
        .eq('id', id);


    return { status: 200, product: data }
}


export { searchProduct, getElementById, updateElementById };