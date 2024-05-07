"use server"
import { createClient } from '@/utils/supabase/client'
import { revalidatePath } from 'next/cache'

const supabase = createClient()

const sendData = async (formData: FormData) => {
    const { name, price, description, category, image, gallery } = Object.fromEntries(formData.entries());

    if (name === null || price === null || description === null || category === null || image === null || gallery == null) {
        return {
            status: false,
            message: "Se requieren algunos valores",
            errors: null,
            params: { name, price, description, category, image, gallery}
        };
    }

    try {
        const {  error } = await supabase.from('muebles').insert([{ name, price, description, category, image, gallery}]).select();

        if (error) {
            return {
                status: false,
                message: `Ocurrio un error de tipo ${error.message}`,
                errors: null,
                params: { name, price, description, category, image, gallery }
            };
        }


        revalidatePath("/save-product");

        return {
            status: true,
            message: "La data se inserto",
            errors: null,
            params: { name, price, description, category, image, gallery }
        };
    } catch (error) {
        return {
            status: false,
            message: `Ocurrio un error de tipo ${error}`,
            errors: null,
            params: { name, price, description, category, image, gallery }
        };
    }
}

export default sendData;
