import { createContext, useState } from "react"

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = "Carrinho"

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([])
    const [valorTd, setValorTd]= useState(0)
    const [qtd, setQtd]= useState(0)

    return(
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho, valorTd, setValorTd, qtd, setQtd}}>
            {children}
        </CarrinhoContext.Provider>
    )
}