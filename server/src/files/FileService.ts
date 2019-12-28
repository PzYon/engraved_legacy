import { FileType, ICloudFile, IFile } from "engraved-shared";
import { DbService } from "../DbService";
import { ICloudinaryUploadResult, ICloudinary } from "./ICloudinary";

export class FileService {
  public constructor(
    private dbService: DbService,
    private cloudi: ICloudinary
  ) {}

  public async uploadFile(file: Express.Multer.File): Promise<IFile> {
    const cloudinaryResult: ICloudinaryUploadResult = await this.cloudi.upload(
      file.path,
      this.dbService.currentUser.mail + "/" + file.filename
    );

    const cloudFile: ICloudFile = await this.dbService.insertFile({
      _id: undefined,
      url: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id
    });

    return {
      label: file.filename,
      url: cloudFile.url,
      cloudFile_id: cloudFile._id,
      type: FileType.Image
    };
  }

  public async deleteFile(fileId: string): Promise<any> {
    const file = await this.dbService.getFile(fileId);
    await this.cloudi.delete(file.publicId);

    return this.dbService.deleteFile(fileId);
  }

  public async synchronizeFiles(
    previousFiles: IFile[],
    currentFiles: IFile[]
  ): Promise<void> {
    previousFiles = previousFiles || [];
    currentFiles = currentFiles || [];

    const previousFileIds: string[] = previousFiles.map(f =>
      f.cloudFile_id.toString()
    );

    const currentFileIds: string[] = currentFiles.map(f =>
      f.cloudFile_id.toString()
    );

    const filesToAdd: IFile[] = currentFiles.filter(
      f => previousFileIds.indexOf(f.cloudFile_id.toString()) === -1
    );

    const filesToDelete: IFile[] = previousFiles.filter(
      f => currentFileIds.indexOf(f.cloudFile_id.toString()) === -1
    );

    for (const fileToAdd of filesToAdd) {
      const f = await this.dbService.getFile(fileToAdd.cloudFile_id);
      if (!f) {
        throw new Error("File hasn't been uploaded yet.");
      }
    }

    for (const fileToDelete of filesToDelete) {
      await this.deleteFile(fileToDelete.cloudFile_id);
    }
  }
}
