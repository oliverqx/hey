import type { Handler } from 'express';

import logger from '@hey/lib/logger';
import catchedError from '@utils/catchedError';
import validateIsStaff from '@utils/middlewares/validateIsStaff';
import prisma from '@utils/prisma';
import { notAllowed } from '@utils/responses';

export const get: Handler = async (req, res) => {
  if (!(await validateIsStaff(req))) {
    return notAllowed(res);
  }

  try {
    const data = await prisma.feature.findMany({
      orderBy: { priority: 'desc' },
      where: { NOT: { type: 'KILL_SWITCH' } }
    });
    logger.info('All features fetched');

    return res.status(200).json({ features: data, success: true });
  } catch (error) {
    return catchedError(res, error);
  }
};
