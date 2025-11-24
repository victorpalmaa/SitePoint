import { composeWhatsAppMessage } from "../lib/checkout";

test("compose WhatsApp message with sizes and totals", () => {
  const items = [
    { id: 1, name: "Camiseta Camping Boxy Tee", price: 190, size: "G", quantity: 1 },
    { id: 3, name: "Moletom Sailing Hoodie", price: 390, size: "M", quantity: 1 },
  ];
  const msg = composeWhatsAppMessage(items, 580);
  expect(msg).toContain("Olá! Gostaria de finalizar a seguinte compra:");
  expect(msg).toContain("1x Camiseta Camping Boxy Tee (Tamanho: G) - Valor Unitário: R$ 190.00");
  expect(msg).toContain("1x Moletom Sailing Hoodie (Tamanho: M) - Valor Unitário: R$ 390.00");
  expect(msg).toContain("VALOR TOTAL: R$ 580.00");
});

test("compose message for ring without size", () => {
  const items = [
    { id: 4, name: "Mineral Ring", price: 150, size: null, quantity: 1 },
  ];
  const msg = composeWhatsAppMessage(items, 150);
  expect(msg).toContain("Mineral Ring");
  expect(msg).toContain("Tamanho: Indicar na hora da compra");
});