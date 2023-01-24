import { promises as fs, existsSync } from 'fs';

export const getFile = async (
  path: string,
  encoding,
): Promise<string | Buffer> => {
  return encoding ? fs.readFile(path, encoding) : fs.readFile(path, {});
};

export const writeToFile = async (
  directory: string,
  fileName: string,
  data: string,
): Promise<void> => {
  await fs.mkdir(directory, { recursive: true });
  return await fs.appendFile(`${directory}/${fileName}`, data, 'utf8');
};

export const writeToCsv = async (options: {
  directory: string;
  fileName: string;
  data: string;
  headers: string;
}): Promise<void> => {
  if (!existsSync(options.directory)) {
    await fs.mkdir(options.directory, { recursive: true });
    return await fs.writeFile(
      `${options.directory}/${options.fileName}`,
      `${options.headers}\n${options.data}`,
      'utf8',
    );
  }

  return await fs.appendFile(
    `${options.directory}/${options.fileName}`,
    options.data,
    'utf8',
  );
};

export const deleteFile = async (path: string): Promise<void> => {
  return await fs.unlink(path);
};
