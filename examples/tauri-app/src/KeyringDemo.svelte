<script>
  import { onMount } from 'svelte'
  import * as keyring from 'tauri-plugin-keyring-api'

  // State
  let serviceName = 'com.example.keyringdemo'
  let username = ''
  let password = ''
  let secretData = ''
  let output = ''
  let isInitialized = false

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
  </div>

  <div class="form-section">
    <h2>Input</h2>
    <div class="form-group">
      <label for="username">Username:</label>
      <input id="username" type="text" bind:value={username} placeholder="Enter username" />
    </div>
    
    <div class="form-group">
      <label for="password">Password:</label>
      <input id="password" type="password" bind:value={password} placeholder="Enter password" />
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
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }

  h2 {
    color: #555;
    margin-bottom: 15px;
  }

  .status {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
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

  .form-section {
    background: white;
    border: 1px solid #ddd;
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
    font-weight: 500;
    color: #555;
  }

  input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .actions-section {
    background: white;
    border: 1px solid #ddd;
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
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  button:hover {
    background: #0056b3;
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
    background: white;
    border: 1px solid #ddd;
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
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    background: #f8f9fa;
    resize: vertical;
  }

  code {
    background: #e9ecef;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: monospace;
  }
</style>
