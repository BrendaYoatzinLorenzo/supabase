// Reedicion de formulario
"use client"
import { useState } from "react";
import { saveNewPassword } from "./actionsP"

export default function ChangePassword(){
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const [errors, setError] = useState([]);

    function savePassword(form) {
        form.preventDefault();

        console.log(password,"esto es contraseña");

        let errorList = {};
        if(!password) {
            errorList.password = "La contraseña es obligarotia.";
        } else if (password.length < 6) {
            errorList.password = "La contraseña debe de ser de almenos 6 caracteres.";
        }

        if (!confirmPwd) { 
            errorList.confirmPwd = "Confirma tu contraseña";
        } else if (confirmPwd != password) {
            errorList.confirmPwd = "Los compos no inciden.";
        }

        if (Object.keys(errorList).length > 0 ) {
            setError(errorList);
            return;
        }

        console.log("Ir a guardar");

        saveNewPassword(password)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return(
        <form className="flex flex-col gap-3 mt-8"
        onSubmit={savePassword}
        >
            <div className="flex flex-col gap-1">
                <label className="text-white text-center">Nueva Contraseña</label>
                <input 
                name="password"
                type="text"
                placeholder="Nueva contraseña"
                className="text-black border border-gray-600 rounded p-2"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError({
                        ...errors,
                        password: '',
                    });
                }}
                />
                <p className="text-red-500">{errors.password}</p>
            </div>

            <div className="flex flex-col gap-1">
                <label 
                className="text-white text-md text-center">Confirmar Contraseña</label>
                <input 
                name="confirmPwd"
                type="text" 
                placeholder="Confirmar contraseña"
                className="text-black border border-gray-800 rounded p-2"
                value={confirmPwd}
                onChange={(e) => {
                    setConfirmPwd(e.target.value);
                    setError({
                        ...errors,
                        confirmPwd: '',
                    });
                }}
                />
                <p className="text-red-500">{errors.confirmPwd}</p>
            </div>

            <button
            type="submit"
            className="px-4 py-2 rounded-md hover:bg-cyan-900 flex justify-center hover:bg-green-700 hover:text-white transition bg-black border border-foreground/10"
            > Cambiar contraseña </button>
        </form>
    )
}