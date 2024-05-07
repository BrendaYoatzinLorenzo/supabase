'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function saveNewPassword(password) {
console.log(password);
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {data, error} = await supabase
    .auth
    .updateUser({password: password});

    console.log(error);
    if(error){
        return{
            success: false,
            message: `No se pudo guardar la nueva contraseña.`,
            errors: null,
        }
    }
    
    return{
        success: true,
        message: `Si se pudo cambiar`,
        errors: null,
    }
}