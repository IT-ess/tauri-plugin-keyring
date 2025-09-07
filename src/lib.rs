use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;
mod implementation;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Keyring;
#[cfg(mobile)]
use mobile::Keyring;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the keyring APIs.
pub trait KeyringExt<R: Runtime> {
  fn keyring(&self) -> &Keyring<R>;
}

impl<R: Runtime, T: Manager<R>> crate::KeyringExt<R> for T {
  fn keyring(&self) -> &Keyring<R> {
    self.state::<Keyring<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("keyring")
    .invoke_handler(tauri::generate_handler![
      commands::initialize_keyring,
      commands::set_password,
      commands::set_secret,
      commands::get_password,
      commands::get_secret,
      commands::delete_password,
      commands::delete_secret,
      commands::has_password,
      commands::has_secret
    ])
    .setup(|app, api| {
      #[cfg(mobile)]
      let keyring = mobile::init(app, api)?;
      #[cfg(desktop)]
      let keyring = desktop::init(app, api)?;
      app.manage(keyring);
      Ok(())
    })
    .build()
}
