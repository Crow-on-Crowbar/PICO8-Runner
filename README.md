
# PICO-8 Runner

A minimal VSCode extension that lets you run your `.p8` cartridges in PICO-8 with a single setup.  
Designed for fast, lightweight use with a simple configuration.


## ✨ Features

- Run your `.p8` cartridge with one command  
- Configure your `pico8.exe` path and cartridge path once, and go  
- Keyboard shortcut support (default: `Ctrl+Shift+8`)  
- Works directly with your workspace files  
- Lightweight, no external dependencies  


## ⚙️ Configuration

Upon first use, you'll be prompted to set:

- **PICO-8 Path**: Full path to your `pico8.exe`
- **Cartridge Path**: Relative path to your `.p8` file (e.g., `main.p8`)

These values will be saved to your workspace `.vscode/settings.json`.

### Example settings.json

```json
{
  "pico8runner.pico8Path": "D:/PICO-8/pico8.exe",
  "pico8runner.cartridgePath": "main.p8"
}
````

You can edit them anytime via `File > Preferences > Settings`.


## 🕹️ Usage

1. Open a `.p8` cartridge file in the editor
2. Press `Ctrl+Shift+8`
   *or* open the Command Palette (`Ctrl+Shift+P`) and select **Run PICO-8 Cartridge**
3. Your configured cartridge will launch in PICO-8


## ⏭️ Planned Updates

* `.p8.png` support
* Auto-detect PICO-8 installation path
* Auto-detect `.p8` file from active editor
* Multi-cart workspace support
* Better error messages and logs


## 🤝 Contributing

Bug reports, feedback, and pull requests are welcome!
Please open an issue on GitHub if you find any problems or have suggestions.


Made with ❤️ by **Crow on Crowbar**
