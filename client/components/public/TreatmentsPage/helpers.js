export function toggleArrayItem(arr, item) {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export function getUniqueValues(items, key) {
  const values = items.flatMap((item) => {
    const val = item[key];
    if (Array.isArray(val)) return val;
    if (val) return [val];
    return [];
  });
  return [...new Set(values)].sort();
}
