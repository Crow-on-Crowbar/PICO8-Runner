import * as assert from 'assert';
import * as vscode from 'vscode';
import './extension.test'; 
declare const suite: Mocha.SuiteFunction;
declare const test: Mocha.TestFunction;


suite('PICO-8 Runner Test Suite', () => {
	test('pico8runner.run command should exist', async () => {
		const allCommands = await vscode.commands.getCommands(true);    
		const exists = allCommands.includes('pico8runner.run');
		assert.ok(exists, 'pico8runner.run command not found');
	});

	test('pico8runner.run command should be executable', async () => {
		try {
			await vscode.commands.executeCommand('pico8runner.run');
			assert.ok(true, 'Command executed');
		} catch (err) {
			assert.fail(`Command execution failed: ${(err as Error).message}`);
		}
	});
});
