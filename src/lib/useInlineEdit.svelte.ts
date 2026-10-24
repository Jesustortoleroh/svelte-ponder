export function useInlineEdit<T extends Record<string, any>>(
  initial: T,
  onSave: (value: T) => Promise<void> | void
) {
  let draft = $state<T>(structuredClone(initial));
  let original = $state<T>(structuredClone(initial));

  // Using JSON.stringify to compare objects for changes. This is a simple way to check for deep equality, but it may not be the most efficient for large objects or objects with circular references. Consider using a deep comparison library if performance becomes an issue.
  const isDirty = $derived(
    JSON.stringify(draft) !== JSON.stringify(original)
  );

  async function save() {
    await onSave(structuredClone(draft));
    Object.assign(original, structuredClone(draft));
  }

  function cancel() {
    Object.assign(draft, structuredClone(original));
  }

  function reset(newValue: T) {
    Object.assign(draft, structuredClone(newValue));
    Object.assign(original, structuredClone(newValue));
  }

  return { draft, isDirty, save, cancel, reset };
}