<script lang="ts">
  let {
    label,
    value = $bindable(),
    type = 'text',
  }: {
    label: string;
    value: string;
    type?: 'text' | 'email' | 'textarea';
  } = $props();

  let isEditing = $state(false);
  let originalValue = value;
  let displayEl = $state<HTMLButtonElement | null>(null);

  function focusOnMount(node: HTMLElement) {
    node.focus();
  }

  function startEdit() {
    originalValue = value;
    isEditing = true;
  }

  function commitEdit() {
    isEditing = false;
    displayEl?.focus();
  }

  function cancelEdit() {
    value = originalValue;
    isEditing = false;
    displayEl?.focus();
  }

  function onInputKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault(); 
      commitEdit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  } 
</script>


<div class="field">
  <div class="label">{label}</div>
  {#if isEditing}
    {#if type === 'textarea'}
      <textarea bind:value aria-label={label} use:focusOnMount onblur={commitEdit} onkeydown={onInputKeydown}></textarea>
    {:else}
      <input {type} bind:value aria-label={label} use:focusOnMount onblur={commitEdit} onkeydown={onInputKeydown} />
    {/if}
  {:else}
    <button type="button" class="value" aria-label={'Edit ' + label} bind:this={displayEl} onclick={startEdit}>
      {value}
    </button>
  {/if}
</div>

<style>
  .field {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .label {
    font-size: 0.75rem;
    color: #4a4a4a;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin-bottom: 0.5rem;
  }

  .value {
    cursor: pointer;
    width: 100%;
    padding: 0.85rem 1rem;
    margin: 0;
    background-color: #fcfcfc;
    border: 1px solid #d1d5db;
    border-radius: 0; /* Ivy league: sharp edges */
    color: #1a1a1a;
    font-family: 'Georgia', serif; /* Classic serif font */
    font-size: 1.05rem;
    text-align: left;
    transition: all 0.2s ease;
  }

  /* Hover state: subtle gray background to show interactivity */
  .value:hover {
    background-color: #f3f4f6;
    border-color: #A51C30; /* Harvard Crimson accent */
  }

  input,
  textarea {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid #A51C30; /* Crimson border when editing */
    border-radius: 0;
    background-color: #ffffff;
    color: #1a1a1a;
    font-family: 'Georgia', serif;
    font-size: 1.05rem;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  input:focus,
  textarea:focus {
    outline: none;
    box-shadow: 0 0 0 1px #A51C30;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
</style>