import { prisma } from "@/lib/db"; // Certifique-se de que o Prisma está configurado

// Função para obter a lista de pedidos
export const getOrderList = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

// Função para atualizar o status de um pedido
export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });
};
