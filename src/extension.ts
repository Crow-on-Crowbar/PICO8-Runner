import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { execFile } from 'child_process';

function resolvePico8Executable(pico8Path?: string): string | undefined {
	if (!pico8Path) {return undefined;}

	// Normalize: trim + remove trailing slashes
	const normalized = pico8Path.trim().replace(/[\/\\]+$/, '');

	// macOS: allow .app bundle path
	if (process.platform === 'darwin' && normalized.toLowerCase().endsWith('.app')) {
		const execPath = path.join(normalized, 'Contents', 'MacOS', 'pico8');
		if (fs.existsSync(execPath)) {return execPath;}
	}

	return normalized;
}

function findInPath(cmd: string): Promise<string | undefined> {
	return new Promise((resolve) => {
		const tool = process.platform === 'win32' ? 'where' : 'which';
		execFile(tool, [cmd], (err, stdout) => {
			if (err) {return resolve(undefined);}
			const first = stdout
				.split(/\r?\n/)
				.map((s) => s.trim())
				.find(Boolean);
			resolve(first);
		});
	});
}

export function activate(context: vscode.ExtensionContext) {
	const runCommand = vscode.commands.registerCommand('pico8.run', async () => {
		const config = vscode.workspace.getConfiguration('pico8runner');
		let pico8Path = config.get<string>('pico8Path');
		let cartridgePath = config.get<string>('cartridgePath');

		if (!pico8Path || !cartridgePath) {
			const confirm = await vscode.window.showInformationMessage(
				'PICO-8 path or cartridge path is not configured. Would you like to set it now?',
				'Yes',
				'No'
			);
			if (confirm !== 'Yes') {return;}

			const picoPromptTitle =
				process.platform === 'win32'
					? 'Enter full path to pico8.exe (or just "pico8" if it is in PATH)'
					: process.platform === 'darwin'
						? 'Enter full path to PICO-8 .app or binary (macOS), or "pico8" if it is in PATH'
						: 'Enter full path to PICO-8 executable (Linux), or "pico8" if it is in PATH';

			const picoPlaceholder =
				process.platform === 'win32'
					? 'Example: D:/PICO-8/pico8.exe  (or: pico8)'
					: process.platform === 'darwin'
						? 'Example: /Applications/PICO-8.app  (or: /Applications/PICO-8.app/Contents/MacOS/pico8, pico8)'
						: 'Example: /usr/local/bin/pico8  (or: pico8)';

			const userPico8Path = await vscode.window.showInputBox({
				title: picoPromptTitle,
				placeHolder: picoPlaceholder,
			});
			if (!userPico8Path) {return;}

			const userCartPath = await vscode.window.showInputBox({
				title: 'Enter path to your .p8 file (relative to workspace root)',
				placeHolder: 'Example: main.p8',
			});
			if (!userCartPath) {return;}

			await config.update('pico8Path', userPico8Path, vscode.ConfigurationTarget.Workspace);
			await config.update('cartridgePath', userCartPath, vscode.ConfigurationTarget.Workspace);

			vscode.window.showInformationMessage('PICO-8 Runner settings saved.');
			pico8Path = userPico8Path;
			cartridgePath = userCartPath;
		}

		const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
		if (!rootPath) {
			vscode.window.showErrorMessage('No workspace folder found.');
			return;
		}

		const fullCartridgePath = path.join(rootPath, cartridgePath);

		// Resolve and validate PICO-8 executable
		let execPath = resolvePico8Executable(pico8Path);

		// If user provided a command name (not absolute), try PATH lookup
		if (execPath && !path.isAbsolute(execPath)) {
			const found = await findInPath(execPath);
			if (found) {execPath = found;}
		}

		if (!execPath || !fs.existsSync(execPath)) {
			vscode.window.showErrorMessage(
				`PICO-8 executable not found: ${execPath ?? pico8Path}. ` +
				`Please check your 'pico8Path' setting (you can set a full path, or just "pico8" if it is in PATH).`
			);
			return;
		}

		// Optional: warn if cartridge path doesn't exist (better error than PICO-8 failure)
		if (!fs.existsSync(fullCartridgePath)) {
			vscode.window.showErrorMessage(
				`Cartridge file not found: ${fullCartridgePath}. Please check your 'cartridgePath' setting.`
			);
			return;
		}

		const args: string[] = ['-run', fullCartridgePath];

	execFile(execPath, args, {}, (error, stdout, stderr) => {
			if (error) {
				const extra = stderr?.trim() ? `\n\n${stderr.trim()}` : '';
				vscode.window.showErrorMessage(`Failed to run PICO-8: ${error.message}${extra}`);
				return;
			}
			if (stdout?.trim()) {console.log(`PICO-8 started: ${stdout.trim()}`);}
			if (stderr?.trim()) {console.warn(`PICO-8 stderr: ${stderr.trim()}`);}
		});
	});

	context.subscriptions.push(runCommand);
}

export function deactivate() {}
