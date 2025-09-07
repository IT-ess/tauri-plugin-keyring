<script>
  import { onMount } from 'svelte'
  import * as keyring from 'tauri-plugin-keyring'

  // State
  let serviceName = 'com.example.keyringdemo'
  let username = 'demo-user'
  let password = 'my-secure-password'
  let secretData = 'my-secret-data-123'
  let output = ''
  let isInitialized = false
  let showPassword = false  // Toggle for password visibility

  // Auto-initialize on mount
  onMount(async () => {
    try {
      await keyring.initializeKeyring(serviceName)
      isInitialized = true
      addOutput('✅ Keyring initialized with service: ' + serviceName)
    } catch (error) {
      addOutput('❌ Failed to initialize keyring: ' + error.message)
    }
  })

  function addOutput(message) {
    output = output + new Date().toLocaleTimeString() + ' - ' + message + '\n'
  }

  async function setPassword() {
    if (!username || !password) {
      addOutput('❌ Please enter both username and password')
      return
    }

    try {
      await keyring.setPassword(username, password)
      addOutput(`✅ Password set for user: ${username}`)
    } catch (error) {
      addOutput(`❌ Failed to set password: ${error.message}`)
    }
  }

  async function getPassword() {
    if (!username) {
      addOutput('❌ Please enter username')
      return
    }

    try {
      const retrievedPassword = await keyring.getPassword(username)
      password = retrievedPassword  // Fill the password input field
      addOutput(`✅ Password retrieved for ${username}: ${retrievedPassword}`)
    } catch (error) {
      addOutput(`❌ Failed to get password: ${error.message}`)
    }
  }

  async function deletePassword() {
    if (!username) {
      addOutput('❌ Please enter username')
      return
    }

    try {
      await keyring.deletePassword(username)
      addOutput(`✅ Password deleted for user: ${username}`)
    } catch (error) {
      addOutput(`❌ Failed to delete password: ${error.message}`)
    }
  }

  async function checkPassword() {
    if (!username) {
      addOutput('❌ Please enter username')
      return
    }

    try {
      const exists = await keyring.hasPassword(username)
      addOutput(`ℹ️ Password exists for ${username}: ${exists ? 'Yes' : 'No'}`)
    } catch (error) {
      addOutput(`❌ Failed to check password: ${error.message}`)
    }
  }

  async function setSecret() {
    if (!username || !secretData) {
      addOutput('❌ Please enter both username and secret data')
      return
    }

    try {
      // Convert string to bytes for demonstration
      const bytes = new TextEncoder().encode(secretData)
      const byteArray = Array.from(bytes)
      await keyring.setSecret(username, byteArray)
      addOutput(`✅ Secret set for user: ${username} (${byteArray.length} bytes)`)
    } catch (error) {
      addOutput(`❌ Failed to set secret: ${error.message}`)
    }
  }

  async function getSecret() {
    if (!username) {
      addOutput('❌ Please enter username')
      return
    }

    try {
      const retrievedSecret = await keyring.getSecret(username)
      // Convert bytes back to string for display
      const secretString = new TextDecoder().decode(new Uint8Array(retrievedSecret))
      secretData = secretString  // Fill the secret data input field
      addOutput(`✅ Secret retrieved for ${username}: ${secretString} (${retrievedSecret.length} bytes)`)
    } catch (error) {
      addOutput(`❌ Failed to get secret: ${error.message}`)
    }
  }

  async function deleteSecret() {
    if (!username) {
      addOutput('❌ Please enter username')
      return
    }

    try {
      await keyring.deleteSecret(username)
      addOutput(`✅ Secret deleted for user: ${username}`)
    } catch (error) {
      addOutput(`❌ Failed to delete secret: ${error.message}`)
    }
  }

  async function checkSecret() {
    if (!username) {
      addOutput('❌ Please enter username')
      return
    }

    try {
      const exists = await keyring.hasSecret(username)
      addOutput(`ℹ️ Secret exists for ${username}: ${exists ? 'Yes' : 'No'}`)
    } catch (error) {
      addOutput(`❌ Failed to check secret: ${error.message}`)
    }
  }

  function clearOutput() {
    output = ''
  }
</script>

<div class="keyring-demo">
  <h1>🔐 Tauri Keyring Plugin Demo</h1>
  
  <div class="status">
    <span class="status-indicator" class:initialized={isInitialized}></span>
    Service: <code>{serviceName}</code>
    {isInitialized ? '(Initialized)' : '(Not Initialized)'}
    <div class="platform-info">
      Using: <strong>Native Platform Store</strong>
      {#if typeof window !== 'undefined'}
        - Windows Credential Manager
      {:else}
        - Platform Keychain/Keyring
      {/if}
    </div>
  </div>

  <div class="form-section">
    <h2>Input</h2>
    <div class="form-group">
      <label for="username">Username:</label>
      <input id="username" type="text" bind:value={username} placeholder="Enter username" />
    </div>
    
    <div class="form-group">
      <label for="password">Password:</label>
      <div class="password-input-container">
        {#if showPassword}
          <input 
            id="password" 
            type="text" 
            bind:value={password} 
            placeholder="Enter password" 
          />
        {:else}
          <input 
            id="password" 
            type="password" 
            bind:value={password} 
            placeholder="Enter password" 
          />
        {/if}
        <button 
          type="button" 
          class="toggle-password" 
          on:click={() => showPassword = !showPassword}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '👁️' : '🔒'}
        </button>
      </div>
    </div>
    
    <div class="form-group">
      <label for="secret">Secret Data:</label>
      <input id="secret" type="text" bind:value={secretData} placeholder="Enter secret data" />
    </div>
  </div>

  <div class="actions-section">
    <h2>Password Operations</h2>
    <div class="button-group">
      <button on:click={setPassword}>Set Password</button>
      <button on:click={getPassword}>Get Password</button>
      <button on:click={deletePassword}>Delete Password</button>
      <button on:click={checkPassword}>Check Password</button>
    </div>

    <h2>Secret Operations</h2>
    <div class="button-group">
      <button on:click={setSecret}>Set Secret</button>
      <button on:click={getSecret}>Get Secret</button>
      <button on:click={deleteSecret}>Delete Secret</button>
      <button on:click={checkSecret}>Check Secret</button>
    </div>
  </div>

  <div class="output-section">
    <div class="output-header">
      <h2>Output</h2>
      <button on:click={clearOutput} class="clear-btn">Clear</button>
    </div>
    <textarea readonly bind:value={output} placeholder="Output will appear here..."></textarea>
  </div>
</div>

<style>
  .keyring-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: system-ui, sans-serif;
    background: #ffffff;
    min-height: 100vh;
  }

  h1 {
    text-align: center;
    color: #1a1a1a;
    margin-bottom: 30px;
    font-size: 2.2rem;
    font-weight: 700;
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .status {
    background: #e8f4f8;
    border: 1px solid #bee5eb;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1a1a1a;
    font-weight: 500;
  }

  .status-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #dc3545;
  }

  .status-indicator.initialized {
    background: #28a745;
  }

  .platform-info {
    font-size: 13px;
    color: #495057;
    margin-top: 5px;
    font-weight: 500;
  }

  .form-section {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #2c3e50;
  }

  input {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 2px solid #ced4da;
    border-radius: 6px;
    font-size: 14px;
    background: #ffffff;
    color: #212529;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  input:focus {
    outline: none;
    border-color: #0d6efd;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
  }

  .password-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .password-input-container input {
    flex: 1;
  }

  .toggle-password {
    background: #6c757d;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    min-width: 40px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toggle-password:hover {
    background: #5a6268;
  }

  .actions-section {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  button {
    background: #0d6efd;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s, transform 0.1s;
  }

  button:hover {
    background: #0b5ed7;
  }

  button:active {
    transform: translateY(1px);
  }

  .clear-btn {
    background: #dc3545;
    font-size: 12px;
    padding: 4px 8px;
  }

  .clear-btn:hover {
    background: #c82333;
  }

  .output-section {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
  }

  .output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .output-header h2 {
    margin: 0;
  }

  textarea {
    width: 100%;
    height: 200px;
    padding: 12px;
    border: 2px solid #ced4da;
    border-radius: 6px;
    font-family: monospace;
    font-size: 13px;
    background: #ffffff;
    color: #212529;
    resize: vertical;
    line-height: 1.4;
  }

  textarea:focus {
    outline: none;
    border-color: #0d6efd;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
  }

  code {
    background: #e9ecef;
    padding: 3px 6px;
    border-radius: 4px;
    font-family: monospace;
    color: #495057;
    font-weight: 500;
  }
</style>
