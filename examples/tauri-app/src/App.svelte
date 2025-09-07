<script>
  import KeyringDemo from './lib/KeyringDemo.svelte'
</script>

<main class="container">
  <h1>Tauri Keyring Plugin Demo</h1>
  
  <div class="intro">
    <p>
      This demo showcases the Tauri Keyring Plugin, which provides secure credential storage 
      using the native keyring/keychain of your operating system.
    </p>
    <ul>
      <li><strong>Windows:</strong> Windows Credential Manager</li>
      <li><strong>macOS:</strong> Keychain Access</li>
    </ul>
  </div>

  <KeyringDemo />
</main>

<style>
  .container {
    margin: 0 auto;
    padding: 2rem;
    text-align: left;
    max-width: 900px;
  }

  .intro {
    background: linear-gradient(135deg, #e3f2fd 0%, #f1f8e9 100%);
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 30px;
    border: 1px solid #e1f5fe;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .intro p {
    margin-bottom: 15px;
    color: #2c3e50;
    font-weight: 500;
    line-height: 1.6;
  }

  .intro ul {
    margin: 0;
    padding-left: 20px;
  }

  .intro li {
    margin-bottom: 8px;
    color: #495057;
    font-weight: 500;
  }

  h1 {
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
