import * as vscode from 'vscode';
import { exec } from 'child_process'; // Import exec from child_process module

export function activate(context: vscode.ExtensionContext) {
  // Command for generating a matplotlib plot based on a description
  let generatePlot = vscode.commands.registerCommand('plotvisualiser.generatePlot', () => {
    // Prompt the user to enter a description of the plot
    vscode.window.showInputBox({ prompt: 'Describe the plot you want to generate (e.g., "scatter plot with x as age and y as weight")' }).then((description) => {
      if (description) {
        // Replace the path to the Python script as necessary
        const pythonScriptPath = context.asAbsolutePath('nlp_parser.py');
        // Call the Python script with the description
        exec(`python "${pythonScriptPath}" "${description}"`, (error, stdout, stderr) => {
          if (error) {
            vscode.window.showErrorMessage(`Error generating plot: ${error.message}`);
            return;
          }
          if (stderr) {
            vscode.window.showErrorMessage(`Error: ${stderr}`);
            return;
          }
          // Optionally, insert the generated code into the active editor
          const activeEditor = vscode.window.activeTextEditor;
          if (activeEditor) {
            const currentPosition = activeEditor.selection.active;
            activeEditor.edit((editBuilder) => {
              editBuilder.insert(currentPosition, stdout);
            });
          } else {
            // If no editor is open, just show the generated code in a message
            vscode.window.showInformationMessage(`Generated code: ${stdout}`);
          }
        });
      }
    });
  });

  // Placeholder for the command to customize a matplotlib plot
  let customizePlot = vscode.commands.registerCommand('plotvisualiser.customizePlot', () => {
    vscode.window.showInformationMessage('Customizing a Matplotlib plot...');
    // Implementation for plot customization would go here
  });

  context.subscriptions.push(generatePlot);
  context.subscriptions.push(customizePlot);
}

export function deactivate() {}
