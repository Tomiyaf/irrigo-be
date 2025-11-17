import prisma from '../libs/prisma.js';

export const findFirstWaterCapacityConfig = async () => {
  return await prisma.water_capacity_config.findFirst();
};

export const updateWaterCapacityConfig = async (id, data) => {
  return await prisma.water_capacity_config.update({
    where: { id },
    data,
  });
};
