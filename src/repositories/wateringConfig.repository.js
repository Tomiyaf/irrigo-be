import prisma from '../libs/prisma.js';

export const findFirstWateringConfig = async () => {
  return await prisma.watering_config.findFirst();
};

export const updateWateringConfig = async (id, data) => {
  return await prisma.watering_config.update({
    where: { id },
    data,
  });
};
