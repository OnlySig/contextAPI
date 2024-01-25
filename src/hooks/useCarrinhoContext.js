import { useContext, useEffect } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho, qtd, setQtd, valorTd, setValorTd } = useContext(CarrinhoContext)

    function mudarQtd(id, quantidade) {
        return carrinho.map(itemCarrinho =>{
            if(itemCarrinho.id === id) itemCarrinho.quantidade += quantidade
            return itemCarrinho
        })
    }

    function removerProduto(id) {
        const produto = carrinho.find(itemCarrinho => itemCarrinho.id === id)
        const ultimoProduto = produto.quantidade === 1
        if(ultimoProduto) {
            setCarrinho(()=>removerProdutoCarrinho(id))
        }
        const carrinhoAtt = mudarQtd(id, -1)
        setCarrinho([...carrinhoAtt])
    }

    function adicionarProduto(novoProduto) {
        const temProduto = carrinho.some((itemCarrinho)=>itemCarrinho.id === novoProduto.id)

        if(!temProduto){
            novoProduto.quantidade = 1
            return setCarrinho((carrinhoAnterior)=>[...carrinhoAnterior, novoProduto])
        }
        const carrinhoAtt = mudarQtd(novoProduto.id, 1)
        setCarrinho([...carrinhoAtt])
    }

    function removerProdutoCarrinho(id) {
        const produto = carrinho.filter(produtoFiltrado => produtoFiltrado.id !== id)
        setCarrinho(produto)
    }

    useEffect(()=> {
        const {totalTemp, quantidadeTemp} = carrinho.reduce((acumulador, produto)=>({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco*produto.quantidade
        }),
        {
            quantidadeTemp: 0,
            totalTemp: 0
        })
        setQtd(quantidadeTemp)
        setValorTd(totalTemp)
    }, [carrinho])

    return{
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTd,
        qtd
    }
}