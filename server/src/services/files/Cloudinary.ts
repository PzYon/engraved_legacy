import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import Config from "../../Config";
import { ICloudinary, ICloudinaryUploadResult } from "./ICloudinary";

cloudinary.config(Config.cloudinary);

export class Cloudinary implements ICloudinary {
  public delete(publicId: string): Promise<any> {
    return cloudinary.uploader.destroy(publicId);
  }

  public upload(
    path: string,
    publicId: string
  ): Promise<ICloudinaryUploadResult> {
    const uploadOptions: UploadApiOptions = {
      public_id: publicId
    };

    return cloudinary.uploader.upload(path, uploadOptions);
  }
}
