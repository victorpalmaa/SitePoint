export const composeWhatsAppMessage = (items, subtotal) => {
  const lines = items.map(i => {
    const sizeText = i.size ? `Tamanho: ${i.size}` : "Tamanho: Indicar na hora da compra";
    return `* ${i.quantity}x ${i.name} (${sizeText}) - Valor Unitário: R$ ${Number(i.price).toFixed(2)}`;
  });
  const total = `\n\nVALOR TOTAL: R$ ${Number(subtotal).toFixed(2)}\n\nAguardo o retorno para prosseguir com o pagamento.`;
  const header = "Olá! Gostaria de finalizar a seguinte compra:\n\n";
  return header + lines.join("\n") + total;
};