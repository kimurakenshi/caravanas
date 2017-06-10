import electron from 'electron';
import fs from 'fs';
import { getDateForExport } from 'app/common/date-service';

const remote = electron.remote;
const dialog = remote.dialog;

export function exportMovement(movement) {
  const fileName = `movimiento-caravanas-${getDateForExport(movement.creationDate)}.txt`;

  const dialogOptions = {
    defaultPath: fileName,
    title: 'Exportar Movimiento',
  };

  const fileContent = movement.caravanas
    .map((caravana) => caravana.number)
    .join('\n')
  ;

  dialog.showSaveDialog(dialogOptions, (filePath) => {
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        alert('Se produjo un error al intentar guardar el archivo.');
      } else {
        alert('El movimiento se exportó correctamente.');
      }
    });
  });
}

export function exportConfig() {

}

export function importConfig() {

}
