import {
  ICloudinary,
  ICloudinaryUploadResult
} from "../services/files/ICloudinary";

export class CloudinaryMock implements ICloudinary {
  public deletedPublicIds: string[] = [];
  public uploadedUrls: string[] = [];

  public delete(publicId: string): Promise<any> {
    this.deletedPublicIds.push(publicId);

    return Promise.resolve();
  }

  public upload(_: string, publicId: string): Promise<ICloudinaryUploadResult> {
    const result: ICloudinaryUploadResult = {
      public_id: publicId,
      secure_url: "https://cloud.i.na.ry/" + publicId
    };

    this.uploadedUrls.push(result.secure_url);

    return Promise.resolve(result);
  }
}
