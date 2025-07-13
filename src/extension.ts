import * as vscode from 'vscode';
import * as path from 'path';
import { execFile } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	const runCommand = vscode.commands.registerCommand('pico8.run', async () => {
		const config = vscode.workspace.getConfiguration('pico8runner');
		let pico8Path = config.get<string>('pico8Path');
		let cartridgePath = config.get<string>('cartridgePath');

		if (!pico8Path || !cartridgePath) {
			const confirm = await vscode.window.showInformationMessage(
				'PICO-8 path or cartridge path is not configured. Would you like to set it now?',
				'Yes', 'No'
			);
			if (confirm !== 'Yes') return;

			const userPico8Path = await vscode.window.showInputBox({
				title: 'Enter full path to pico8.exe',
				placeHolder: 'Example: D:/PICO-8/pico8.exe',
			});
			if (!userPico8Path) return;

			const userCartPath = await vscode.window.showInputBox({
				title: 'Enter path to your .p8 file (relative to workspace root)',
				placeHolder: 'Example: main.p8',
			});
			if (!userCartPath) return;

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

		execFile(pico8Path, ['-run', fullCartridgePath], (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage(`Failed to run PICO-8: ${error.message}`);
				return;
			}
			console.log(`PICO-8 started: ${stdout}`);
		});
	});

	context.subscriptions.push(runCommand);
}

export function deactivate() {}
