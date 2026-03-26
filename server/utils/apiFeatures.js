/**
 * Construye query y opciones de paginación para listados.
 *
 * @param {Object} queryParams - req.query
 * @param {Object} extraFilters - filtros adicionales del controller (ej: { category })
 * @returns {{ filter: Object, skip: number, limit: number, page: number }}
 */
export const buildQuery = (queryParams = {}, extraFilters = {}) => {
  const page = Math.max(1, parseInt(queryParams.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(queryParams.limit) || 20));
  const skip = (page - 1) * limit;

  const filter = { active: true, ...extraFilters };

  // active queryParam: 'false' → solo inactivos, 'all' → todos, omitido → solo activos
  if (queryParams.active === 'false') filter.active = false;
  else if (queryParams.active === 'all') delete filter.active;

  if (queryParams.search) {
    filter.name = { $regex: queryParams.search, $options: 'i' };
  }

  return { filter, skip, limit, page };
};
