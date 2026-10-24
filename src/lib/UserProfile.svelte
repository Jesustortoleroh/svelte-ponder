<script lang="ts">
  import InlineField from "./InlineField.svelte";
  import { useInlineEdit } from "./useInlineEdit.svelte";

  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    bio: "Frontend developer who loves Svelte."
  };

  async function saveProfile(updated: any) {
    await new Promise((r) => setTimeout(r, 500)); 
    console.log("Profile saved:", updated);
  }

  // Traemos el estado de la función
  const edit = useInlineEdit(user, saveProfile);

  // FORZAMOS la reactividad de los botones observando el JSON del draft
  let showButtons = $derived(
    JSON.stringify(edit.draft) !== JSON.stringify(user)
  );
</script>

<div class="profile-card">
  <div class="header">
    <h2>Student Profile</h2>
    <p>Manage your academic information</p>
  </div>
  
  <InlineField label="Name" bind:value={edit.draft.name} />
  <InlineField label="Email" type="email" bind:value={edit.draft.email} />
  <InlineField label="Bio" type="textarea" bind:value={edit.draft.bio} />

  <!-- Usamos la variable showButtons que SÍ es reactiva -->
  {#if showButtons}
    <div class="actions">
      <button class="btn-save" onclick={edit.save}>Save Changes</button>
      <button class="btn-cancel" onclick={edit.cancel}>Cancel</button>
    </div>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Inter:wght@400;600&display=swap');

  .profile-card {
    max-width: 480px;
    margin: 3rem auto;
    padding: 3rem;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-top: 5px solid #A51C30;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    font-family: 'Inter', sans-serif;
  }

  .header {
    margin-bottom: 2.5rem;
    text-align: center;
  }

  h2 {
    color: #1a1a1a;
    font-family: 'Merriweather', serif;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }

  .header p {
    color: #6b7280;
    font-size: 0.95rem;
    margin: 0;
    font-style: italic;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  button {
    padding: 0.85rem 1rem;
    border-radius: 0;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    flex: 1;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
  }

  .btn-save {
    background-color: #A51C30;
    color: white;
    border: 1px solid #A51C30;
  }

  .btn-save:hover {
    background-color: #821524;
    border-color: #821524;
  }

  .btn-cancel {
    background-color: #ffffff;
    color: #4b5563;
    border: 1px solid #d1d5db;
  }

  .btn-cancel:hover {
    background-color: #DC2626;
    border-color: #DC2626;
    color: white;
  }
</style>