export function useInlineEdit<T extends Record<string, any>>(
  initial: T,
  onSave: (value: T) => Promise<void> | void
) {
  // initial is a plain object, so structuredClone is fine here
  let draft = $state<T>(structuredClone(initial));
  let original = $state<T>(structuredClone(initial));

  // Use a function to ensure it re-evaluates on every call
  function getIsDirty() {
    return JSON.stringify(draft) !== JSON.stringify(original);
  }

  async function save() {
    // CRITICAL: Use $state.snapshot to clone the proxy safely
    const nextValue = $state.snapshot(draft) as T;
    await onSave(nextValue);

    // Update original using snapshot to avoid proxy cloning errors
    Object.assign(original, nextValue);
  }

  function cancel() {
    // Revert draft using snapshot
    Object.assign(draft, $state.snapshot(original));
  }

  function reset(newValue: T) {
    Object.assign(draft, $state.snapshot(newValue));
    Object.assign(original, $state.snapshot(newValue));
  }

  return {
    draft,
    isDirty: getIsDirty, // Return the function itself
    save,
    cancel,
    reset
  };
}