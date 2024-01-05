import {Badge, Button,Card, TextInput,Title} from "@tremor/react"
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";

export function CreateNewUser(){
    const {addUser} = useUserActions()
    const [result, setResult] = useState<"ok" | "ko" | null>(null)

    const handleSubmit= (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const form = event.target as HTMLFormElement
		const formData = new FormData(form)

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const github = formData.get("github") as string

        if(!name || !email || !github){
            return setResult("ko")
        }
        addUser({name,email,github})
        setResult("ok")
        form.reset()
}
    
    return(
        <Card style={{marginTop:"16px"}}>
            
            <form className="" onSubmit={handleSubmit}>
                <TextInput name="name" placeholder="Aqui el nombre"></TextInput>
                <TextInput name="email" placeholder="Aqui el email"></TextInput>
                <TextInput name="github" placeholder="Aqui el usuario de GitHub"></TextInput>
                <div>
                <Button type="submit" style={{marginTop:"16px"}}>
                    Crear usuario
                </Button>
                <span>
                    {result === "ok" && <Badge color="green" >Guardado correctamente</Badge>}
                    {result === "ko" && <Badge color="red" >Error al guardar</Badge>}
                </span>
            </div>
            </form>
            
        </Card>
    )
}