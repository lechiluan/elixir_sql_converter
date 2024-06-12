export function convertSqlDebugToPostgres(debugSql, params) {
  let convertedSql = debugSql;
  params.forEach((param, index) => {
    const placeholder = `$${index + 1}`;
    let replacement;

    if (Array.isArray(param)) {
      // Convert array to PostgreSQL array format
      replacement = `ARRAY[${param.map((p) => `'${p}'`).join(", ")}]`;
    } else if (typeof param === "string") {
      // Convert string to PostgreSQL string format
      replacement = `'${param}'`;
    } else {
      // For other types (e.g., boolean), convert to string representation
      replacement = param.toString();
    }

    // Replace all occurrences of the placeholder in the SQL string
    convertedSql = convertedSql.split(placeholder).join(replacement);
  });

  return convertedSql;
}
