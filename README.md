# PICO-8 Runner

A minimal VS Code extension that lets you run your **PICO-8 `.p8` cartridges**
with a single command.

Designed to be fast, lightweight, and cross-platform — no clutter, no setup hell.


## ✨ Features

- Run your `.p8` cartridge with one command
- Configure your PICO-8 path once and reuse it
- Supports **Windows, macOS, and Linux**
- Supports PATH-based execution (e.g. `pico8`)
- macOS `.app` bundle support
- Works directly with workspace files
- Keyboard shortcut support (default: `Ctrl+Shift+8`)
- Lightweight, no external runtime dependencies


## ⚙️ Configuration

On first use, the extension will prompt you to set:

- **PICO-8 Path**
  - Full path to the PICO-8 executable  
  - Or simply `pico8` if it is available in your `PATH`
- **Cartridge Path**
  - Path to your `.p8` file (relative to the workspace root)

These values are stored in your workspace settings  
(`.vscode/settings.json`).


### Example `settings.json`

```json
{
  "pico8runner.pico8Path": "C:/PICO-8/pico8.exe",
  "pico8runner.cartridgePath": "main.p8"
}
```

Platform examples
Windows
``` json
{
  "pico8runner.pico8Path": "C:/PICO-8/pico8.exe"
}
```

macOS
``` json
{
  "pico8runner.pico8Path": "/Applications/PICO-8.app"
}
```
Linux
``` json
{
  "pico8runner.pico8Path": "/usr/local/bin/pico8"
}
```

Or, if PICO-8 is available in PATH on any platform:
```json
{
  "pico8runner.pico8Path": "pico8"
}
```

## 🕹️ Usage

Open a workspace containing your .p8 cartridge

Press Ctrl+Shift+8

or open the Command Palette (Ctrl+Shift+P)

select Run PICO-8 Cartridge

Your configured cartridge launches in PICO-8

## 🧪 Development & Testing

The extension builds successfully on:

Windows

macOS

Linux

Cross-platform builds are verified via GitHub Actions CI.

Actual cartridge execution requires PICO-8 to be installed
on the target system.

## ⏭️ Planned Updates

.p8.png cartridge support

Auto-detect PICO-8 installation path

Auto-detect active .p8 file from the editor

Multi-cartridge workspace support

Improved error messages and logging

## 🤝 Contributing

Bug reports, feedback, and pull requests are welcome!
If something doesn’t work on your platform, please open an issue on GitHub.

Made with ❤️ by Crow on Crowbar