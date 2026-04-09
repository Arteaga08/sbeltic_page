export function toggleArrayItem(arr, item) {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export function getUniqueValues(products, key) {
  const values = products.flatMap((p) => {
    const val = p[key];
    if (Array.isArray(val)) return val;
    if (val) return [val];
    return [];
  });
  return [...new Set(values)].sort();
}
