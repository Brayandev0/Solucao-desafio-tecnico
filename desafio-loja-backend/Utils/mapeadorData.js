export function mapearListaProdutos(data) {

  return data.map((p) => ({
    id: p.id,
    nome: p.title ? p.title : "Produto sem nome",
    descricao: p.description ? p.description : "Produto sem descrição",
    preco: p.price
      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price * 5.50)
      : "Preço não disponível",
    imagem: p.thumbnail,
    estoque: p.stock ? p.stock : "Estoque não disponível",
  }));
 }
 
 export function mapearProdutoPorId(data) {
  return {
    id: data.id,
    nome: data.title ? data.title : "Produto sem nome",
    descricao: data.description ? data.description : "Produto sem descrição",
    categoria: data.category ? data.category : "Categoria não disponível",
    preco: data.price ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.price * 5.50) : "Preço não disponível",
    desconto: data.discountPercentage ? `${data.discountPercentage}%` : "Desconto não disponível",
    avaliacaoNota: data.rating ? `${data.rating} / 5` : "Avaliação não disponível",
    estoque: data.stock ? data.stock : "Estoque não disponível",
    tags: data.tags && data.tags.length > 0 ? data.tags : ["Sem tags"],
    marca: data.brand ? data.brand : "Marca não disponível",
    sku: data.sku ? data.sku : "SKU não disponível",
    peso: data.weight ? data.weight : "Peso não disponível",
    dimensoes: data.dimensions ? data.dimensions : "Dimensões não disponíveis",
    informacaoGarantia: data.warrantyInformation ? data.warrantyInformation : "Informação de garantia não disponível",      
    informacaoEnvio: data.shippingInformation ? data.shippingInformation : "Informação de envio não disponível",
    statusDisponibilidade: data.availabilityStatus ? data.availabilityStatus : "Status de disponibilidade não disponível",
    avaliacoes: data.reviews ? data.reviews.map((r) => ({
      nota: r.rating ? r.rating : 0,
      nome: r.reviewerName ? r.reviewerName : "Avaliação sem nome",
      comentario: r.comment ? r.comment : "Sem comentário",
      data: r.date ? new Date(r.date).toLocaleDateString() : "Data não disponível",
      email: r.reviewerEmail ? r.reviewerEmail : "Email não disponível",
    })) : "Sem avaliações",
    politicaRetorno: data.returnPolicy ? data.returnPolicy : "Política de retorno não disponível",
    quantidadeMinimaPedido: data.minimumOrderQuantity ? data.minimumOrderQuantity : "Quantidade mínima não disponível",
    imagens: data.images ? data.images : "Sem imagens",
    thumbnail: data.thumbnail,
  }
  
}



export function mapearPedido(data) {
  return {
    uuid: data.uuid,
    address: data.address ?? "Endereço não disponível",
    payment_method: data.payment_method ?? "Método não disponível",
    amount: data.amount ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.amount * 5.50) : "Valor não disponível",
    status: data.status ?? "Status não disponível",
    created_at: data.created_at ?? "Data não disponível",
    OrderItems: Array.isArray(data.OrderItems) && data.OrderItems.length > 0
      ? data.OrderItems.map((item) => ({
          id: item.id,
          name: item.name ?? "Produto sem nome",
          image: item.image,
          price: item.price ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * 5.50) : "Preço não disponível",
          quantity: item.quantity ?? 0,
          product_id: item.product_id,
          created_at: item.created_at ?? "Data não disponível",
        }))
      : [],
  };
}