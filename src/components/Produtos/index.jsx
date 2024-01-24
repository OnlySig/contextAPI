import React, { useContext } from "react";
import Produto from "./Produto";
import produtos from "@/mocks/produtos.json";
import Titulo from "@/components/Titulo";
import { CarrinhoContext } from "@/context/CarrinhoContext";

const Produtos = () => {
  const {carrinho, setCarrinho} = useContext(CarrinhoContext)

  function removerProduto(id) {
    const produto = carrinho.find(itemCarrinho => itemCarrinho.id === id)
    const ultimoProduto = produto.quantidade === 1

    if(ultimoProduto) {
      return setCarrinho(carrinhoAnterior => {
        carrinhoAnterior.filter(itemCarrinho => itemCarrinho.id !== id)
      })
    }
    setCarrinho(carrinhoAnterior => {
      carrinhoAnterior.map((itemCarrinho) => {
        if(itemCarrinho.id === id) itemCarrinho.quantidade -= 1
        return itemCarrinho
      })
    })
  }

  function adicionarProduto(novoProduto) {
    const temProduto = carrinho.some((itemCarrinho)=>{itemCarrinho.id === novoProduto.id})
    if(!temProduto){
      novoProduto.quantidade = 1
      return setCarrinho((carrinhoAnterior)=>[...carrinhoAnterior, novoProduto])
    }

    setCarrinho((carrinhoAnterior) => carrinhoAnterior.map((itemCarrinho) =>{
      if(itemCarrinho.id === novoProduto.id)itemCarrinho.quantidade += 1
      return itemCarrinho
    }))}

  return (
    <section role="produtos" aria-label="Produtos que estão bombando!">
      <Titulo>Produtos que estão bombando!</Titulo>
      <div className="container row mx-auto">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            {...produto}
            adicionarProduto={adicionarProduto}
            removerProduto={removerProduto}
          />
        ))}
      </div>
    </section>
  );
};

export default Produtos;
