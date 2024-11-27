import { useState } from "react";
import Pedidos from "../../Pedidos";

export default function PaginaCarrinho() {
    const [buscar, setBuscar] = useState('')
    
    return(
        <Pedidos situacao="carrinho"/>
    )
}