'use server'
import { createClient } from '@/utils/supabase/client';

export async function createPrd(newProduct) {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.from('muebles').insert([newProduct]);

        if (error) {
            return {
                error: error.message || 'Ocurrió un error al agregar el producto'
            };
        }

        return {
            data
        };
    } catch (error) {
        console.error('Ocurrió un error al agregar el producto: ', error.message);
        return {
            error: 'Ocurrió un error al agregar el producto'
        };
    }
}

