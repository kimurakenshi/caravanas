import electron from 'electron';
import fs from 'fs';
import {getCurrentDateForExport, getDateForExport, getDateForExportConfig } from 'app/common/date-service';
import * as baseStorage from 'app/storage/base-storage';
import importConfigData from 'app/storage/storage-import-service';

const remote = electron.remote;
const dialog = remote.dialog;

export function exportMovement(movement) {
  const fileName = `movimiento-caravanas-${getDateForExport(movement.creationDate)}.txt`;

  const dialogOptions = {
    defaultPath: fileName,
    title: 'Exportar Movimiento',
  };

  const newLine = process.platform === 'darwin' ? '\n' : '\r\n';

  const fileContent = movement.caravanas
    .map((caravana) => caravana.number)
    .join(newLine)
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

export function exportCaravanas(caravanas) {
  const fileName = `caravanas-${getCurrentDateForExport()}.txt`;

  const dialogOptions = {
    defaultPath: fileName,
    title: 'Exportar Caravanas',
  };

  const newLine = process.platform === 'darwin' ? '\n' : '\r\n';

  const fileContent = caravanas
    .map((caravana) => caravana.number)
    .join(newLine)
  ;

  return new Promise((resolve, reject) => {
    dialog.showSaveDialog(dialogOptions, (filePath) => {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          reject('Se produjo un error al intentar guardar el archivo.');
        } else {
          resolve('Las caravanas se exportaron correctamente.');
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
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog((fileNames) => {
      if (fileNames === undefined) {
        reject('No se ha seleccionado el archivo a importar.');

        return;
      }

      fs.readFile(fileNames[0], 'utf-8', (err, data) => {
        if (err) {
          reject('Se produjo un error al procesar el archivo a importar.');

          return;
        }

        importConfigData(JSON.parse(data))
          .then((response) => {
            resolve(response);
          })
          .then(() => {
            baseStorage.getAll().then((c) => console.log(c));
          })
          .catch((err) => {
            reject(err);
          })
        ;
      });
    });
  });
}
