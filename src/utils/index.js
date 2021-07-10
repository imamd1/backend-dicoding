const mapDBToModel = ({
  id,
  title,
  // year,
  performer,
  // genre,
  // duration,
  // created_at,
  // updated_at,
}) => ({
  id,
  title,
  // year,
  performer,
  // genre,
  // duration,
  // createdAt: created_at,
  // updatedAt: updated_at,
});

const mapDBToModel1 = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModel, mapDBToModel1 };
