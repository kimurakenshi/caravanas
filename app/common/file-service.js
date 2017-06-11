import electron from 'electron';
import fs from 'fs';
import { getDateForExport, getDateForExportConfig } from 'app/common/date-service';
import * as baseStorage from 'app/storage/base-storage';

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

  return new Promise((resolve, reject) => {
    dialog.showSaveDialog(dialogOptions, (filePath) => {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          reject('Se produjo un error al intentar guardar el archivo.');
        } else {
          resolve('El movimiento se exportó correctamente.');
        }
      });
    });
  });
}

export function exportConfig() {
  const dialogOptions = {
    defaultPath: `caravanas-config-${getDateForExportConfig()}.json`,
    title: 'Exportar Configuración',
  };

  return new Promise((resolve, reject) => {
    baseStorage
    .getAll()
    .then((data) => {
      dialog.showSaveDialog(dialogOptions, (filePath) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
          if (err) {
            reject('Se produjo un error al intentar exportar la información.');
          } else {
            resolve('La configuración se exportó correctamente.');
          }
        });
      });
    })
    .catch(() => {
      reject('Se produjo un error al intentar exportar la información.');
    });
  });
}

export function importConfig() {

}
